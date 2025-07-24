<template>
  <div v-if="show" class="aggeegateWeixin">
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
          <div v-if="orderAndConfig?.order.description" class="payMessItem">
            <div class="itemTitle">
              订单描述
            </div>
            <div class="itemContent">
              {{ orderAndConfig?.order.description }}
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
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import type {
  AggregateOrderAndConfig,
  AggregatePayParam,
  GatewayAuthCodeParam,
  WxJsapiSignResult,
} from '@/views/daxpay/h5/aggregate/Aggregate.api'
import {
  aggregatePay,
  auth,
  generateAuthUrl,
  getAggregateConfig,
} from '@/views/daxpay/h5/aggregate/Aggregate.api'

import { AggregateEnum, GatewayCallTypeEnum } from '@/enums/daxpay/DaxPayEnum'
import router from '@/router'

const route = useRoute()
const { orderNo } = route.params
const { code: authCode } = route.query
const show = ref<boolean>(false)
const isAutoLaunch = ref<boolean>(true)
const orderAndConfig = ref<AggregateOrderAndConfig>()
const openId = ref<string>('')
const loading = ref<boolean>(false)

// 认证参数
const authParam = ref<GatewayAuthCodeParam>({
  orderNo: orderNo as string,
  aggregateType: AggregateEnum.WECHAT,
})

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
    else {
      console.log('失效了')
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
  loading.value = true
  // 获取订单和配置信息
  getAggregateConfig(orderNo, 'wechat_pay').then(async ({ data, msg, code }) => {
    loading.value = false
    if (code !== 0) {
      // 如果异常，跳转异常页面
      router.replace({
        name: 'payFail',
        query: { msg },
      })
      return
    }
    // 判断是否需要获取OpenId
    if (data.aggregateConfig.needOpenId) {
      // 判断是否已经获取到了authCode, 如果没有则重定向进行获取authCode
      if (!authCode) {
        generateAuthUrl({
          orderNo: orderNo as string,
          aggregateType: AggregateEnum.WECHAT,
        })
          .then((res) => {
            if (res.code !== 0) {
              // 如果异常，跳转异常页面
              router.replace({
                name: 'payFail',
                query: { msg },
              })
              return
            }
            location.replace(res.data)
          })
          .catch((res) => {
            router.replace({
              name: 'payFail',
              query: { msg: res.message },
            })
          })
        return
      }
      else {
        authParam.value.authCode = authCode as string
        // 获取openId
        await wxAuth()
      }
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
 * 微信认证
 */
async function wxAuth() {
  // 认证获取OpenId
  await auth(authParam.value)
    .then(({ data, code, msg }) => {
      if (code) {
        router.replace({ name: 'payFail', query: { msg }, replace: true })
        return
      }
      openId.value = data.openId as string
    })
    .catch((res) => {
      router.replace({ name: 'payFail', query: { msg: res.message }, replace: true })
    })
}

/**
 * 调起支付, 需要根据调用类型发起
 */
function pay() {
  loading.value = true
  if (orderAndConfig.value?.aggregateConfig.callType === GatewayCallTypeEnum.jsapi) {
    const from = {
      orderNo: orderNo as string,
      aggregateType: AggregateEnum.WECHAT,
      openId: openId.value,
    } as AggregatePayParam
    aggregatePay(from).then(({ data, code, msg }) => {
      loading.value = false
      if (code) {
        router.replace({ name: 'payFail', query: { msg }, replace: true })
        return
      }
      // 根据类型拉起对应的支付。 支持跳转和jsapi
      if (orderAndConfig.value?.aggregateConfig.callType === GatewayCallTypeEnum.jsapi) {
        const json = JSON.parse(data.payBody)
        jsapiPay(json)
      }
      if (orderAndConfig.value?.aggregateConfig.callType === GatewayCallTypeEnum.link) {
        location.replace(data.payBody as any)
      }
    })
  }
}

/**
 * 拉起Jsapi支付窗口
 */
function jsapiPay(data: WxJsapiSignResult) {
  const form = {
    appId: data.appId, // 公众号ID，由商户传入
    timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
    nonceStr: data.nonceStr, // 随机串
    package: data.package, // 预支付ID
    signType: data.signType, // 微信签名方式：
    paySign: data.paySign, // 微信签名
  }
  // 使用微信JsSdk拉起支付
  WeixinJSBridge.invoke('getBrandWCPayRequest', form, (res) => {
    if (res.err_msg === 'get_brand_wcpay_request:ok') {
      // 跳转到成功页面
      router.replace({
        path: '/paySuccess',
        query: { title: '支付成功', orderNo },
      })
    }
    else {
      // 跳转到失败页面
      router.replace({
        name: 'payFail',
        query: { msg: '支付已取消' },
      })
    }
  })
}
</script>

<style scoped lang="less">
.aggeegateWeixin {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;

  .aggBox {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;

    flex-direction: column;
    padding-top: 4.25rem;
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
        font-size: 3.25rem;
        .unit {
          font-size: 2rem;
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
    background-color: #89d961;
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
      border-radius: 0.2rem;
      // box-shadow:
      //   0px 12px 48px 16px rgba(0, 0, 0, 0.03),
      //   0px 9px 28px 0px rgba(0, 0, 0, 0.05),
      //   0px 6px 16px -8px rgba(0, 0, 0, 0.08);
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
