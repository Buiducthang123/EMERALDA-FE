<template>
    <div class="w-full">
        <section class="px-10 mt-20 flex gap-8 mb-10">
            <div class="w-1/3">
                <h6 class="text-4xl font-baiJamjuree font-semibold mb-6">Feel Like Home</h6>

                <span class="uppercase">AT THE Emeralda Resort</span>
                
                <StraightLineCustom class="my-8" :width="'80px'" />

                <p class="leading-9">
                    Phòng nghỉ của Emeralda Resort không chỉ tiện nghi mà còn rất ấm cúng, giúp quý khách cảm thấy như đang ở nhà mình trong suốt kỳ nghỉ.
                </p>

                <ul>
                    <li v-for="(item) in amenities || []" :key="item.id" class="flex gap-4 items-center py-2">
                        <Icon name="i-material-symbols-check-circle-outline-rounded" class="text-primary" />
                        {{ item.name }}
                    </li>

                    <li v-if="amenities && amenities.length > 0" class="flex gap-4 items-center py-2">
                        <Icon name="i-material-symbols-check-circle-outline-rounded" class="text-primary" />
                        ...và các tiện ích khác
                    </li>
                </ul>
            </div>

            <div class="shadow-lg w-2/3 p-6 bg-[url('https://thereedhotel.com/wp-content/uploads/2015/02/feat_room_bg1.jpg')] bg-no-repeat bg-cover bg-right">
                    <NuxtImg src="https://thereedhotel.com/wp-content/uploads/2015/07/room-deluxe-3-1200x799.jpg" alt="" class="mx-auto border-[10px] shadow-xl border-white" />
            </div>
        </section>
        
        <section class="bg-white pb-14 ">
                <h2 class="font-playFair text-3xl font-bold text-center pt-8 px-10 pb-16">Chọn các loại phòng</h2>
                <div class="flex justify-between gap-y-6 flex-wrap h-auto">
                    <CardRoomType class="w-[32%]" v-for="(item, index) in roomTypesOrther" :key="index" :roomType="item" />
                </div>

            </section>
    </div>
</template>

<script setup lang="ts">
import StraightLineCustom from '~/components/StraightLineCustom.vue';
import type { IAmenity } from '~/interfaces/Amenity';
import type { IRoomType } from '~/interfaces/RoomType';


const route = useRoute();

const { data: roomType } = await useFetch<IRoomType>(`api/room-types/${route.params.slug}`, {
    method: 'get',
    baseURL: useRuntimeConfig().public.baseURL
});

const roomTypesOrther = computed(() => {
    if (roomTypes.value && roomTypes.value.length > 0) {
        return roomTypes.value.filter((item) => item.id !== roomType.value?.id);
    }
});

const { data: roomTypes } = useFetch<IRoomType[]>('api/room-types', {
    method: 'get',
    baseURL: useRuntimeConfig().public.baseURL
});

const {data:amenities} = useFetch<IAmenity[]>('api/amenities', {
    method: 'get',
    baseURL: useRuntimeConfig().public.baseURL,
    query: {
        'limit': 5
    }
})
</script>

<style scoped></style>