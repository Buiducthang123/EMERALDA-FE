<template>
  <div class="grid grid-cols-10">
    <nav class="bg-[#FCF8F2] col-span-2 top-0 py-6 shadow-lg h-screen z-50">
      <div class="flex flex-col justify-between h-full">
        <!-- Logo Section -->
        <div>
          <NuxtImg src="/logo.png" alt="Emeralda Logo" class="mb-8 w-40 h-auto object-contain mx-auto" />
          <!-- Navigation Items -->
          <ul>
            <li v-for="item in menuItems" :key="item.label"
              :class="['relative text-center py-3 border-t text-base font-normal cursor-pointer transition-colors duration-300']"
              @mouseover="item.showOptions = true" @mouseleave="item.showOptions = false"
             >
              <span class="block" :class="{ 'text-[#A76B29]': isCurrentPage(item), 'text-gray-700 hover:text-[#A76B29]': !isCurrentPage(item) }" @click="navigateTo(item.path)">{{ item.label }}</span>
              <ul v-if="item.showOptions" class="absolute left-full top-0 bg-white shadow-lg w-fit">
                <li v-for="(option,index) in item.options" :key="index"
                  class="py-3 text-left text-nowrap text-sm px-5 hover:bg-gray-100 cursor-pointer"
                  @click = "()=>{ if(option.path!='/room') navigateTo(option.path) }"
                  >
                  {{ option.label  }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- Booking & Contact Section -->
        <div class="mt-4">
          <ul class="flex justify-center gap-6">
            <li>
              <a href="https://www.facebook.com/" target="_blank">
                <Icon class="text-3xl" name='i-devicon-facebook' />
              </a>
            </li>
            <li>
              <Icon class="text-3xl" name='i-skill-icons-instagram' />
            </li>
            <li>
              <Icon class="text-3xl" name="i-logos-youtube-icon" />
            </li>
          </ul>
          <p class="text-gray-600 mt-4 text-sm flex items-center justify-center">
            📞 <span class="ml-2">(+84) 9888 718 68</span>
          </p>
        </div>

        <ButtonCustom class="mx-auto py-2 mt-4">
          <template #title>
            ĐẶT PHÒNG NGAY
          </template>
        </ButtonCustom>
      </div>
    </nav>
   <div class="col-span-8 h-screen overflow-y-scroll">
    <slot  />
   </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { IRoomType } from '~/interfaces/RoomType';

const router = useRouter();
const route = useRoute();

const { data: roomTypes } = useFetch<IRoomType[]>('api/room-types', {
  method: 'get',
  query: {
    limit: 3
  },
  baseURL: useRuntimeConfig().public.baseURL
});

const roomTypeName = computed(() => {
  if (roomTypes.value && roomTypes.value.length > 0) {
    return roomTypes.value.map((item) => {
      return {
        label: item.name,
        path: `/rooms/${item.slug}`,
        showOptions: false,}
    });
  }
  return [];
});

interface IMenuItem {
  label: string;
  options: { label: string; path: string }[] | [];
  path: string;
  showOptions: boolean;
}

const menuItems = ref<IMenuItem[]>([
  { label: 'TRANG CHỦ', options: [], showOptions: false, path: '/' },
  {
    label: 'PHÒNG NGHỈ',
    options: roomTypeName.value,
    showOptions: false,
    path: '/rooms'
  },
  {
    label: 'ẨM THỰC',
    options: [],
    showOptions: false,
    path: '/restaurants'
  },
  { label: 'HỘI NGHỊ', options: [], showOptions: false, path: '/conference' },
  { label: 'TIỆC CƯỚI', options: [], showOptions: false, path: '/wedding' },
  { label: 'KHUYẾN MÃI', options: [], showOptions: false, path: '/voucher' },
  { label: 'BLOG', options: [], showOptions: false, path: '/blog' },
  { label: 'LIÊN HỆ', options: [], showOptions: false, path: '/contact' },
]);

const currentPage = ref(route.path);

onMounted(() => {
  const item = menuItems.value.find((item) => item.path === route.path);
  if (item) {
    currentPage.value = item.path;
  }
});

watch(() => route.path, (newVal) => {
  const item = menuItems.value.find((item) => item.path === newVal);
  if (item) {
    currentPage.value = item.path;
  }
});

const isCurrentPage = (item: any) => {
  return item.path === currentPage.value;
};

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style scoped></style>