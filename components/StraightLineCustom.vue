<template>
    <div class="bg-[#A76B29]" :style="{height:props.height||'1px', width:props.width||'100px'}">

    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    height?: string,
    width?: string
}>()
</script>

<style scoped>

</style>