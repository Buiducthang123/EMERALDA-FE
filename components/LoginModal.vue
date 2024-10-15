<template>
  <a-modal
    v-model:visible="props.open"
    :width="430"
    style="top: 50px"
    @ok="handleOk"
    @cancel="handleCancel"
    :footer="null"
  >
    <div class="p-2">
      {{  useCookie('token').value  }}
      <h2 class="mb-4 text-2xl font-bold text-center">Đăng nhập</h2>
      <a-form
        ref="loginFormRef"
        :model="loginForm"
        @submit.prevent="handleSubmit"
        class="space-y-6"
        layout="vertical"
      >
        <a-form-item
          name="email"
          label="Email"
          :rules="[{ required: true, message: 'Vui lòng nhập email của bạn!' }]"
        >
          <a-input
            type="email"
            v-model:value="loginForm.email"
            class="w-full px-3 py-2 rounded-lg focus:outline-none"
            placeholder="Enter your email address"
          />
        </a-form-item>
        <a-form-item
          name="password"
          label="Mật khẩu"
          :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]"
        >
          <a-input-password
            v-model:value="loginForm.password"
            class="w-full px-3 py-2 rounded-lg focus:outline-none"
            placeholder="Enter your password"
          />
        </a-form-item>
        <div class="flex items-center justify-center">
          <a-button
            size="large"
            type="primary"
            class="px-4 w-full font-semibold text-white"
            @click="handleSubmit"
          >
            Đăng nhập
          </a-button>
        </div>
      </a-form>
      <div class="mt-4 text-center">
        <a-button
          type="link"
          class="text-blue-500"
          @click="openRegisterForm"
        >
          Đăng ký tài khoản mới
        </a-button>
      </div>
      <div class="mt-4 text-center">
        <a-button
          type="default"
          class="w-full flex items-center justify-center"
          @click="loginWithGoogle"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            class="w-5 h-5 mr-2"
          />
          Đăng nhập với Google
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { useAuthModalState } from '~/composable/authModalState';
import type { IUser } from '~/interfaces/User';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const {user:userStore, setToken, setUser } = authStore

const authModalState = useAuthModalState()
const {  openRegisterModal, closeLoginModal } = authModalState

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: 'handle-cancel'): void;
}>();

const loginForm = reactive({
  email: '',
  password: '',
});

const loginFormRef = ref();

const handleCancel = () => {
  emit('handle-cancel');
};

const handleOk = async () => {
  try {
    const { data: user } = await useFetch<{token:string,user:IUser}>('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: loginForm,
      baseURL: useRuntimeConfig().public.baseURL,
      onResponse: ({ response }) => {
        if (response.ok) {
          console.log(response._data);
          setToken(response._data.token);
          setUser(response._data.user);
          handleCancel();
        } 
        else if (response.status === 401) {
          message.error('Mật khẩu không chính xác');
        } 
        else if (response.status === 404) {
          message.error('Email không tồn tại');
        }
      },
    });
  } catch (error) {
    message.error('Login failed');
    console.error('Login failed', error);
  }
};

const handleSubmit = () => {
  loginFormRef.value.validate().then(() => {
    handleOk();
  }).catch((error:any) => {
    console.log('Validation failed:', error);
  });
};

const openRegisterForm = () => {
  closeLoginModal();
  openRegisterModal();
};

const loginWithGoogle = () => {
  console.log('Login with Google');
  // Logic to handle Google login
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>