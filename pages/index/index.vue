<template>
  <div class="w-full">
    <div class="sticky top-0 -z-10 w-full right-0">
      <SliderImg :list-img="listImg" />
    </div>
    <!--body-->
    <main class="bg-[#FFFFFF] pt-24 pb-10 px-8 space-y-8">
      <section>
        <div class="flex gap-4">
          <div>
            <div class=" space-y-2">
              <p class="tracking-widest leading-relaxed text-sm uppercase">CHÀO MỪNG QUÝ KHÁCH ĐẾN VỚI  Emeralda Resort</p>
              <h1 class="text-5xl font-playFair font-bold">Ngôi nhà của bạn tại Tam Cốc</h1>
            </div>
            <div class="w-16 bg-[#C4A356] h-[0.2px] my-8"></div>
            <p class="pb-5 text-base leading-9">
              Được đặt tại ngay trung tâm của thành phố Tam cốc, khách sạn  Emeralda Resort  là địa điểm lý tưởng để quý khách
              tận hưởng những kỳ nghỉ, trải nghiệm các nét địa phương và khám phá Cố Đô xưa của Việt Nam. Không chỉ được
              đầu tư hệ thống phòng nghỉ tiện nghi, khách sạn  Emeralda Resort  còn là điểm đến tuyệt vời những cho những sự kiện
              lớn
            </p>
          </div>
          <NuxtImg class="max-w-[30%] object-cover"
            src="https://thereedhotel.com/wp-content/uploads/2015/01/Ninh-Binh-f-min.jpg" />
        </div>
      </section>

      <section>
        <div class="flex flex-nowrap">
          <NuxtImg src="https://thereedhotel.com/wp-content/uploads/2017/02/ballroom-classroom-2.jpg"
            class="w-1/3 object-cover" />
          <div class="w-1/3 p-10 text-center bg-[#1D2939] text-white">
            <h2 class="text-3xl font-playFair italic font-medium">"Địa điểm hoàn hảo cho mọi loại hình sự kiện"</h2>
            <div class="flex justify-center mt-6">
              <ButtonCustom>
                <template #title>
                  Xem thêm
                </template>
              </ButtonCustom>
            </div>
          </div>
          <NuxtImg src="https://thereedhotel.com/wp-content/uploads/2015/01/su-kien-the-reed-hotel.jpg"
            class="w-1/3 object-cover" />
        </div>
      </section>


      <section>
        <h2 class="font-playFair text-4xl font-bold text-center mt-10">Tận hưởng những căn phòng tiện nghi</h2>
        <p class="tracking-[0.3em] text-center my-8 uppercase">TẠI Emeralda Hotel </p>

        <div class="flex gap-6 h-auto">
          <CardRoomType class="w-1/3" v-for="(item, index) in roomTypes" :key="index" :roomType="item" />
        </div>
        <ButtonCustom class="mx-auto mt-10">
          <template #title>
            <div class="font-medium text-xl">
              Xem tất cả các loại phòng
            </div>
          </template>
        </ButtonCustom>
      </section>
    </main>
  <Footer />
  </div>
</template>

<script setup lang="ts">
import type { IRoomType } from '~/interfaces/RoomType';

const listImg = [
    'https://thereedhotel.com/wp-content/uploads/2017/04/IMG_2095.jpg',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/465165989.jpg?k=1b2ad16794d725ee5178a9c4eb215d76257973dc655ff9d06e3527aff169139d&o=&hp=1',
    'https://thereedhotel.com/wp-content/uploads/2015/04/interior-banquet-stair.jpg',
    'https://thereedhotel.com/wp-content/uploads/2017/04/DSC03894-HDR-scaled.jpg',
 ]

const { data: roomTypes } = useFetch<IRoomType[]>('api/room-types', {
  method: 'get',
  query: {
    limit: 3
  },
  baseURL: useRuntimeConfig().public.baseURL
})


useSeoMeta({
  title: 'Home -  Emeralda Resort ',
  description: 'Emeralda Resort  - Tam cốc',
})

</script>

<style scoped></style>