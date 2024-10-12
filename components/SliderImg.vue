<template>
    <a-carousel arrows class="h-full" :dots="false" :autoplay="true">
        <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                <div class="flex items-center justify-center">
                    <Icon class="text-4xl" name="i-material-symbols-chevron-left-rounded"/>
                </div>
            </div>
        </template>
        <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
                <div class="flex items-center justify-center">
                    <Icon class="text-4xl" name="i-material-symbols-chevron-right-rounded"/>
                </div>
            </div>
        </template>
        <div v-for="(item, index) in props.listImg" :key="index">
            <img :src="item" class="object-cover w-full"  :style="{height: props.imgHeight||'100%'}" />
        </div>
    </a-carousel>
</template>
<script lang="ts" setup>
const props = defineProps<{
    listImg: string[],
    imgHeight?: string
}>()


</script>
<style scoped>
/* For demo */
:deep(.slick-slide) {
    text-align: center;
    line-height: 160px;
    overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
    width: 40px;
    height: 40px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.534);
    transition: ease all 0.3s;
    opacity: 0.9;   
    z-index: 1;
}

:deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
}

:deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #fff;
    opacity: 0.5;
}

:deep(.slick-slide h3) {
    color: #fff;
}
</style>