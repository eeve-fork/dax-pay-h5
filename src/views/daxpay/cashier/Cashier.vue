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
        <span class="number">{{ orderTime.currentMinute }}</span>
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
            <img v-if="item.icon == 'wechat'" src="@/assets/images/new_wx_pay.png" alt="">
            <img v-if="item.icon == 'alipay'" src="@/assets/images/zfb_pay.png" alt="">
            <!-- <img src="@/assets/images/quick_pay.png" alt=""> -->
            <p>{{ item.name }}</p>
            <span v-if="item.recommend"> 推荐</span>
          </div>
          <div class="selectBox">
            <img v-if="item.id === selectId" src="@/assets/images/selected-arrow-icon.png" alt="">
          </div>
        </div>
      </div>
      <div v-if="selectId" class="payBtnBox" @click="payClick">
        支付￥<span>{{ orderAndConfig.order.amount }}</span>
      </div>
      <div v-else class="payBtnBox noSelect">
        支付￥<span>{{ orderAndConfig.order.amount }}</span>
      </div>
    </div>
    <!-- loading -->
    <div v-if="loading" id="loadingMask" class="loadingMask hide">
      <div class="content">
        <img class="loadingImg" src="@/assets/images/loading.png" alt="">
        <div class="loadingTxt">
          处理中，请耐心等待
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { OrderAndConfig } from '@/views/daxpay/cashier/Cashier.api'
import { getOrderAndConfig, payOrder } from '@/views/daxpay/cashier/Cashier.api'

const route = useRoute()
const router = useRouter()

// 获取传入的参数
const { code: orderNo } = route.params
// 储存初始化的数据
const orderAndConfig = ref<OrderAndConfig>()

// 选中的支付方式
const selectId = ref<string>()
function payTypeClick(item) {
  selectId.value = item.id
}

// 倒计时对象
const orderTime = reactive({
  totalTme: 0, // 总共时间
  currentMinute: '00', // 当前分钟
  currentSeconds: '00', // 当前秒数
})

// 定时器
const { pause, resume } = useIntervalFn(() => {
  getMinter() // 每秒获取分秒方法
}, 1000)

// 格式化时间
function formatTime(time: number) {
  return time.toString().padStart(2, '0')
}
// 获取倒计时秒数
function getDownTotalTime(expiredTime: any) {
  const nowTime = new Date() // 获取当前时间
  const excessTime = new Date(expiredTime) // 获取失效时间
  const interval = excessTime.getTime() - nowTime.getTime() // 获取倒计时毫秒数
  if (interval > 0) {
    orderTime.totalTme = Math.floor(interval / 1000)
  }
  else {
    console.log('失效了')
  }
}

// 获取分秒
function getMinter() {
  orderTime.totalTme--
  orderTime.currentMinute = formatTime(Math.floor(orderTime.totalTme / 60))
  orderTime.currentSeconds = formatTime(Math.floor(orderTime.totalTme % 60))
}

// 监听倒计时，到时间跳转超时页面
watch(
  () => orderTime.totalTme,
  (newValue) => {
    if (newValue == 0) {
      router.replace('/PayExcessTime')
    }
  },
)

const loading = ref(false)
// 发起支付
function payClick() {
  loading.value = true
  const form = {
    orderNo,
    itemId: selectId.value,
  }
  payOrder(form as any)
    .then(({ data }) => {
      console.log(data)
      // loading.value = false
      // location.replace(data.payBody as any)
    })
    .catch((error) => {
      console.log(error)
    })
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
  getOrderAndConfig(orderNo).then(({ data, code, msg }) => {
    if (code !== 0) {
      // 如果异常，跳转异常页面
      router.replace({
        path: '/PayExcessTime',
        query: { msg },
      })
      return
    }
    orderAndConfig.value = data // 赋值初始化数据
    getDownTotalTime(data.order.expiredTime) // 计算倒计时
    getMinter() // 先执行一下 解决进入页面一秒后才显示倒计时
    resume() // 开启倒计时
  })
    .catch((error) => {
      console.log(error)
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
    padding: 0.9375rem 1.625rem;
    position: relative;
    h2 {
      margin-bottom: 1.25rem;
    }
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
    .noSelect {
      background-color: #ccc;
    }
  }
  /* loading */
  .loadingMask {
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    border-radius: 0 0 0.2rem 0.2rem;
    .content {
      position: absolute;
      width: 15rem;
      background: #ffffff;
      border-radius: 0.2rem;
      box-shadow:
        0px 12px 48px 16px rgba(0, 0, 0, 0.03),
        0px 9px 28px 0px rgba(0, 0, 0, 0.05),
        0px 6px 16px -8px rgba(0, 0, 0, 0.08);
      display: flex;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      flex-direction: column;
      align-items: center;
    }
    .loadingImg {
      width: 1.6rem;
      height: 1.6rem;
      margin-top: 2rem;
      animation: 1.6s linear ratate infinite;
    }
    .loadingTxt {
      font-size: 1.125rem;
      color: #22242e;
      margin-top: 1.2rem;
      margin-bottom: 2rem;
    }
    @keyframes ratate {
      0% {
        transform: rotate(0deg);
      }
      40% {
        transform: rotate(144deg);
      }
      80% {
        transform: rotate(288deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
