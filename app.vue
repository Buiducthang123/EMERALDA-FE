<template>
  <div>
    <NuxtLayout>
      <transition name="fade">
        <NuxtPage />
      </transition>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>