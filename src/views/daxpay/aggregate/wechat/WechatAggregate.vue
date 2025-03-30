<template>
  <div v-if="show" class="aggeegateWeixin">
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
import type {
  AggregateOrderAndConfig,
  AggregatePayParam,
  GatewayAuthCodeParam,
  WxJsapiSignResult,
} from '@/views/daxpay/aggregate/Aggregate.api'
import { aggregatePay, auth, generateAuthUrl, getAggregateConfig } from '@/views/daxpay/aggregate/Aggregate.api'

import { AggregateEnum, GatewayCallTypeEnum } from "@/enums/daxpay/DaxPayEnum";
import router from '@/router'

const route = useRoute()
const { orderNo } = route.params
const { code: authCode } = route.query
const show = ref<boolean>(false)

const orderAndConfig = ref<AggregateOrderAndConfig>()
const openId = ref<string>('')
const loading = ref<boolean>(false)

// 认证参数
const authParam = ref<GatewayAuthCodeParam>({
  orderNo: orderNo as string,
  aggregateType: AggregateEnum.WECHAT,
})

onMounted(() => {
  init()
})

/**
 * 初始化
 */
function init() {
  // 获取订单和配置信息
  getAggregateConfig(orderNo, 'wechat_pay').then(async ({ data, code, msg }) => {
    // 判断是否需要获取OpenId
    if (data.aggregateConfig.needOpenId) {
      // 判断是否已经获取到了authCode, 如果没有则重定向进行获取authCode
      if (!authCode) {
        generateAuthUrl({
          orderNo: orderNo as string,
          aggregateType: AggregateEnum.WECHAT,
        }).then((res) => {
          location.replace(res.data)
        }).catch((res) => {
          router.push({ name: 'ErrorResult', query: { msg: res.message }, replace: true })
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
      pay()
    }
  })
}

/**
 * 微信认证
 */
async function wxAuth() {
  // 认证获取OpenId
  await auth(authParam.value).then(({ data }) => {
    openId.value = data.openId as string
  }).catch((res) => {
    router.push({ name: 'ErrorResult', query: { msg: res.message }, replace: true })
  })
}

/**
 * 调起支付, 需要根据调用类型发起
 */
function pay() {
  loading.value = true
  if (orderAndConfig.value?.aggregateConfig.callType === GatewayCallTypeEnum.jsapi){
    const from = {
      orderNo: orderNo as string,
      aggregateType: AggregateEnum.WECHAT,
      openId: openId.value,
    } as AggregatePayParam
    aggregatePay(from)
      .then(({ data }) => {
        loading.value = false
        // 拉起jsapi支付
        const json = JSON.parse(data.payBody)
        jsapiPay(json)
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
      router.push({ name: 'SuccessResult', query: { msg: '支付成功' }, replace: true })
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
