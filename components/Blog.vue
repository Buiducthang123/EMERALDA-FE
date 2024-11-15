<template>
    <div>
        <div class="flex gap-8">
            <NuxtImg :src="img" class="w-1/2 object-cover" />
            <div class="w-1/2 space-y-5">
                <h1 class="text-2xl font-bold font-playFair">
                    {{ content.title }}
                </h1>
                <p class="text-base font-baiJamjuree">
                    {{ content.description }}
                </p>
            </div>
        </div>
        <div class="flex justify-between p-2 mt-4 border-y-2">
            <div class="flex gap-4">
                <span>By {{ content.author }}</span>
                <span> | </span>
                <span>{{ content.date }}</span>
                <span> | </span>
                <span>{{ content.comments }} Bình luận</span>
            </div>
            <div class="flex items-center">
                <span>Đọc thêm </span>
                <Icon class="text-xl" name="i-ic-outline-arrow-right"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    img: string;
    content: {
        title: string;
        description: string;
        author: string;
        date: string;
        comments: number;
    };
}>();
</script>

<style scoped>

</style>