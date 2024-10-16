<template>
  <div class="h-[50vh]">
    <h2 class="text-2xl font-bold text-center mb-6">Thông tin thanh toán</h2>
    <a-table :columns="columns" :dataSource="paymentData || []" rowKey="id" bordered :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-tag :color="record.status === '2' ? 'green' : 'red'">
            {{ record.status === '2' ? 'Thanh toán thành công' : 'Chưa thanh toán' }}
          </a-tag>
        </template>
      </template>
      <template #expandedRowRender="{ record }">
        <div class="p-4 bg-gray-50">
          <h4 class="text-md font-semibold">Thông tin thanh toán</h4>
          <p><strong>Voucher_code:</strong> {{ record.voucher_code ?? 'N/A' }}</p>
          <p><strong>Số tiền:</strong> {{ record.payment.amount.toLocaleString() }} VND</p>
          <p><strong>Mã giao dịch:</strong> {{ record.payment.transaction_id ?? 'N/A' }}</p>
          <p><strong>Ngày thanh toán:</strong> {{ record.payment.payment_date ? new Date(record.payment.payment_date).toLocaleDateString() : 'N/A' }}</p>
          <h4 class="text-md font-semibold mt-4">Thông tin khách hàng</h4>
          <p><strong>Tên:</strong> {{ record.customer_info.name }}</p>
          <p><strong>Số điện thoại:</strong> {{ record.customer_info.phone_number }}</p>
          <p><strong>Email:</strong> {{ record.customer_info.email }}</p>
          <p><strong>Địa chỉ:</strong> {{ record.customer_info.address }}</p>
          <p><strong>Ngày sinh:</strong> {{ new Date(record.customer_info.birthday).toLocaleDateString() }}</p>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { IPayment } from '~/interfaces/Payment';
import type { IOrder } from '~/interfaces/Order';

const columns = [
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    filters: [
      { text: 'Thanh toán thành công', value: '2' },
      { text: 'Chưa thanh toán', value: '1' },
    ],
    onFilter: (value: string, record: any) => record.status === value,
    customRender: ({ text }: { text: string }) => {
      return h(
        'a-tag',
        { color: text === '2' ? 'green' : 'red' },
        text === '2' ? 'Thanh toán thành công' : 'Chưa thanh toán'
      );
    },
  },
  {
    title: 'Đơn hàng',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Khách hàng',
    dataIndex: ['customer_info', 'name'],
    key: 'customer_info.name',
  },
  {
    title: 'Số điện thoại',
    dataIndex: ['customer_info', 'phone_number'],
    key: 'customer_info.phone_number',
  },
  {
    title: 'Email',
    dataIndex: ['customer_info', 'email'],
    key: 'customer_info.email',
  },
  {
    title: 'Tổng giá',
    dataIndex: 'total_price',
    key: 'total_price',
    customRender: ({ text }: { text: number }) => `${text.toLocaleString()} VND`,
  },
  {
    title: 'Số tiền đã thanh toán',
    dataIndex: 'prepayment_amount',
    key: 'prepayment_amount',
    customRender: ({ text }: { text: number }) => `${text.toLocaleString()} VND`,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created_at',
    key: 'created_at',
    customRender: ({ text }: { text: string }) => new Date(text).toLocaleDateString(),
  },
];

const token = useAuthStore().token;

const { data: paymentData } = useFetch<IOrder[]>('/api/orders/my-orders', {
  method: 'get',
  headers: {
    Authorization: `Bearer ${token}`
  },
  baseURL: useRuntimeConfig().public.baseURL
});
</script>

<style scoped>
/* Add your styles here if needed */
</style>