<template>
    <nav class=" bg-[#FCF8F2] min-w-80 p-6 shadow-lg z-50">
      <div class="flex flex-col justify-between h-full">
        <!-- Logo Section -->
        <div>
          <NuxtImg src="/logo.png" alt="Emeralda Logo" class="my-16 max-w-24  h-auto object-contain mx-auto" />
          <!-- Navigation Items -->
          <ul class="space-y-6">
            <li v-for="item in navItems" :key="item" class="text-center text-base font-normal text-gray-700 hover:text-green-600 cursor-pointer transition-colors duration-300">
              {{ item }}
            </li>
          </ul>
        </div>
        <!-- Booking & Contact Section -->
        <div class="mt-6">
          <button class="bg-green-600 text-white w-full py-3 rounded-full text-lg font-semibold hover:bg-green-500 transition-colors duration-300">
            Book Now
          </button>
          <p class="text-gray-600 mt-6 text-sm flex items-center justify-center">
            📞 <span class="ml-2">(+84) 9888 718 68</span>
          </p>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  const navItems = [
    "Trang Chủ", "Ưu Đãi", "Phòng Nghỉ", "Nhà Hàng Cơm", "Hội Họp", 
    "La Cochinchine Spa", "Jade Bar", "Hoạt Động", "Hình Ảnh", "Liên Hệ", "English"
  ];
  </script>
  
  <style scoped>
  nav {
    width: 16rem;
  }
  </style>
  