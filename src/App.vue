<template>
  <MyPage />
  <transition name="list">
    <MyAttention v-if="weatherStore.showNotice" />
  </transition>
</template>

<script setup>
import MyPage from './components/MyPage.vue'
import MyAttention from './components/MyAttention.vue'

import { useWeatherStore } from '@/stores'
const weatherStore = useWeatherStore()
</script>

<style lang="scss" scoped>
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.list-enter-to,
.list-leave-from {
  opacity: 1;
}
.list-enter-active,
.list-leave-active {
  transition: 1s;
}
</style>
