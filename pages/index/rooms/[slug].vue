<template>
    <div class="w-full">
        <section class="sticky top-0 -z-10 w-full right-0">
            <SliderImg :img-height="'80vh'" :list-img="roomType?.thumbnails || []" />
        </section>
        <section class="bg-white pb-14">
            <section class="py-20 px-10  space-y-20">
                <div class=" flex flex-nowrap gap-10">
                    <div class="w-full">
                        <span class="tracking-widest uppercase">Thông tin</span>
                        <h1 class="font-playFair text-4xl font-bold">{{ roomType?.name }}</h1>
                        <StraightLineCustom class="my-8" :width="'80px'" />
                        <div v-html="roomType?.description" class="space-y-4">

                        </div>
                    </div>

                    <div class="w-1/3 py-20 px-11 bg-[#F4F6F8] text-center">
                        <h6 class="font-playFair text-3xl font-bold">Đặt phòng</h6>
                        <StraightLineCustom class="my-8" :width="'100%'" />
                        <ButtonCustom :hidden-icon="true" class="mx-auto">
                            <template #title>
                                ĐẶT PHÒNG
                            </template>
                        </ButtonCustom>
                    </div>
                </div>


                <div class="flex gap-10">
                    <a-image v-for="(item, index) in roomType?.thumbnails" :key="index" :src="item" class="object-cover"
                        width="33.33%" />
                </div>
            </section>
            <section class="bg-[#F4F6F8] text-center px-10 pb-12">
                <NuxtImg src="amenities_bg.png" alt="" class="mx-auto" />
                <p class="uppercase tracking-widest text-xl mt-8 ">Emeralda Resort </p>
                <h3 class="font-playFair text-4xl font-bold mt-5 pb-16">Trang bị {{ roomType?.name }}</h3>

                <ul class="grid grid-cols-12 text-left gap-4">
                    <li v-for="(item, index) in roomType?.amenities" :key="index"
                        class="col-span-3 flex items-center gap-2">
                        <Icon name="i-material-symbols-check-circle-outline-rounded" class="text-primary " />
                        {{ item }}
                    </li>
                    <li class="col-span-3 flex items-center gap-2"
                        v-if="roomType?.amenities && roomType?.amenities?.length > 0">
                        <Icon name="i-material-symbols-check-circle-outline-rounded" class="text-primary " />
                        ...và các tiện ích khác
                    </li>
                </ul>
            </section>

            <section class="px-10">
                <h2 class="font-playFair text-3xl font-bold text-center pt-8 px-10 pb-16"
                    v-if="roomType?.roomTypeReviews && roomType?.roomTypeReviews.length > 0">Đánh giá mới nhất</h2>

                <div class="flex gap-8 w-full overflow-x-auto pb-5">
                    <a-comment v-for="(comment) in roomType?.roomTypeReviews "
                        class="w-1/3 min-w-[300px] shadow-lg p-4 rounded-lg">
                        <template #author><a>{{ comment.user.name }}</a></template>
                        <template #avatar>
                            <a-avatar :src="comment.avatar" alt="avatar" />
                        </template>
                        <template #content>
                            <div class="rating">
                                <span v-for="star in 5" :key="star" class="star"
                                    :class="{ filled: star <= comment.rating }">
                                    ★
                                </span>
                            </div>
                            <p class="mt-4">
                                <span v-if="comment.comment">
                                    {{ comment.comment }}
                                </span>
                                <span v-else>
                                    Không có bình luận
                                </span>
                            </p>
                        </template>
                        <template #datetime>
                            <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
                                <span>{{ dayjs(dayjs(comment.created_at)).fromNow() }}</span>
                            </a-tooltip>
                        </template>
                    </a-comment>
                </div>
            </section>


            <section>
                <h2 class="font-playFair text-3xl font-bold text-center pt-8 px-10 pb-16">Xem thêm các loại phòng khác
                </h2>
                <div class="flex gap-6 h-auto px-10">
                    <CardRoomType class="w-1/3" v-for="(item, index) in roomTypesOrther" :key="index"
                        :roomType="item" />
                </div>

            </section>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { IRoomType } from '~/interfaces/RoomType';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const route = useRoute();

const { data: roomType } = await useFetch<IRoomType>(`api/room-types/${route.params.slug}`, {
    method: 'get',
    params: {
        'q[]': ['amenities', 'roomTypeReviews']
    },
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


</script>

<style scoped>
/* width */
::-webkit-scrollbar {
    height: 4px;
    /* Adjust the height for horizontal scrollbar */
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.rating {
    display: flex;
    justify-content: flex-start;
}

.star {
    cursor: pointer;
    font-size: 2rem;
    color: #ccc;
    transition: color 0.2s;
}

.star.filled {
    color: #ffd700;
}

.rating {
    display: flex;
    justify-content: flex-start;
}

.star {
    cursor: pointer;
    font-size: 2rem;
    color: #ccc;
    transition: color 0.2s;
}

.star.filled {
    color: #ffd700;
}
</style>