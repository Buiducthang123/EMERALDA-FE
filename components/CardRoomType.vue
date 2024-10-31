<template>
    <div class="bg-[#eceef0] px-10 pt-56 pb-8 bg-cover bg-no-repeat rounded-t-lg"
        :style="{ backgroundImage: `url(${roomType.main_image})` }">
        <!-- Nội dung thông tin -->
        <div class="p-10 text-center bg-white group">
            <h2 class="text-xl font-bold mb-2 transition-all group-hover:text-[#C5A45A]">{{ roomType.name }}</h2>
            <div class="bg-[#C5A45A] w-[40%] h-[0.3px] mx-auto my-6"></div>
            <p class="text-gray-600 mb-4">{{ roomType.intro_description }}</p>
            <ButtonCustom class="mx-auto" :redirect-to="'/rooms/'+roomType.slug">
                <template #title>
                    Chi tiết
                </template>
            </ButtonCustom>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IRoomType } from '~/interfaces/RoomType';

const props = defineProps<{
    roomType: IRoomType
}>();
</script>