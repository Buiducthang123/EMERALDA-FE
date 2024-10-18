<template>
    <a-button 
        type="ghost" 
        class="bg-[#C4A456] h-10 text-white rounded-none py-0 pl-4 pr-0 flex items-center gap-5" 
        :class="{ 'pr-4': hiddenIcon }"
        @click="useRouter().push(props.redirectTo ?? '/booking')"
    >
        <div class="font-medium">
            <slot name="title"></slot>
        </div>
        <div 
            class="flex w-8 h-full items-center justify-center border-l" 
            v-if="!hiddenIcon"
        >
            <Icon class="text-xl" name="i-material-symbols-chevron-right-rounded"/>
        </div>
    </a-button>
</template>

<script setup lang="ts">
const props = defineProps<{
    hiddenIcon?: boolean|null
    redirectTo?:string
}>()
</script>

<style scoped>

</style>