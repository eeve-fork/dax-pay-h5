<template>
  <div class="payFail">
    <div class="payLogo">
      <img v-if="isWeiPay === 'wei'" src="@/assets/images/weiSuccess.png" alt="">
      <img v-else src="@/assets/images/success1.png" alt="">
      <p>{{ title ? title : "操作成功" }}</p>
      <span>{{ msg ? msg : "" }}</span>
    </div>
    <div class="payBtnBox" @click="closeClick">
      关闭
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getBrowserUA } from '@/utils/uaUtil'
// 获取路由参数
const route = useRoute()
const { msg, title } = route.query
const isWeiPay = ref<string>()

// 点击关闭
function closeClick() {
  try {
    WeixinJSBridge.call('closeWindow')
  }
  catch {

  }
  try {
    AlipayJSBridge.call('closeWebview')
  }
  catch {}
  try {
    window.close()
  }
  catch {
  }
}
const ua = getBrowserUA()
if (ua === 'wechat') {
  isWeiPay.value = 'wei'
}
else {
  isWeiPay.value = 'zhi'
}
</script>

<style scoped lang="less">
.payFail {
  padding: 3.5rem 0rem;
  width: 100%;
  height: 100vh;
  background-color: light-dark(#fff, --van-gray-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  position: relative;

  .payLogo {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    align-items: center;
    transform: translateY(-50%);

    img {
      width: 3.125rem;
      height: 3.125rem;
    }

    p {
      font-size: 1.5rem;
      color: #0d6eff;
      font-weight: 700;
    }

    span {
      letter-spacing: 2px;
      font-size: 0.875rem;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
  }

  .payBtnBox {
    width: 90%;
    margin: 0 auto;
    background-color: #0d6eff;
    color: #fff;
    height: 3.25rem;
    position: absolute;
    bottom: 3.75rem;
    text-align: center;
    line-height: 3.25rem;
    border-radius: 0.625rem;
  }
}
</style>
