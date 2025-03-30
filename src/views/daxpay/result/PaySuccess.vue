<template>
  <div class="paySuccess">
    <div class="payLogo">
      <img v-if="isWeiPay === 'wei'" src="@/assets/images/weiSuccess.png" alt="">
      <img v-else src="@/assets/images/success1.png" alt="">
      <p :class="{ textColor: isWeiPay === 'wei' }">
        {{ title ? title : "支付成功" }}
      </p>
    </div>
    <div class="payPrice">
      <span class="unit">￥</span>
      <div class="price">
        {{ orderAndConfig?.amount }}
      </div>
    </div>
    <div class="payMessBox">
      <div class="payMessItem">
        <div class="itemTitle">
          支付标题
        </div>
        <div class="itemContent">
          {{ orderAndConfig?.title }}
        </div>
      </div>
      <div class="payMessItem">
        <div class="itemTitle">
          订单编号
        </div>
        <div class="itemContent">
          {{ orderAndConfig?.orderNo }}
        </div>
      </div>
    </div>

    <div class="payBtnBox" :class="{ payColor: isWeiPay === 'wei' }" @click="closeClick">
      完成
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { getSuccessOrder } from '@/views/daxpay/aggregate/Aggregate.api'
import type { paySuccess } from '@/views/daxpay/aggregate/Aggregate.api'
import { getBrowserUA } from '@/utils/uaUtil'
// 获取路由参数
const route = useRoute()
const { title, orderNo } = route.query
const orderAndConfig = ref<paySuccess>()
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
  catch { }
}

onMounted(() => {
  init()
})

function init() {
  getSuccessOrder(orderNo).then(({ data }) => {
    orderAndConfig.value = data
  })
}
const ua = getBrowserUA()
if (ua === 'wechat') {
  isWeiPay.value = 'wei'
}
else if (ua === 'alipay') {
  isWeiPay.value = 'zhi'
}
else {
  isWeiPay.value = 'zhi'
}
</script>

<style scoped lang="less">
.paySuccess {
  padding: 3.5rem 0rem;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  position: relative;

  .payLogo {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    align-items: center;

    img {
      width: 3.125rem;
      height: 3.125rem;
    }

    p {
      font-size: 1.5rem;
      color: #0d6eff;
      font-weight: 700;
    }
  }

  .payPrice {
    display: flex;
    gap: 0.315rem;
    align-items: center;

    .unit {
      font-size: 0.75rem;
      transform: translateY(0.525rem);
    }

    .price {
      font-size: 2rem;
      font-weight: 700;
    }
  }

  .payMessBox {
    width: 100%;
    padding: 0px 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;

    .payMessItem {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .itemTitle {
        font-size: 1rem;
        color: #797d81;
      }

      .itemContent {
        font-size: 1rem;
        font-weight: 500;
        font-size: '微软雅黑';
      }
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
  .payColor {
    background-color: #07c160;
  }
  .textColor {
    color: #07c160 !important;
  }
}
</style>
