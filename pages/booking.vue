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
        <div class="container mx-auto flex items-center justify-between py-8 roomsearch">
          <div class="flex items-center gap-16">
            <div class="space-y-2">
              <span class="block">Đặt phòng </span>
              <span class="text-xl font-bold">Của bạn</span>
            </div>

            <select v-model="roomType"
              class="bg-secondary outline-none border-none h-fit p-2 text-white cursor-pointer border-b border-[#4a4a4e]">
              <option :value="undefined" selected>Tất cả loại phòng</option>
              <option v-for="roomType in roomTypes" :key="roomType.id" :value="roomType.id">
                {{ roomType.name }}
              </option>
            </select>

            <a-range-picker size="large" class="bg-secondary outline-none border-none text-white shadow-none"
              v-model:value="dateRange" @calendarChange="onCalendarChange" :disabled-date="disabledDate"
              :format="'DD-MM-YYYY'" />
          </div>

          <div class="cursor-pointer border-white border py-2 px-4 rounded-lg transition-all hover:bg-[#79501b]" @click="handleViewBooking">
            Danh sách phòng đã đặt
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto my-10">
      <div class="flex items-center gap-1 my-6 cursor-pointer"
        @click="() => { if (isRedirectPayment) isRedirectPayment = !isRedirectPayment }">
        <Icon class="text-xl" name="material-symbols:arrow-back-ios" v-if="isRedirectPayment" />
        <h3 class=" text-2xl font-playFair font-bold">
          {{ isRedirectPayment ? 'Quay lại' : 'Đặt phòng ngay' }}
        </h3>
      </div>
      <div class="grid grid-cols-12 gap-10">
        <div class="col-span-8 p-4 border border-[#b9b9b9] rounded-lg h-fit">
          <div class="space-y-6" v-if="!isRedirectPayment">
            <CardBooking v-for="(item, index) in filteredRoomTypes" :rooms-select="roomsSelect" :key="item.id"
              :roomType="item" @handle-add-room="handleAddRoom" />
          </div>
          <div class="space-y-6 py-4" v-else>
            <h3 class="text-xl font-playFair font-bold">Thông tin đặt phòng</h3>
            <a-form ref="formGuestInfoRef" :model="formGuestInfo" @submit.prevent="handleSubmitGuestInfo"
              layout="vertical" class="space-y-4">
              <a-form-item name="name" label="Tên khách hàng"
                :rules="[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]">
                <a-input size="large" v-model:value="formGuestInfo.name" placeholder="Nhập tên của bạn" />
              </a-form-item>
              <a-form-item name="phone_number" label="Số điện thoại"
                :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]">
                <a-input size="large" v-model:value="formGuestInfo.phone_number"
                  placeholder="Nhập số điện thoại của bạn" />
              </a-form-item>
              <a-form-item name="email" label="Email"
                :rules="[{ required: true, message: 'Vui lòng nhập email của bạn!' }]">
                <a-input size="large" v-model:value="formGuestInfo.email" placeholder="Nhập email của bạn" />
              </a-form-item>
              <a-form-item name="address" label="Địa chỉ"
                :rules="[{ required: true, message: 'Vui lòng nhập địa chỉ của bạn!' }]">
                <a-input size="large" v-model:value="formGuestInfo.address" placeholder="Nhập địa chỉ của bạn" />
              </a-form-item>
              <a-form-item name="birthday" label="Ngày sinh"
                :rules="[{ required: true, message: 'Vui lòng chọn ngày sinh của bạn' }]">
                <a-date-picker size="large" v-model:value="formGuestInfo.birthday"
                  placeholder="Chọn ngày sinh của bạn" />
              </a-form-item>
            </a-form>
          </div>
        </div>

        <div class="col-span-4 h-fit  p-4 border border-[#b9b9b9] rounded-lg">
          <div class="flex justify-between">
            <p>{{ formatDate(dateRange[0]) }} - {{ formatDate(dateRange[1]) }}</p>
            <span v-if="dateRange && dateRange.length === 2">
              {{ calculateNights(dateRange) }} đêm
            </span>
          </div>
          <hr class="my-4">
          <div class="mt-4">
            <span class="text-center block" v-if="!roomsSelect || roomsSelect?.length <= 0">Lựa chọn phòng ngay</span>
            <div v-else>
              <span class="text-left font-medium">Tổng số phòng đã chọn: {{ roomsSelect.length }}</span>
              <ul class="mt-4">
                <li v-for="(item, index) in roomsSelect" :key="index" class="space-y-2 border-b border-t py-2">
                  <div class="flex items-center justify-between">
                    <span class="font-medium">Phòng {{ item.room_number }}</span>
                    <Icon class="text-xl cursor-pointer" name="material-symbols:delete-outline"
                      @click="handleRemoveRoom(index)" />
                  </div>
                  <span class="block">Loại: {{ item.room_type_name }}</span>
                  <div class="flex justify-between">
                    <span v-if="dateRange && dateRange.length === 2">
                      {{ calculateNights(dateRange) }} đêm
                    </span>
                    <span class="text-[#D19A57] font-semibold">{{ formatCurrency(item.price) }} vnđ/đêm</span>
                  </div>
                </li>
              </ul>

              <div class="mt-4 flex">
                <a-input v-model:value="voucherCode" class="rounded-none"
                  placeholder="Nhập mã giảm giá của bạn"></a-input>
                <a-button @click="handleCheckVoucher" type="primary" class="rounded-none">Áp dụng</a-button>
              </div>

              <hr class="my-4">

              <p class="text-sm mt-4" v-if="discountValue">
                Bạn được giảm giá <span class="text-[#239829] font-semibold">{{ discountValue }}%</span>
              </p>


              <div class="mt-4">
                <span class="font-medium">Tổng số tiền phòng: </span>
                <span class="text-[#D19A57] font-semibold">{{ formatCurrency(totalPrice) }} vnđ</span>
              </div>

              <div class="mt-4">
                <span class="font-medium">Cọc trước: </span>
                <span class="text-[#D19A57] font-semibold">{{ formatCurrency(totalPrice * 30 / 100) }} vnđ</span>
              </div>

              <div class="mt-4">
                <span class="block mb-2">Thanh toán: </span>
                <a-radio checked>Thanh toán online đặt cọc 30% tiền phòng</a-radio>
              </div>
            </div>
          </div>
          <div class="text-center mt-10">
            <a-button size="large"
              class="bg-[#D19A57] text-white w-[90%] mx-auto disabled:cursor-not-allowed  disabled:opacity-50"
              type="ghost" @click="handleBooking" :disabled="!roomsSelect || roomsSelect.length <= 0">
              {{ isRedirectPayment ? "Thanh toán ngay" : "Đặt cọc phòng" }}
            </a-button>
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
import { useUserSettingState } from '~/composable/userSettingState';

