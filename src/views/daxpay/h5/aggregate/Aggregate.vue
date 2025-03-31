<template>
  <div />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import router from '@/router'
import { getBrowserUA } from '@/utils/uaUtil'

const route = useRoute()
const { orderNo } = route.params

const ua = getBrowserUA()
if (ua === 'wechat') {
  router.push({ path: `/aggregate/wechat/${orderNo}`, replace: true })
}
else if (ua === 'alipay') {
  router.push({ path: `/aggregate/alipay/${orderNo}`, replace: true })
}
else {
  router.replace({
    path: '/payFail',
    query: { msg: '请使用支付宝、微信等软件进行扫码支付' },
  })
}
</script>

<style scoped lang="less"></style>
