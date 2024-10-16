<template>
  <a-modal
    v-model:open="props.open"
    :width="500"
    style="top: 50px"
    @ok="handleOk"
    @cancel="handleCancel"
    :footer="null"
  >
    <div class="p-2">
      <h2 class="mb-4 text-2xl font-bold text-center">Đăng ký</h2>
      <a-form
        ref="registerFormRef"
        :model="registerForm"
        @submit.prevent="handleSubmit"
        class="space-y-6"
        layout="vertical"
      >
        <a-form-item
          name="name"
          label="Tên"
          :rules="[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]"
        >
          <a-input
            v-model:value="registerForm.name"
            class="w-full px-3 py-2 rounded-lg focus:outline-none"
            placeholder="Nhập tên của bạn"
          />
        </a-form-item>
        <a-form-item
          name="email"
          label="Email"
          :rules="[{ required: true, message: 'Vui lòng nhập email của bạn!' }]"
        >
          <a-input
            type="email"
            v-model:value="registerForm.email"
            class="w-full px-3 py-2 rounded-lg focus:outline-none"
            placeholder="Nhập email của bạn"
          />
        </a-form-item>
        <a-form-item
          name="phone_number"
          label="Số điện thoại"
          :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]"
        >
          <a-input
            v-model:value="registerForm.phone_number"
            class="w-full px-3 py-2 rounded-lg focus:outline-none"
            placeholder="Nhập số điện thoại của bạn"
          />
        </a-form-item>
        <a-form-item
          name="password"
          label="Mật khẩu"
          :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]"
        >
          <a-input-password
            v-model:value="registerForm.password"
            class="w-full px-3 py-2 rounded-lg focus:outline-none"
            placeholder="Nhập mật khẩu của bạn"
          />
        </a-form-item>
        <a-form-item
          name="password_confirmation"
          label="Xác nhận mật khẩu"
          :rules="[{ required: true, message: 'Vui lòng xác nhận mật khẩu của bạn!' }]"
        >
          <a-input-password
            v-model:value="registerForm.password_confirmation"
            class="w-full px-3 py-2 rounded-lg focus:outline-none"
            placeholder="Xác nhận mật khẩu của bạn"
          />
        </a-form-item>
        <div class="mt-4 text-center">
        <a-button
          type="link"
          class="text-blue-500"
          @click="openLoginForm"
        >
          Đăng nhập tài khoản đã có
        </a-button>
      </div>
        <div class="flex items-center justify-center">
          <a-button
            size="large"
            type="primary"
            class="px-4 w-full font-semibold text-white"
            @click="handleSubmit"
          >
            Đăng ký
          </a-button>
        </div>
      </a-form>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { useAuthModalState } from '~/composable/authModalState';
import { useAuthStore } from '~/stores/auth';
import type { IUser } from '~/interfaces/User';

const authStore = useAuthStore();
const { setToken, setUser } = authStore;

const authModalState = useAuthModalState();
const { closeRegisterModal, openLoginModal } = authModalState;

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: 'handle-cancel'): void;
}>();

const registerForm = reactive({
  name: '',
  email: '',
  phone_number: '',
  password: '',
  password_confirmation: '',
});

const registerFormRef = ref();

const handleCancel = () => {
  emit('handle-cancel');
};

const handleOk = async () => {
  await $fetch<{ token: string; user: IUser }>('api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: registerForm,
      baseURL: useRuntimeConfig().public.baseURL,
      onResponse: ({ response }) => {
        if (response.ok) {
          setToken(response._data.token);
          setUser(response._data.user);
          handleCancel();
        } else {
          message.error(response._data.message ?? 'Đã có lỗi xảy ra');
        }
      },
    });
};

const handleSubmit = () => {
  if (registerForm.password !== registerForm.password_confirmation) {
    message.error('Mật khẩu và xác nhận mật khẩu không khớp');
    return;
  }

  registerFormRef.value.validate().then(() => {
    handleOk();
  }).catch((error: any) => {
    console.log('Validation failed:', error);
  });
};

const openLoginForm = () => {
  closeRegisterModal();
  openLoginModal();
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>