definePageMeta({
  layout: false,
});

const authStore = useAuthStore();

const user = computed(() => authStore.user);
const token = computed(() => authStore.token);

const isRedirectPayment = ref(false);

type RangeValue = [Dayjs, Dayjs];

const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];

const disabledDate = (current: Dayjs) => {
  return current && current < dayjs().startOf('day');
};

const roomType = ref<number | undefined>(undefined);
const dateRange = ref<RangeValue>([
  dayjs(dayjs().startOf('day'), dateFormat),
  dayjs(dayjs().add(1, 'day').startOf('day'), dateFormat),
]);

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
    roomsSelect.value = [];

    formBooking.check_in_date = values[0].format('YYYY-MM-DD');
    formBooking.check_out_date = values[1].format('YYYY-MM-DD');
  }
  updateTotalPrice();
};

const roomsSelect = ref<IRoom[]>(); // Lưu trữ danh sách phòng đã chọn
const totalPrice = ref<number>(0); // Lưu trữ tổng tiền
const discountValue = ref<number>(0); // Lưu trữ giá trị giảm giá
const voucherCode = ref<string>(''); // Lưu trữ mã voucher

const handleAddRoom = (room: IRoom) => {
  if (roomsSelect.value && roomsSelect.value.some(selectedRoom => selectedRoom.id === room.id)) {
    message.warning('Phòng đã có trong danh sách');
    return;
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
  updateTotalPrice();
};

const handleRemoveRoom = (index: number) => {
  if (roomsSelect.value) {
    roomsSelect.value.splice(index, 1);
  }
  updateTotalPrice();
};

const handleCheckVoucher = async () => {
  if (!voucherCode.value) {
    return;
  }
  try {
    const voucher = await $fetch<IVoucher>('/api/vouchers/' + voucherCode.value.trim(), {
      method: 'GET',
      baseURL: useRuntimeConfig().public.baseURL,
    });

    if (voucher && voucher.discount_amount) {
      discountValue.value = voucher.discount_amount; // Áp dụng giá trị giảm giá từ voucher
      message.success('Mã voucher hợp lệ! Bạn đã được giảm giá.');
    } else {
      discountValue.value = 0;
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
    totalPrice.value = totalRoomPrice * (100 - discountValue.value) / 100;
  } else {
    totalPrice.value = 0;
  }
};

const filteredRoomTypes = computed(() => {
  if (roomType.value === undefined) {
    return roomTypes.value || [];
  }
  return roomTypes.value?.filter(room => room.id === roomType.value) || [];
});


//booking
interface ICustomerInfo {
  name: string;
  phone_number: string;
  email: string;
  address: string;
  birthday: string;
}

interface IBooking {
  customer_info: ICustomerInfo;
  room_ids: number[];
  check_in_date: string;
  check_out_date: string;
  voucher_code: string;
}

const formGuestInfo = ref<ICustomerInfo>({
  name: '',
  phone_number: '',
  email: '',
  address: '',
  birthday: '',
});

const formBooking = reactive<IBooking>({
  customer_info: formGuestInfo.value,
  room_ids: roomsSelect.value?.map(room => room.id) || [],
  check_in_date: dateRange.value[0].format('YYYY-MM-DD'),
  check_out_date: dateRange.value[1].format('YYYY-MM-DD'),
  voucher_code: voucherCode.value,
});


const formGuestInfoRef = ref();

const handleSubmitGuestInfo = async () => {
  try {
    // await formGuestInfoRef.value.validate();

    await $fetch<IBooking>('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token.value}`
      },
      body: formBooking,
      baseURL: useRuntimeConfig().public.baseURL,
      onResponse: ({ response }) => {
        if (response.ok) {
          const url = response._data?.url?.original;
          if (url) {
            window.location.href = url;
          } else {
            message.error('Đã có lỗi xảy ra: URL không tồn tại');
          }
        } else {
          message.error(response._data.message ?? 'Đã có lỗi xảy ra');
        }
      },
    });

  } catch (error) {
    console.log('Validation failed or API request failed:', error);
  }
};

