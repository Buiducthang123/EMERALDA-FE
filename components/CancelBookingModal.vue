<template>
  <a-modal
    v-model:open="props.open"
    width="70%"
    style="top: 30px"
    title="Yêu cầu hủy đặt phòng"
    @cancel="handleCancel"
    :footer="null"
  >
    <div v-if="bookings.length > 0" class="space-y-6 mt-6 h-[70vh]">
      <a-card class="border-none">
        <a-card-grid style="text-align: center; width:20%" v-for="booking in bookings" :key="booking.id">
          <div class="space-y-2">
            <p class="block font-bold">
              Phòng {{ booking.room?.room_number }}
            </p>
            <p>Hoàn trả: <span class="text-green-500 font-bold">{{ formatCurrency(booking.paid_amount) }}</span></p>
          </div>
        </a-card-grid>
      </a-card>
      <div class="flex justify-between gap-12 items-center">
        <a-form ref="formRef" :model="formBank" layout="vertical" class="w-[60%]">
          <a-form-item
            label="Số tài khoản"
            name="bankAccountNumber"
            :rules="[{ required: true, message: 'Vui lòng nhập số tài khoản' }]"
          >
            <a-input size="large" v-model:value="formBank.bankAccountNumber" />
          </a-form-item>
          <a-form-item
            label="Tên người nhận"
            name="recipientName"
            :rules="[{ required: true, message: 'Vui lòng nhập tên người nhận' }]"
          >
            <a-input size="large" v-model:value="formBank.recipientName" />
          </a-form-item>
          <a-form-item
            label="Tên ngân hàng"
            name="bankName"
            :rules="[{ required: true, message: 'Vui lòng nhập tên ngân hàng' }]"
          >
            <a-input size="large" v-model:value="formBank.bankName" />
          </a-form-item>
          <a-form-item
            name="confirmation"
            :rules="[{ required: true, message: 'Vui lòng xác nhận thông tin' }]"
          >
            <a-checkbox  v-model:checked="formBank.confirmation">Xác nhận thông tin hoàn toàn chính xác</a-checkbox>
          </a-form-item>
        </a-form>
        <div class="w-[40%] space-y-8 text-center">
          <div class="p-4 border border-gray-200 rounded-lg shadow-sm">
            <p class="text-lg font-bold">Tổng số tiền hoàn trả:</p>
            <p class="text-2xl text-green-500 font-bold">{{ formatCurrency(totalRefundAmount) }}</p>
          </div>
          <a-button type="primary" class="w-[70%]" size="large" @click="handleOk" :disabled="!formBank.confirmation" >Xác nhận hủy</a-button>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center text-gray-500">Không có phòng nào được chọn để hủy.</p>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, defineEmits } from 'vue';
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

const props = defineProps<{
  bookings: DataType[];
  open: boolean;
}>()

const emits = defineEmits(['closeModal', 'submit']);

const formRef = ref();
const formBank = ref({
  bankAccountNumber: '',
  recipientName: '',
  bankName: '',
  confirmation: false
});

const formCancelRequest = ref({
    dataRequest:props.bookings,
    bankInfo:formBank.value
})

const token = computed(()=>useAuthStore().token)

const handleOk = async() => {
  formRef.value.validate().then(async() => {

    await $fetch('api/cancel-request', {
      method: 'POST',
      body: formCancelRequest.value,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token.value}`
      },
      baseURL: useRuntimeConfig().public.baseURL
    });
  
    emits('closeModal');
  }).catch((error:any) => {
   
    console.log('Form validation failed', error);
  });
}

const handleCancel = () => {
  emits('closeModal');
  console.log('Cancel clicked');
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('vi-VN');
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('vi-VN') + ' VND';
};

const totalRefundAmount = computed(() => {
  return props.bookings.reduce((total, booking) => total + booking.paid_amount, 0);
});

</script>

<style scoped>
/* Add your styles here */
</style>