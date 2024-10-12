<template>
  <NuxtLayout name="booking">
    <section>
      <div class="container mx-auto py-6">
        <NuxtImg src="logo.png" alt="Logo" class="h-24" />
        <div>
          <span v-for="index in 5" :key="index">
            <Icon :class="index <= 4 ? 'text-yellow-400' : 'text-gray-300'" name="i-material-symbols-kid-star-sharp" />
          </span>
        </div>
      </div>

      <div class="bg-secondary text-white">
        <div class="container mx-auto flex items-center gap-16 py-8 roomsearch">
          <div class="space-y-2">
            <span class="block">Đặt phòng </span>
            <span class="text-xl font-bold">Của bạn</span>
          </div>

          <select v-model="roomType"
            class="bg-secondary outline-none border-none h-fit p-2 text-white cursor-pointer border-b border-[#4a4a4e]">
            <option value="undefined" selected>Tất cả loại phòng</option>
            <option v-for="roomType in roomTypes" :key="roomType.id" :value="roomType.id">
              {{ roomType.name }}
            </option>
          </select>

          <a-range-picker size="large" class="bg-secondary outline-none border-none text-white shadow-none"
            v-model:value="dateRange" @calendarChange="onCalendarChange" :disabled-date="disabledDate"
            :format="'DD-MM-YYYY'" />

        </div>
      </div>
    </section>
    <section class="container mx-auto my-10">
      <h3 class="my-6 text-xl font-playFair font-bold">Đặt phòng ngay</h3>
      <div class=" grid grid-cols-12 gap-10">
        <div class="col-span-8 p-4 border border-[#b9b9b9] rounded-lg ">
          <div class="space-y-6">
            <CardBooking v-for="(item, index) in roomTypes" :rooms-select="roomsSelect" :key="item.id" :roomType="item"
              @handle-add-room="handleAddRoom" />
          </div>
        </div>

        <div class="col-span-4 h-fit p-4 border border-[#b9b9b9] rounded-lg ">
          <div class="flex justify-between">
            <p>{{ formatDate(dateRange[0]) }} - {{ formatDate(dateRange[1]) }}</p>
            <span v-if="dateRange && dateRange.length === 2">
              {{ calculateNights(dateRange) }} đêm
            </span>
          </div>
          <hr class="my-4">
          <div class="mt-4">
            <span class="text-center block" v-if="!roomsSelect || roomsSelect?.length<=0">Lựa chọn phòng ngay</span>
            <div v-else>
              <span class="text-left font-medium ">Tổng số phòng đã chọn: {{ roomsSelect.length }} </span>
              <ul class="mt-4">
                <li v-for="(item, index) in roomsSelect" :key="index" class="space-y-2 border-b border-t py-2">
                  <div class="flex items-center justify-between">
                    <span class="font-medium">Phòng {{item.room_number}}</span>
                    <Icon class="text-xl cursor-pointer" name="material-symbols:delete-outline" @click="handleRemoveRoom(index)" />
                  </div>

                  <span class="block">Loại: {{item.room_type_name}}</span>
                  <div class="flex justify-between">
                    <span v-if="dateRange && dateRange.length === 2">
                      {{ calculateNights(dateRange) }} đêm
                    </span>
                    <span class="text-[#D19A57] font-semibold">{{ formatCurrency(item.price) }} vnđ/đêm</span>
                  </div>
                </li>
              </ul>

              <div class="mt-4 flex">
                <a-input v-model:value="voucherCode" class="rounded-none" placeholder="Nhập mã giảm giá của bạn"></a-input>
                <a-button @click="handleCheckVoucher" type="primary" class="rounded-none">Áp dụng</a-button>
              </div>
              <p class="text-sm mt-4" v-if="discountValue">
                Bạn được giảm giá <span class="text-[#239829] font-semibold">{{ discountValue }}%</span>
              </p>
              
              <div class="mt-4">
                <span class="font-medium">Tổng số tiền: </span>
                <span class="text-[#D19A57] font-semibold">{{ formatCurrency(totalPrice) }} vnđ</span>
              </div>
            </div>
          </div>
          <div class="text-center mt-10">
            <a-button size="large" class="bg-[#D19A57] text-white w-[90%] mx-auto" type="ghost">Đặt phòng</a-button>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { message } from 'ant-design-vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { IRoom } from '~/interfaces/Rooms';
import type { IRoomType } from '~/interfaces/RoomType';
import type { IVoucher } from '~/interfaces/Voucher';

definePageMeta({
  layout: false,
});

type RangeValue = [Dayjs, Dayjs];

const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];

const disabledDate = (current: Dayjs) => {
  return current && current < dayjs().startOf('day');
};

const roomType = ref<number | undefined>(undefined);
const dateRange = ref<RangeValue>([
  dayjs(dayjs().startOf('day'), dateFormat),
  dayjs(dayjs().add(1,'day').startOf('day'), dateFormat),
]);
const roomCount = ref<number | undefined>(1);
const guestCount = ref<number | undefined>(1);

