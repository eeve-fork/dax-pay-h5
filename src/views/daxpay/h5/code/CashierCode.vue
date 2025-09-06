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
console.log(code)
if (ua === 'wechat') {
  router.push({ path: `/wechat/cashier/code/w/9/${code}`, replace: true })
}
else if (ua === 'alipay') {
  router.push({ path: `/alipay/cashier/code/${code}`, replace: true })
}
else {
  router.replace({
    name: 'payFail',
    query: { msg: '请使用支付宝、微信等软件进行扫码支付', title: '操作失败' },
    replace: true,
  })
}
</script>

<style scoped lang="less">

</style>
