<template>
  <div class="bg h-screen flex flex-col items-center justify-center p-60px">
    <div class="wel-box w-full flex flex-col items-center justify-between">
      <img :src="logo">
      <div class="text-darkBlue dark:text-garyWhite mb-4 mt-12 text-center text-2xl font-black">
        欢迎使用{{ title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="DashboardPage">
import { getSystemLogo, getSystemTitle } from '@/settings/initWebsiteConfig'

const title = computed(() => getSystemTitle())
const logo = computed(() => getSystemLogo())
</script>

<style scoped lang="less">
.bg {
  background-color: #ebb54b80;
}
</style>
