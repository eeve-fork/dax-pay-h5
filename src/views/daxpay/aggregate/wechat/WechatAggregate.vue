<template>
  <div v-if="orderAndConfig" class="aggeegateWeixin">
    <div class="aggBox">
      <img src="@/assets/images/bill_logo.png" alt="">
      <div class="payPrice">
        <span class="unit">￥</span>
        <div class="price">
          1288
        </div>
      </div>
      <div class="excessTime">
        <span class="exTitle">剩余支付时间</span>
        <span class="number">05</span>
        <span class="point">:</span>
        <span class="number">05</span>
      </div>
      <div class="payMessItem">
        <div class="itemTitle">
          标题:
        </div>
        <div class="itemContent">
          qweqweq
        </div>
      </div>
      <div class="payMessItem">
        <div class="itemTitle">
          订单编号:
        </div>
        <div class="itemContent">
          qweqweqweq
        </div>
      </div>
    </div>
    <div class="payBtnBox">
      支付1288
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import type { AggregateOrderAndConfig } from '@/views/daxpay/aggregate/Aggregate.api'
import { getAggregateConfig } from '@/views/daxpay/aggregate/Aggregate.api'

const route = useRoute()
const { orderNo } = route.params

const orderAndConfig = ref<AggregateOrderAndConfig>()

onMounted(() => {
  getAggregateConfig(orderNo, 'wechat_pay').then(({ data, code, msg }) => {
    // 判断是否需要获取OpenId
    if (data.aggregateConfig.needOpenId){

    }
    orderAndConfig.value = data
  })
})
</script>

  <style scoped lang="less">
  .aggeegateWeixin {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;

  .aggBox {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-50%);

    img {
      width: 4.125rem;
      height: 4.125rem;
    }

    .payPrice {
      margin: 1.25rem 0;
      display: flex;
      gap: 0.425rem;
      font-size: 2rem;

      .unit {
        font-size: 22px;
        transform: scale(1, 0.8);
        display: flex;
        align-items: flex-end;
      }
    }

    .excessTime {
      display: flex;
      align-items: center;
      gap: 0.3125rem;

      .exTitle {
        color: #9fa1a2;
        margin-right: 0.3125rem;
      }

      .point {
        font-weight: 700;
      }

      .number {
        display: block;
        background-color: #ffece8;
        color: #f66662;
        padding: 0.1875rem;
      }
    }

    .payMessItem {
      display: flex;
      gap: 0.5125rem;
      color: #9fa1a2;
    }
  }
  .payBtnBox {
    width: 90%;
    margin: 0 auto;
    background-color: #89d961;
    color: #fff;
    height: 3.25rem;
    position: absolute;
    bottom: 2.75rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    line-height: 3.25rem;
    border-radius: 0.625rem;
  }
}
</style>
