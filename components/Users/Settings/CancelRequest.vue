<template>
  <a-table :columns="columns" :dataSource="data ?? []" rowKey="id" bordered :pagination="false">
    <template #bodyCell="{ column, record }">
      <span v-if="column.dataIndex === 'bank_account_info'">
        {{ record.bank_account_info.bankAccountNumber }} - {{ record.bank_account_info.recipientName }} - {{ record.bank_account_info.bankName }}
      </span>
      <span v-else-if="column.dataIndex === 'room'">
        Phòng: {{ record.room.room_number }} - {{ record.room.description }}
      </span>
      <span v-else-if="column.dataIndex === 'status'">
        <a-tag color="green">{{ getStatusText(record.status) }}</a-tag>
      </span>
      <span v-else-if="column.dataIndex === 'actions'">
        <a-button type="link" @click="handleDelete(record.id)">Xóa</a-button>
      </span>
      <span v-else>
        {{ record[column.dataIndex as keyof typeof record] }}
      </span>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ICancelRequest } from '~/interfaces/CancelRequest';

const PENDING = 1; // Chờ
const WAITING_COMPLETE = 2; // Chờ hoàn thành
const REJECTED = 3; // Từ chối
const CANCELLED = 4; // Đã hủy
const COMPLETED = 5; // Đã hoàn thành

const getStatusText = (status: number) => {
  switch (status) {
    case PENDING:
      return 'Chờ duyệt';
    case WAITING_COMPLETE:
      return 'Đã duyệt/ chờ xửa lý';
    case REJECTED:
      return 'Từ chối';
    case CANCELLED:
      return 'Đã hủy';
    case COMPLETED:
      return 'Đã hoàn thành';
    default:
      return 'Không xác định';
  }
};

const token = computed(() => useAuthStore().token);

const { data, refresh } = useFetch<ICancelRequest[] | null>('api/cancel-request/me', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token.value}`
  },
  baseURL: useRuntimeConfig().public.baseURL,
  onResponse: ({ response }) => {
    if (response.ok) {
      console.log(response._data);
    }
  },
});

const handleDelete = async (id: number) => {
  try {
    const response = await $fetch(`api/cancel-request/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      baseURL: useRuntimeConfig().public.baseURL,
      onResponse: ({ response }) => {
        if (response.ok) {
          message.success('Xóa thành công');
          refresh();
        } else {
          message.error('Xóa thất bại');
        }
      },
    });

   
  } catch (error) {
    console.error('Error deleting the record:', error);
  }
};

const columns = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Hoàn Tiền',
    dataIndex: 'refund_amount',
    key: 'refund_amount',
  },
  {
    title: 'Thông tin tài khoản',
    dataIndex: 'bank_account_info',
    key: 'bank_account_info',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Room Info',
    dataIndex: 'room',
    key: 'room',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
  },
]);
</script>

<style scoped>
/* Add your styles here */
</style>