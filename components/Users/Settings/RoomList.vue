<template>
  <div class="container mx-auto">
    <!-- Filter Section -->
    <div class="mb-8">
      <div class="flex justify-between">
        <h6 class="text-xl font-medium mb-4">Danh sách phòng</h6>
        <a-button danger class="mb-4" @click="cancelSelectedBookings">Hủy phòng</a-button>
      </div>
      <label for="statusFilter" class="block mb-2">Lọc theo trạng thái:</label>
      <select id="statusFilter" v-model="selectedStatus" @change="filterRooms" class="p-2 border rounded">
        <option value="">Tất cả</option>
        <option :value="EBookingStatus.PENDING_APPROVAL">Chờ xác nhận thanh toán</option>
        <option :value="EBookingStatus.WAITING_CHECK_IN">Chờ nhận phòng / Đã đặt cọc</option>
        <option :value="EBookingStatus.CHECKED_IN">Đã nhận phòng</option>
        <option :value="EBookingStatus.CHECKED_OUT">Đã trả phòng</option>
        <option :value="EBookingStatus.CANCELLED">Đã hủy</option>
      </select>
    </div>

    <!-- Room Table -->
    <div class="mb-8">
      <a-table
        :columns="columns"
        :dataSource="paginatedRooms"
        rowKey="id"
        :pagination="false"
        bordered
        :rowSelection="rowSelection"
        
      >
        <template #expandedRowRender="{ record }">
          <div class="p-4 bg-gray-50">
            <h4 class="text-md font-semibold">Thông tin khách hàng</h4>
            <p><strong>Tên khách hàng:</strong> {{ record.order.customer_info.name }}</p>
            <p><strong>Số điện thoại:</strong> {{ record.order.customer_info.phone_number }}</p>
            <p><strong>Email liên hệ:</strong> {{ record.order.customer_info.email }}</p>
            <p><strong>Địa chỉ:</strong> {{ record.order.customer_info.address }}</p>
          </div>
        </template>

        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'rating'">
            <a-button v-if="!record?.reviewed" :disabled="record.status!=EBookingStatus.CHECKED_OUT" @click="handleReview(record as IRoomBooking)">Đánh giá ngay</a-button>
            <a-button v-else disabled>Cảm ơn bạn đã đánh giá</a-button>
          </template>
        </template>
      </a-table>
    </div>
    <UsersSettingsReviewModal :open="isReviewModal" :booking="bookingSelectedReview!" @onCancel="isReviewModal=false" />
    <CancelBookingModal v-if="isCancelBooking" :bookings="selectedRows" :open="isCancelBooking" @close-modal="isCancelBooking=false" />
  </div>
</template>

<script setup lang="ts">
import { ref, h, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import type { IRoomBooking } from '~/interfaces/RoomBooking';
import { EBookingStatus, EBookingStatusText } from '~/enums/EBookingStatus';
import dayjs from '#build/dayjs.imports.mjs';
import { message } from 'ant-design-vue';
import type { TableProps, TableColumnType } from 'ant-design-vue';
import type { IOrder } from '~/interfaces/Order';
import type { IRoom } from '~/interfaces/Rooms';

interface DataType {
  id: number;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  paid_amount: number;
  created_at: string;
  order: IOrder;
  order_id: number;
  room: IRoom;
  room_id: number;
  status: string;
  updated_at: string;
  user_id: number;
}

const isReviewModal = ref(false);

const isCancelBooking = ref(false);

const authStore = useAuthStore();
const { token } = authStore;

const user = computed(() => authStore.user);

const { data: bookings } = await useFetch<IRoomBooking[]>('/api/bookings/me', {
  method: 'get',
  baseURL: useRuntimeConfig().public.baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Application-Type': 'application/json'
  },
  onResponse: ({ response }) => {
    // Handle response if needed
  }
});

const formatCurrency = (value: number) => {
  return value.toLocaleString('vi-VN') + ' VND';
};

const selectedStatus = ref<string>('');
const filteredRooms = computed(() => {
  if (!selectedStatus.value) {
    return bookings.value || [];
  }
  return bookings.value?.filter(booking => booking.status === Number(selectedStatus.value)) || [];
});

const selectedRowKeys = ref<number[]>([]);
const selectedRows = ref<DataType[]>([]);

const rowSelection = computed<TableProps['rowSelection']>(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (selectedKeys: (string | number)[], selectedRowsData: DataType[]) => {
    selectedRowKeys.value = selectedKeys as number[];
    selectedRows.value = selectedRowsData;
    console.log(`selectedRowKeys: ${selectedRowKeys.value}`, 'selectedRows: ', selectedRows.value);
  }
}));

const cancelSelectedBookings = () => {
  if (selectedRowKeys.value.length === 0) {
    message.warning('Vui lòng chọn ít nhất một phòng để hủy.');
    return;
  }

  const currentDate = new Date();
  for (const booking of selectedRows.value) {
    const checkInDate = new Date(booking.check_in_date);
    const timeDifference = checkInDate.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference <= 2) {
      message.error(`Không thể hủy yêu cầu cho phòng ${booking.room.room_number} vì ngày check-in còn dưới 2 ngày.`);
      return;
    }
  }

  isCancelBooking.value = true;
};

const columns: TableColumnType<DataType>[] = [
  {
    title: 'Phòng',
    dataIndex: ['room', 'room_number'],
    key: 'room_number',
  },
  {
    title: 'Ngày check-in',
    dataIndex: 'check_in_date',
    key: 'check_in_date',
    customRender: ({ text }: { text: string }) => dayjs(text).format('DD-MM-YYYY'),
  },
  {
    title: 'Ngày check-out',
    dataIndex: 'check_out_date',
    key: 'check_out_date',
    customRender: ({ text }) => dayjs(text).format('DD-MM-YYYY'),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    customRender: ({ text }: { text: number }) => {
      return h(
        'a-tag',
        `${EBookingStatusText[text as keyof typeof EBookingStatusText]}`
      );
    },
  },
  {
    title: 'Số tiền đã thanh toán',
    dataIndex: 'paid_amount',
    key: 'paid_amount',
    customRender: ({ text }: { text: number }) => formatCurrency(text),
  },
  {
    title: 'Tổng giá',
    dataIndex: 'total_price',
    key: 'total_price',
    customRender: ({ text }: { text: number }) => formatCurrency(text),
  },
  {
    title: 'Đánh giá',
    dataIndex: 'rating',
    key: 'rating',
  }
];

// Pagination logic
const currentPage = ref(1);
const pageSize = ref(10);

const paginatedRooms = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredRooms.value.slice(start, end);
});

const filterRooms = () => {
  currentPage.value = 1; // Reset to first page when filter changes
};


const bookingSelectedReview = ref<IRoomBooking | undefined>();

const handleReview = (booking: IRoomBooking) => {
  bookingSelectedReview.value = booking;
  isReviewModal.value = true;
};
</script>

<style scoped></style>