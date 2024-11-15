<template>
  <div>
    <section
      class="flex items-center p-6 bg-[url('https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_343618/763c00bd5f1b593f18a9da6c26b7134a.jpg')] bg-no-repeat bg-cover h-80">
      <div class="h-fit w-full my-auto flex justify-between items-center text-white">
        <h1 class=" font-mono text-5xl font-bold">Liên hệ với chúng tôi</h1>
        <div>
          <span>Home</span>
          <span> | </span>
          <span>Tin tức</span>
        </div>
      </div>
    </section>

    <section class="mt-10">
      <div class="px-10 mt-20 flex gap-8 mb-10">
            <div class="w-1/3">
                <h6 class="text-4xl font-baiJamjuree font-semibold mb-6">Để đặt kỳ nghỉ của bạn!</h6>

                <span class="uppercase">AT THE Emeralda Resort</span>
                
                <StraightLineCustom class="my-8" :width="'80px'" />

                <p class="leading-9">
                  Một kỳ nghỉ gia đình, một chuyến du lịch khám phá hay một chuyến công tác, Quý khách luôn cần một địa điểm nghỉ ngơi tiện nghi, thưởng thức những món ăn đặc sắc và hưởng thụ chất lượng dịch vụ tốt nhất. Hãy liên hệ với The Reed Hotel ngay hôm nay để có khoảng thời gian đáng nhớ tại Ninh Bình!    
                </p>
                <ButtonCustom class="mt-32">
                   <template #title>
                      Đặt phòng ngay
                    </template>
                </ButtonCustom>

            </div>

            <div class="shadow-lg w-2/3 p-6 bg-[url('https://thereedhotel.com/wp-content/uploads/2015/02/feat_room_bg1.jpg')] bg-no-repeat bg-cover bg-right">
                    <NuxtImg src="https://thereedhotel.com/wp-content/uploads/2015/02/the-reed-hotel-tam-coc-800x533.jpg" alt="" class="w-full border-[10px] shadow-xl border-white" />
            </div>
        </div>
    </section>

    <section class="bg-[#F4F6F8] px-20 pb-10">
      <div class="bg-[url('https://thereedhotel.com/wp-content/uploads/2015/01/flowers_top.png')] w-1/3 mx-auto bg-no-repeat bg-contain h-24">
        
      </div>
      <a-form layout="vertical" class="">
        <a-form-item required>
          <template #label>
            <span class="font-bold text-base">Họ và Tên</span>
          </template>
          <a-input size="large" v-model="form.name" placeholder="Nhập họ và tên của bạn" />
        </a-form-item>
        <a-form-item required>
          <template #label>
            <span class="font-bold text-base">Email</span>
          </template>
          <a-input size="large" v-model="form.email" placeholder="Nhập email của bạn" />
        </a-form-item>
        <a-form-item required>
          <template #label>
            <span class="font-bold text-base">Tiêu đề</span>
          </template>
          <a-input size="large" v-model="form.subject" placeholder="Nhập tiêu đề" />
        </a-form-item>
        <a-form-item required>
          <template #label>
            <span class="font-bold text-base">Nội dung</span>
          </template>
          <a-textarea :rows="4"size="large" v-model="form.message" placeholder="Nhập nội dung" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" size="large" html-type="submit">Gửi</a-button>
        </a-form-item>
      </a-form>
    </section>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});
</script>

<style scoped></style>