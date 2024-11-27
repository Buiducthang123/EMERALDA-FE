<template>
  <a-modal
    v-model:open="props.open"
    width="50%"
    style="top: 30px"
    title="Yêu cầu hủy đặt phòng"
    @cancel="handleCancel"
    :footer="null"
  >
    <div v-if="props.bookings.length > 0" class="space-y-6 mt-6">
      <div class="space-y-4">
        <div v-for="booking in props.bookings" :key="booking.id" class="p-4 border border-gray-200 rounded-lg shadow-sm">
          <p class="text-lg font-bold">Phòng: {{ booking.room.room_number }}</p>
          <p>Hoàn trả: <span class="text-green-500 font-bold">{{ formatCurrency(Number(booking.paid_amount)) }}</span></p>
        </div>
      </div>
      <div class="p-4 border border-gray-200 rounded-lg shadow-sm text-center">
        <p class="text-lg font-bold">Tổng số tiền hoàn trả:</p>
        <p class="text-2xl text-green-500 font-bold">{{ formatCurrency(totalRefundAmount) }}</p>
      </div>
      <div class="text-center">
        <a-button type="primary" size="large" @click="handleOk">Xác nhận hủy</a-button>
      </div>
    </div>
    <div v-else>
      <p class="text-center text-gray-500">Không có phòng nào được chọn để hủy.</p>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRuntimeConfig } from '#app';
import { message } from 'ant-design-vue';
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
}>();

const emits = defineEmits(['closeModal', 'submit']);

const token = computed(() => useAuthStore().token);

const handleOk = async () => {
  try {
    await $fetch('api/cancel-request', {
      method: 'POST',
      body: {
        dataRequest: props.bookings,
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      baseURL: useRuntimeConfig().public.baseURL,
    });

    message.success('Yêu cầu hủy đặt phòng đã được gửi đi. Vui lòng chờ xác nhận từ quản trị viên.');
    emits('closeModal');
  } catch (error) {
    message.error('Đã xảy ra lỗi khi gửi yêu cầu hủy đặt phòng. Vui lòng thử lại sau.');
  }
};

const handleCancel = () => {
  emits('closeModal');
};

const formatCurrency = (value: number) => {
  return value.toLocaleString('vi-VN') + ' VND';
};

const totalRefundAmount = computed(() => {
  return props.bookings.reduce((total, booking) => Number(total) + Number(booking.paid_amount), 0);
});
</script>

<style scoped>
.space-y-6 {
  margin-top: 1.5rem;
}

.space-y-4 {
  margin-top: 1rem;
}

.p-4 {
  padding: 1rem;
}

.border {
  border-width: 1px;
}

.border-gray-200 {
  border-color: #e5e7eb;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.text-center {
  text-align: center;
}

.text-lg {
  font-size: 1.125rem;
}

.font-bold {
  font-weight: 700;
}

.text-2xl {
  font-size: 1.5rem;
}

.text-green-500 {
  color: #10b981;
}
</style>