const handleBooking = async () => {
  if (!user.value) {
    message.error('Vui lòng đăng nhập để đặt phòng');
    return;
  }
  if (isRedirectPayment.value) {
    await handleSubmitGuestInfo();
  }

  if (!isRedirectPayment.value) {
    isRedirectPayment.value = true;
    handleCheckVoucher();
  }

};

watchEffect(() => {
  formBooking.room_ids = roomsSelect.value?.map(room => room.id) || [];
});

watch(voucherCode, () => {
  formBooking.voucher_code = voucherCode.value;
});


//checkVNPay success or fail
const route = useRoute();
const router = useRouter();
onMounted(async () => {
  const queryParams = new URLSearchParams(route.fullPath.split('?')[1]);
  const responseCode = queryParams.get('vnp_ResponseCode');
  const transactionStatus = queryParams.get('vnp_TransactionStatus');

  if (responseCode === '00' && transactionStatus === '00') {
    await $fetch('/api/vnpay-return', {
      method: 'get',
      baseURL: useRuntimeConfig().public.baseURL,
      query: route.query,
      Authorization: `Bearer ${token.value}`,
      onResponse: ({ response }) => {
        if (response.ok) {
          message.success('Thanh toán thành công');
        } else {
          message.error('Thanh toán thất bại. Vui lòng thử lại.');
        }
      }
    })
  }
});

//Xem danh sách phòng đã đặt

const userSettingState = useUserSettingState();

const { openModalSetting } = userSettingState;

const handleViewBooking = () => {
  openModalSetting();
  // Add parameters to the URL
  const params = new URLSearchParams();
  params.append('active', '2');
  if (roomType.value !== undefined) {
    params.append('roomType', roomType.value.toString());
  }
  const url = `/booking?${params.toString()}`;
  router.push(url);
};
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