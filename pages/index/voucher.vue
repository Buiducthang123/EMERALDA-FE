<template>
    <div class="h-screen overflow-y-scroll ">
        <div
            class="-z-10 flex justify-center items-center bg-[url('https://moitruongdulich.vn/mypicture/images/2023/T11/1711Doi-moi-hoat-dong-du-lich-tai-Tam-Coc-Bich-Dong-4.jpg')]  bg-no-repeat bg-cover sticky top-0 h-screen">
            <h1 class="font-playFair text-white font-bold text-5xl">Ưu đãi</h1>
        </div>
        <div class="z-100 bg-white pb-10 px-12">
            <div v-if="vouchers && vouchers.length > 0">
                <div class="font-baiJamjuree text-3xl font-medium text-center py-10">Mã giảm giá</div>
                <div v-for="(voucher, index) in vouchers" :key="voucher.id" class="shadow-lg px-12 py-8 mb-20 bg-[#ecd1b133]">
                    <div>
                        <div class="flex gap-10 justify-between" :class="(index % 2) == 0 ? 'flex-row-reverse' : ''">
                            <div class="ckeditor font-baiJamjuree tracking-widest">
                                <div class="mb-4 space-y-3">
                                    <p class="font-baiJamjuree text-xl font-bold ">{{ voucher.name }}</p>
                                    <p>MÃ code: {{ voucher.code }}</p>
                                </div>
                                <div v-html="voucher.description">
                                </div>

                                <p class="mt-4">Ngày bắt đầu: {{ voucher.valid_from }}</p>
                                <p>Ngày kết thúc: {{ voucher.valid_until }}</p>
                            </div>
                            <div>
                                <a-image class=" xl:w-[40%] aspect-square object-cover lg:w-[30%]"
                                    :src="voucher.main_image"></a-image>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="text-center flex flex-col items-center">
                <p class="font-baiJamjuree text-base font-medium mb-6">Hiện tại chưa có ưu đãi nào</p>


                <div class="🤚">
                    <div class="👉"></div>
                    <div class="👉"></div>
                    <div class="👉"></div>
                    <div class="👉"></div>
                    <div class="🌴"></div>
                    <div class="👍"></div>
                </div>
            </div>
        </div>

        <Footer />
    </div>


</template>

<script setup lang="ts">
import type { IVoucher } from '~/interfaces/Voucher';

useSeoMeta({
  title: 'Khuyến mãi -  Emeralda Resort ',
  description: 'Emeralda Resort  - Tam cốc',
})

const { data: vouchers } = useFetch<IVoucher[]>('api/vouchers-ongoing', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    baseURL: useRuntimeConfig().public.baseURL
});


</script>

<style scoped>
/* From Uiverse.io by Pradeepsaranbishnoi */
.🤚 {
    --skin-color: #E4C560;
    --tap-speed: 0.6s;
    --tap-stagger: 0.1s;
    position: relative;
    width: 80px;
    height: 60px;
    margin-left: 80px;
}

.🤚:before {
    content: '';
    display: block;
    width: 180%;
    height: 75%;
    position: absolute;
    top: 70%;
    right: 20%;
    background-color: black;
    border-radius: 40px 10px;
    filter: blur(10px);
    opacity: 0.3;
}

.🌴 {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--skin-color);
    border-radius: 10px 40px;
}

.👍 {
    position: absolute;
    width: 120%;
    height: 38px;
    background-color: var(--skin-color);
    bottom: -18%;
    right: 1%;
    transform-origin: calc(100% - 20px) 20px;
    transform: rotate(-20deg);
    border-radius: 30px 20px 20px 10px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    border-left: 2px solid rgba(0, 0, 0, 0.1);
}

.👍:after {
    width: 20%;
    height: 60%;
    content: '';
    background-color: rgba(255, 255, 255, 0.3);
    position: absolute;
    bottom: -8%;
    left: 5px;
    border-radius: 60% 10% 10% 30%;
    border-right: 2px solid rgba(0, 0, 0, 0.05);
}

.👉 {
    position: absolute;
    width: 80%;
    height: 35px;
    background-color: var(--skin-color);
    bottom: 32%;
    right: 64%;
    transform-origin: 100% 20px;
    animation-duration: calc(var(--tap-speed) * 2);
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    transform: rotate(10deg);
}

.👉:before {
    content: '';
    position: absolute;
    width: 140%;
    height: 30px;
    background-color: var(--skin-color);
    bottom: 8%;
    right: 65%;
    transform-origin: calc(100% - 20px) 20px;
    transform: rotate(-60deg);
    border-radius: 20px;
}

.👉:nth-child(1) {
    animation-delay: 0;
    filter: brightness(70%);
    animation-name: tap-upper-1;
}

.👉:nth-child(2) {
    animation-delay: var(--tap-stagger);
    filter: brightness(80%);
    animation-name: tap-upper-2;
}

.👉:nth-child(3) {
    animation-delay: calc(var(--tap-stagger) * 2);
    filter: brightness(90%);
    animation-name: tap-upper-3;
}

.👉:nth-child(4) {
    animation-delay: calc(var(--tap-stagger) * 3);
    filter: brightness(100%);
    animation-name: tap-upper-4;
}

@keyframes tap-upper-1 {

    0%,
    50%,
    100% {
        transform: rotate(10deg) scale(0.4);
    }

    40% {
        transform: rotate(50deg) scale(0.4);
    }
}

@keyframes tap-upper-2 {

    0%,
    50%,
    100% {
        transform: rotate(10deg) scale(0.6);
    }

    40% {
        transform: rotate(50deg) scale(0.6);
    }
}

@keyframes tap-upper-3 {

    0%,
    50%,
    100% {
        transform: rotate(10deg) scale(0.8);
    }

    40% {
        transform: rotate(50deg) scale(0.8);
    }
}

@keyframes tap-upper-4 {

    0%,
    50%,
    100% {
        transform: rotate(10deg) scale(1);
    }

    40% {
        transform: rotate(50deg) scale(1);
    }
}
</style>