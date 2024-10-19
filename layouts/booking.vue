<template>
  <div class="">
    <header class="bg-secondary w-full text-white">
      <div class="container mx-auto flex py-2 items-center justify-between">
        <span>Resort  name :  Emeralda Resort Tam Coc</span>
        <div class="flex items-center gap-3 cursor-pointer" @click="openLoginModal" v-if="!user">
          <Icon class="text-xl text-white" name="i-material-symbols-home" />
          <span class="uppercase">Login</span>
        </div>
        <div v-else class="flex items-center gap-4">
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="settings" @click="openModalSetting">
                  <Icon class="mr-2" name="i-material-symbols-settings" />
                  Cài đặt
                </a-menu-item>
                <a-menu-item key="logout" @click="logout">
                  <Icon class="mr-2" name="i-material-symbols-logout" />
                  Đăng xuất
                </a-menu-item>
              </a-menu>
            </template>
            <div class="flex items-center gap-2 cursor-pointer">
              <a-avatar style="color: #f56a00; background-color: #fde3cf">{{ firstChar }}</a-avatar>
              <span>{{ user?.name }}</span>
            </div>
          </a-dropdown>
        </div>
      </div>
    </header>
    <div>
      <slot></slot>
    </div>
    <LoginModal :open="isLoginModalOpen" @handle-cancel="closeLoginModal" />
    <RegisterModal :open="isRegisterModalOpen" @handle-cancel="closeRegisterModal" />
    <UsersSetting v-if="isOpenModalSetting" :open="isOpenModalSetting" @handle-cancel="closeModalSetting" />
  </div>
</template>

<script setup lang="ts">
import { useAuthModalState } from '~/composable/authModalState';
import { useUserSettingState } from '~/composable/userSettingState';
import type { IUser } from '~/interfaces/User';
import { useAuthStore } from '~/stores/auth';

const authModalState = useAuthModalState();
const { isLoginModalOpen, openLoginModal, closeLoginModal, isRegisterModalOpen, openRegisterModal, closeRegisterModal } = authModalState;

const userSettingState = useUserSettingState();
const { isOpenModalSetting, openModalSetting, closeModalSetting } = userSettingState;

const authStore = useAuthStore();
const { setToken, setUser, token } = authStore;

const user = computed(() => authStore.user);
const firstChar = computed(() => {
  return user.value?.name ? user.value.name.charAt(0).toUpperCase() : 'U';
});

onMounted(async () => {
  const token = useCookie('token').value;
  if (token) {
    try {
      const user = await $fetch<IUser>('/api/user/info', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        baseURL: useRuntimeConfig().public.baseURL,
      });

      if (user) {
        setUser(user);
        setToken(token);
      }
    } catch (err) {
      console.error('Fetch Error:', err); // Kiểm tra lỗi fetch
      setToken('');
    }
  }
});

const logout = () => {
  window.location.reload();
  setToken('');
  useCookie('token').value = '';
};
</script>

<style scoped></style>