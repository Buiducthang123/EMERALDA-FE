<template>
    <div class="">
        <header class="bg-secondary w-full text-white ">
            <div class="container mx-auto flex py-2 items-center justify-between">
                <span>Hotel name : THE REED HOTEL NINH BINH</span>
                <div class="flex items-center gap-3 cursor-pointer" @click="openLoginModal" v-if="!user">
                    <Icon class="text-xl text-white" name="i-material-symbols-home" />
                    <span class="uppercase">Login</span>
                </div>
                <div v-else class="flex items-center gap-4">
                    <a-avatar style="color: #f56a00; background-color: #fde3cf">{{ firstChar }}</a-avatar>
                    <span class="cursor-pointer">{{ user?.name }}</span>
                    <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                </div>
            </div>
        </header>
        <div>
            <slot></slot>
        </div>
        <LoginModal :open="isLoginModalOpen" @handle-cancel="closeLoginModal" />
    </div>
</template>

<script setup lang="ts">
import { useAuthModalState } from '~/composable/authModalState';
import type { IUser } from '~/interfaces/User';

const authModalState = useAuthModalState();
const { isLoginModalOpen, openLoginModal, closeLoginModal } = authModalState;

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