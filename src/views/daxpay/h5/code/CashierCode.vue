<template>
  <div />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getBrowserUA } from '@/utils/uaUtil'
import router from '@/router'

const route = useRoute()
const { code } = route.params

const ua = getBrowserUA()
if (ua === 'wechat') {
  router.push({ path: `/wechat/cashier/code/${code}`, replace: true })
}
else if (ua === 'alipay') {
  router.push({ path: `/alipay/cashier/code/${code}`, replace: true })
}
else {
  router.replace({
    path: '/payFail',
    query: { msg: '请使用支付宝、微信等软件进行扫码支付' },
  })
}
</script>

<style scoped lang="less">

</style>
