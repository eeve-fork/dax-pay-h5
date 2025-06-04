<template>
  <div v-if="show" class="aggeegateAli">
    <div class="aggBox">
      <div class="topBox">
        <!-- 支付金额 -->
        <div class="payPrice">
          <span class="unit">￥</span>
          <div class="price">
            {{ orderAndConfig?.order.amount }}
          </div>
        </div>
        <!-- 支付时间 -->
        <div v-show="!isAutoLaunch" class="excessTime">
          <span class="exTitle">剩余支付时间</span>
          <span class="number">{{ orderTime.currentMinute }}</span>
          <span class="point">:</span>
          <span class="number">{{ orderTime.currentSeconds }}</span>
        </div>
        <!-- 订单详情 -->
        <div class="infoBox">
          <div class="payMessItem titleOne">
            {{ orderAndConfig?.order.title }}
          </div>
          <div class="payMessItem">
            <div class="itemTitle">
              订单编号
            </div>
            <div class="itemContent">
              {{ orderAndConfig?.order.orderNo }}
            </div>
          </div>
          <div class="payMessItem">
            <div class="itemTitle">
              商户订单号
            </div>
            <div class="itemContent">
              {{ orderAndConfig?.order.bizOrderNo }}
            </div>
          </div>
          <div class="payMessItem">
            <div class="itemTitle">
              订单结束时间
            </div>
            <div class="itemContent">
              {{ orderAndConfig?.order.expiredTime }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!isAutoLaunch" class="payBtnBox">
      立即支付
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import type {
  AggregateOrderAndConfig,
  AggregatePayParam,
} from '@/views/daxpay/h5/aggregate/Aggregate.api'
import { aggregatePay, getAggregateConfig } from '@/views/daxpay/h5/aggregate/Aggregate.api'

import { AggregateEnum, GatewayCallTypeEnum } from '@/enums/daxpay/DaxPayEnum'

const route = useRoute()
const router = useRouter()
const { orderNo } = route.params
const show = ref<boolean>(false)
const isAutoLaunch = ref<boolean>(true)
const orderAndConfig = ref<AggregateOrderAndConfig>()
const loading = ref<boolean>(false)

// 倒计时对象
const orderTime = reactive({
  totalTme: 0, // 总共时间
  currentMinute: '00', // 当前分钟
  currentSeconds: '00', // 当前秒数
  // 获取倒计时秒数
  getDownTotalTime: (expiredTime: any) => {
    const nowTime = new Date() // 获取当前时间
    const excessTime = new Date(expiredTime) // 获取失效时间
    const interval = excessTime.getTime() - nowTime.getTime() // 获取倒计时毫秒数
    if (interval > 0) {
      orderTime.totalTme = Math.floor(interval / 1000)
    }
  },
  // 获取分秒
  getMinter: () => {
    orderTime.totalTme--
    orderTime.currentMinute = orderTime.formatTime(Math.floor(orderTime.totalTme / 60))
    orderTime.currentSeconds = orderTime.formatTime(Math.floor(orderTime.totalTme % 60))
  },
  // 格式化时间
  formatTime: (time: number) => {
    return time.toString().padStart(2, '0')
  },
})

// 定时器
const { pause, resume } = useIntervalFn(() => {
  orderTime.getMinter() // 每秒获取分秒方法
}, 1000)

// 监听倒计时，到时间跳转超时页面
watch(
  () => orderTime.totalTme,
  (newValue) => {
    // eslint-disable-next-line eqeqeq
    if (newValue == 0) {
      router.replace('/PayFail')
    }
  },
)

/**
 * 初始化
 */
function init() {
  // 获取订单和配置信息
  getAggregateConfig(orderNo, 'alipay').then(async ({ data, code, msg }) => {
    if (code) {
      router.replace({ name: 'payFail', query: { msg } })
      return
    }
    show.value = true
    orderAndConfig.value = data
    // 判断是否自动拉起支付
    if (orderAndConfig.value.aggregateConfig.autoLaunch) {
      isAutoLaunch.value = true
      pay()
    }
    else {
      isAutoLaunch.value = false // 控制是否显示倒计时和时间
      orderTime.getDownTotalTime(data.order.expiredTime) // 计算倒计时
      orderTime.getMinter() // 先执行一下 解决进入页面一秒后才显示倒计时
      resume() // 开启倒计时
      pay()
    }
  })
}

/**
 * 调起支付, 需要根据调用类型发起
 */
function pay() {
  loading.value = true
  if (orderAndConfig.value?.aggregateConfig.callType === GatewayCallTypeEnum.link) {
    const from = {
      orderNo: orderNo as string,
      aggregateType: AggregateEnum.ALI,
    } as AggregatePayParam
    aggregatePay(from).then(({ data, code, msg }) => {
      if (code !== 0) {
        router.replace({ name: 'payFail', query: { msg } })
        return
      }
      loading.value = false
      location.replace(data.payBody as any)
    })
  }
}

onMounted(() => {
  init()
})
onUnmounted(() => {
  pause()
})
</script>

<style scoped lang="less">
.aggeegateAli {
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  position: relative;
  display: flex;
  justify-content: center;

  .aggBox {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;

    flex-direction: column;
    padding-top: 8.25rem;
    .topBox {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .payPrice {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 0.425rem;
        font-size: 2.625rem;
        .unit {
          font-size: 1rem;
          transform: scale(1, 0.8);
          display: flex;
          align-items: flex-end;
        }
      }

      .excessTime {
        margin: 0.8125rem 0rem 1.75rem;
        width: 100%;
        display: flex;
        justify-content: center;
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
      .infoBox {
        width: 90%;
        background-color: #ffffff;
        border-radius: 0.625rem;
        .payMessItem {
          display: flex;
          gap: 0.5125rem;
          color: #9fa1a2;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0.875rem;
          &:nth-child(1) {
            justify-content: center;
            font-size: 1rem;
            color: #303133;
            font-weight: 600;
          }
          .itemContent {
            font-size: 0.875rem;
            color: #303133;
            font-weight: 600;
          }
        }
      }
    }
  }

  .payBtnBox {
    width: 90%;
    margin: 0 auto;
    background-color: #4072e1;
    color: #fff;
    height: 3.25rem;
    border-radius: 2rem;
    position: absolute;
    bottom: 2.75rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    line-height: 3.25rem;
  }
}
</style>
