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
          <a-button class="mt-4" icon="upload">Đổi avatar</a-button>
        </a-upload>
      </div>
      <a-form
        ref="userFormRef"
        :model="userForm"
        @submit.prevent="handleSubmit"
        class="flex-1 space-y-4"
        layout="vertical"
      >
        <a-form-item label="Tên" :rules="[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]">
          <a-input v-model:value="userForm.name" placeholder="Nhập tên của bạn" />
        </a-form-item>
        <a-form-item label="Số điện thoại" :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]">
          <a-input v-model:value="userForm.phone_number" placeholder="Nhập số điện thoại của bạn" />
        </a-form-item>
        <a-form-item label="Email" :rules="[{ required: true, message: 'Vui lòng nhập email của bạn!' }]">
          <a-input v-model:value="userForm.email" placeholder="Nhập email của bạn" />
        </a-form-item>
        <a-form-item label="Địa chỉ">
          <a-input v-model:value="userForm.address" placeholder="Nhập địa chỉ của bạn" />
        </a-form-item>
        <a-form-item label="Vai trò">
          <a-select v-model:value="userForm.role" placeholder="Chọn vai trò của bạn">
            <a-select-option value="1">Người dùng</a-select-option>
            <a-select-option value="2">Quản lý</a-select-option>
            <a-select-option value="3">Nhân viên</a-select-option>
            <a-select-option value="4">Quản trị viên</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Trạng thái">
          <a-select v-model:value="userForm.status" placeholder="Chọn trạng thái của bạn">
            <a-select-option value="1">Hoạt động</a-select-option>
            <a-select-option value="0">Không hoạt động</a-select-option>
          </a-select>
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

<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';

const user = ref({
  id: 1,
  name: "admin",
  phone_number: "0912345673",
  email: "admin@gmail.com",
  avatar: null,
  address: null,
  role: 4,
  status: "1",
  birthday: null,
  email_verified_at: null,
  created_at: "2024-10-12T09:36:46.000000Z",
  updated_at: "2024-10-12T09:36:46.000000Z"
});

const userForm = ref({ ...user.value });

const userFormRef = ref();

const handleSubmit = () => {
  userFormRef.value.validate().then(() => {
    // Gửi dữ liệu cập nhật lên server
    // Ví dụ:
    // axios.post('/api/update-user', userForm.value)
    //   .then(response => {
    //     message.success('Cập nhật thông tin thành công');
    //   })
    //   .catch(error => {
    //     message.error('Cập nhật thông tin thất bại');
    //   });

    message.success('Cập nhật thông tin thành công');
  }).catch((error: any) => {
    console.log('Validation failed:', error);
  });
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

const handleAvatarChange = (info: any) => {
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (imageUrl: string) => {
      userForm.value.avatar = imageUrl;
      message.success('Tải lên avatar thành công');
    });
  }
};

const getBase64 = (img: File, callback: (imageUrl: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>