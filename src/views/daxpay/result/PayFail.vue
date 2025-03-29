<template>
  <div class="payFail">
    <div class="payLogo">
      <img src="@/assets/images/fail1.png" alt="">
      <p>支付失败</p>
      <span>{{ errorMsg ? errorMsg : "支付失败,请重试!" }}</span>
    </div>

    <div class="payBtnBox" @click="closeClick">
      关闭
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
// 获取路由参数
const route = useRoute()
const { msg: errorMsg } = route.query

// 点击关闭
function closeClick() {
  window.close()
}
</script>

<style scoped lang="less">
.payFail {
  padding: 3.5rem 0rem;
  width: 100%;
  height: 100vh;
  background-color: #fff;
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
      color: #e74e4e;
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
    background-color: #e74e4e;
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
