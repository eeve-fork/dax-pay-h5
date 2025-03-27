<template>
  <div v-if="orderAndConfig" class="cashier">
    <div class="cash_topBox">
      <div class="payPrice">
        <span class="unit">￥</span>
        <div class="price">
          {{ orderAndConfig.order.amount }} 元
        </div>
      </div>
      <div class="excessTime">
        <span class="exTitle">剩余支付时间</span>
        <span class="number">{{ orderTime.currentMiute }}</span>
        <span class="point">:</span>
        <span class="number">{{ orderTime.currentSeconds }}</span>
      </div>
      <div class="payMessItem">
        <div class="itemTitle">
          标题:
        </div>
        <div class="itemContent">
          {{ orderAndConfig.order.title }}
        </div>
      </div>
      <div class="payMessItem">
        <div class="itemTitle">
          订单编号:
        </div>
        <div class="itemContent">
          {{ orderAndConfig.order.orderNo }}
        </div>
      </div>
    </div>
    <div class="cash_bodyBox">
      <h2>请选择支付方式</h2>
      <div class="payGoupList">
        <div
          v-for="item in orderAndConfig.groupConfigs[0].items"
          :key="item.id"
          class="payMethodsItem"
          @click="payTypeClick(item)"
        >
          <div class="itemType">
            <img :src="item.icon" alt="">
            <p>{{ item.name }}</p>
            <span v-if="item.recommend"> 推荐</span>
          </div>
          <div class="selectBox">
            <img
              v-if="item.id === selectId"
              src="@/assets/images/selected-arrow-icon.png"
              alt=""
            >
          </div>
        </div>
      </div>
      <div class="payBtnBox">
        支付￥<span>{{ orderAndConfig.order.amount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入图片文件
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { OrderAndConfig } from '@/views/daxpay/cashier/Cashier.api'
import { getOrderAndConfig } from '@/views/daxpay/cashier/Cashier.api'

const route = useRoute()

const { code: orderNo } = route.params
const orderAndConfig = ref<OrderAndConfig>()

// 选中的支付方式
const selectId = ref()
function payTypeClick(item) {
  selectId.value = item.id
}

// 倒计时对象
const orderTime = reactive({
  totalTme: 300, // 总共时间
  currentMinute: '05', // 当前分钟
  currentSeconds: '00', // 当前秒数
})

const { pause, resume } = useIntervalFn(() => {
  orderTime.totalTme--
  orderTime.currentMinute = formatTime(Math.floor(orderTime.totalTme / 60))
  orderTime.currentSeconds = formatTime(Math.floor(orderTime.totalTme % 60))
}, 1000)

function formatTime(time: number){
  // 格式化时间
  return time.toString().padStart(2, '0')
}

onMounted(() => {
  init()
})
onUnmounted(() => {
  pause()
})

/**
 * 初始化
 */
function init() {
  getOrderAndConfig(orderNo).then(({ data }) => {
    orderAndConfig.value = data
    // orderTime.totalTme = data.order.expireTime
    resume()
  })
}
</script>

<style scoped lang="less">
.cashier {
  font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 1.5%;
  .cash_topBox {
    height: 30%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 1.875rem;
    .payPrice {
      margin-bottom: 1.25rem;
      display: flex;
      gap: 0.425rem;
      font-size: 2rem;
      .unit {
        transform: translateY(0.125rem) scale(1, 0.8);
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
  .cash_bodyBox {
    height: 68.5%;
    font-weight: 600;
    background-color: #ffffff;
    padding: 0.9375rem 0.625rem;
    position: relative;
    .payGoupList {
      width: 100%;
      overflow: scroll;
      height: calc(100% - 6.9375rem);
      .payMethodsItem {
        height: 3.75rem;
        line-height: 3.75rem;
        text-align: center;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .itemType {
          display: flex;
          gap: 0.625rem;
          align-items: center;
          img {
            width: 1.25rem;
            height: 1.25rem;
          }
          span {
            border: 1px solid #3882c2;
            color: #3882c2;
            height: 1.8rem;
            line-height: 1.8rem;
            padding: 0px 5px;
            border-radius: 0.3125rem;
          }
        }
        .selectBox {
          width: 1.25rem;
          height: 1.25rem;
          line-height: 1.25rem;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #ccc;
          img {
            width: 100%;
            height: 100%;
          }
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
      bottom: 2.75rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      line-height: 3.25rem;
      border-radius: 0.625rem;
    }
  }
}
</style>