const query = reactive({
  'q[]': ["rooms", "amenities"],
    filterRoomBooking: {
      startDate: dateRange.value[0].format('YYYY-MM-DD'),
      endDate: dateRange.value[1].format('YYYY-MM-DD'),
    }
})

const { data: roomTypes } = useFetch<IRoomType[]>('/api/room-types', {
  method: 'GET',
  baseURL: useRuntimeConfig().public.baseURL,
  query: {
    ...query
  },
  watch: [dateRange]
});


const formatDate = (date: Dayjs) => {
  return date.format('DD/MM/YYYY');
};

const calculateNights = (dateRange: RangeValue) => {
  return dateRange[1].diff(dateRange[0], 'day');
};

const formatCurrency = (value: number) => {
  return value.toLocaleString('vi-VN');
};

const onCalendarChange = (values: [Dayjs, Dayjs] | [string, string], formatString: [string, string], info: any) => {
  if (Array.isArray(values) && values.length === 2 && dayjs.isDayjs(values[0]) && dayjs.isDayjs(values[1])) {
    query.filterRoomBooking.startDate = values[0].format('YYYY-MM-DD');
    query.filterRoomBooking.endDate = values[1].format('YYYY-MM-DD');
    dateRange.value = values as RangeValue;
    roomsSelect.value = []; // Reset danh sách phòng đã chọn
  }
  updateTotalPrice();
};

const roomsSelect = ref<IRoom[]>(); // Lưu trữ danh sách phòng đã chọn
const totalPrice = ref<number>(0); // Lưu trữ tổng tiền
const discountCode = ref<string>(''); // Lưu trữ mã giảm giá
const discountValue = ref<number>(0); // Lưu trữ giá trị giảm giá
const voucherCode = ref<string>(''); // Lưu trữ mã voucher

const handleAddRoom = (room: IRoom) => {
  if (roomsSelect.value && roomsSelect.value.some(selectedRoom => selectedRoom.id === room.id)) {
    message.warning('Phòng đã có trong danh sách');
    return; // Phòng đã có trong mảng, không thêm nữa
  }

  // Lấy giá và tên loại phòng từ roomType và thêm vào đối tượng phòng
  const roomType = roomTypes.value ? roomTypes.value.find(rt => rt.id === room.room_type_id) : null;
  if (roomType) {
    room.price = roomType.price;
    room.room_type_name = roomType.name; // Thêm tên loại phòng vào đối tượng phòng
  }

  if (roomsSelect.value) {
    roomsSelect.value.push(room);
  } else {
    roomsSelect.value = [room];
  }

  // Cập nhật tổng tiền
  updateTotalPrice();
};

const handleRemoveRoom = (index:number) => {
  if (roomsSelect.value) {
    roomsSelect.value.splice(index, 1);
  }

  // Cập nhật tổng tiền
  updateTotalPrice();
};

const handleCheckVoucher = async() => {
  try {
    const voucher = await $fetch<IVoucher>('/api/vouchers/' + voucherCode.value.trim(), {
      method: 'GET',
      baseURL: useRuntimeConfig().public.baseURL,
    });

    if (voucher && voucher.discount_amount) {
      discountValue.value = voucher.discount_amount; // Áp dụng giá trị giảm giá từ voucher
      message.success('Mã voucher hợp lệ! Bạn đã được giảm giá.');
    } else {
      discountValue.value = 0; // Không có giảm giá
      message.error('Mã voucher không hợp lệ.');
    }

    // Cập nhật tổng tiền
    updateTotalPrice();
  } catch (error) {
    discountValue.value = 0; // Không có giảm giá
    message.error('Có lỗi xảy ra khi kiểm tra mã voucher.');
  }
};

const updateTotalPrice = () => {
  if (roomsSelect.value && dateRange.value && dateRange.value.length === 2) {
    const nights = calculateNights(dateRange.value);
    const totalRoomPrice = roomsSelect.value.reduce((total, room) => total + (room.price * nights), 0);
    totalPrice.value = totalRoomPrice * (100 - discountValue.value)/100;
  } else {
    totalPrice.value = 0;
  }
};

const filteredRooms = computed(() => {
  if (roomType.value === undefined) {
    return roomTypes.value || [];
  }
  return roomTypes.value?.filter(room => room.id === roomType.value) || [];
});

</script>
<style>
.roomsearch .ant-picker-input input,
.roomsearch .ant-picker-input input::placeholder,
.roomsearch .ant-picker-suffix,
.roomsearch .ant-picker-separator,
.roomsearch .ant-input::placeholder {
  color: white !important;
}

.roomsearch .ant-picker-input,
.roomsearch select,
.roomsearch .ant-input,
.roomsearch input[type="number"] {
  padding: 8px !important;
  border-bottom: 2px solid #4a4a4e !important;
}

.roomsearch .ant-picker-active-bar {
  display: none;
}
</style>