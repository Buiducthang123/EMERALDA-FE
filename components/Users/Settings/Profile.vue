<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-center mb-6">Thông tin người dùng</h2>
    <div class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
      <div class="flex flex-col items-center">
        <a-avatar :size="128" :src="userForm.avatar ?? ''" />
        <a-upload
          :show-upload-list="false"
          :before-upload="beforeUpload"
          @change="handleAvatarChange"
        >
          <a-button class="mt-4">Đổi avatar</a-button>
        </a-upload>
      </div>
      <a-form
        ref="userFormRef"
        :model="userForm"
        :rules="rules"
        @finish="handleFinish"
        @validate="handleValidate"
        @finishFailed="handleFinishFailed"
        class="flex-1 space-y-4"
        layout="vertical"
      >
        <a-form-item name="name" label="Tên" :rules="[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]">
          <a-input v-model:value="userForm.name" placeholder="Nhập tên của bạn" />
        </a-form-item>
        <a-form-item
          name="phone_number"
          label="Số điện thoại"
          :rules="[
            { required: true, message: 'Vui lòng nhập số điện thoại của bạn!' },
            { validator: validatePhoneNumber, trigger: 'blur' }
          ]"
        >
          <a-input v-model:value="userForm.phone_number" placeholder="Nhập số điện thoại của bạn" />
        </a-form-item>
        <a-form-item name="email" label="Email" :rules="[{ required: true, message: 'Vui lòng nhập email của bạn!' }]">
          <a-input v-model:value="userForm.email" placeholder="Nhập email của bạn" />
        </a-form-item>
        <a-form-item label="Địa chỉ">
          <a-input v-model:value="userForm.address" placeholder="Nhập địa chỉ của bạn" />
        </a-form-item>
        <a-form-item label="Ngày sinh">
          <a-date-picker v-model:value="userForm.birthday" placeholder="Chọn ngày sinh của bạn" />
        </a-form-item>
        <div class="flex justify-end">
          <a-button type="primary" html-type="submit">Lưu thay đổi</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { message } from 'ant-design-vue';
import { useAuthStore } from '~/stores/auth';
import { toBase64, handleUploadImg } from '~/utils/file-upload';
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const token = computed(() => authStore.token);
const userForm = ref({
  name: user.value?.name ?? '',
  phone_number: user.value?.phone_number ?? '',
  email: user.value?.email ?? '',
  address: user.value?.address ?? '',
  birthday: user.value?.birthday ?? '',
  avatar: user.value?.avatar ?? '',
});

const userFormRef = ref<FormInstance>();

const validatePhoneNumber = async (_rule: Rule, value: string) => {
  const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
  if (!value) {
    return Promise.reject('Vui lòng nhập số điện thoại của bạn!');
  } else if (!phoneRegex.test(value)) {
    return Promise.reject('Số điện thoại không hợp lệ!');
  } else {
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Vui lòng nhập tên của bạn!' }],
  phone_number: [
    { required: true, message: 'Vui lòng nhập số điện thoại của bạn!' },
    { validator: validatePhoneNumber, trigger: 'blur' }
  ],
  email: [{ required: true, message: 'Vui lòng nhập email của bạn!' }],
};

const handleFinish = async (values: any) => {
  try {
    await $fetch('api/user/update-me', {
      method: 'PATCH',
      body: userForm.value,
      baseURL: useRuntimeConfig().public.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
      onResponse: ({ response }) => {
        if (!response.ok) {
          throw new Error('Cập nhật thông tin thất bại');
        }
        authStore.setUser(response._data);
      },
    });

    message.success('Cập nhật thông tin thành công');
  } catch (error) {
    message.error('Cập nhật thông tin thất bại');
    console.log('Validation failed:', error);
  }
};

const handleFinishFailed = (errors: any) => {
  console.log(errors);
};

const handleValidate = (...args: any) => {
  console.log(args);
};

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Bạn chỉ có thể tải lên tệp JPG/PNG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Hình ảnh phải nhỏ hơn 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const handleAvatarChange = async (info: any) => {
  if (info.file.status === 'done') {
    try {
      const url = await handleUploadImg([info.file]);
      userForm.value.avatar = url;
      message.success('Tải lên avatar thành công');
    } catch (error) {
      message.error('Tải lên avatar thất bại');
    }
  }
};


</script>

<style scoped>
/* Add your styles here if needed */
</style>