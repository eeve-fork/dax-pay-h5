<template>
  <div v-if="show" class="wchatMpPay">
    <div class="container">
      <div class="payName">
        <span>付款给</span>
        <span class="paytext">{{ cashierInfo?.name }}</span>
      </div>
      <div class="amount-display">
        <p class="title">
          金额
        </p>
        <p style="font-size: 32px">
          ¥{{ amount }}
        </p>
      </div>
    </div>
    <div class="notes">
      <div class="remark" @click="showRemark = true">
        <div v-if="!description">
          添加备注
        </div>
        <div v-else style="max-width: 75vw">
          <p style="text-align: center;">
            备注：
          </p>
          <p class="remarkDecript">
            {{ description }}
          </p>
          <div />
        </div>
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
    <van-dialog
      v-model:show="showRemark"
      title="支付备注"
      confirm-button-text="保存"
      cancel-button-text="清除"
      confirm-button-color="#4CAF50"
      cancel-button-color="red"
      show-cancel-button
      @cancel="description = ''"
    >
      <van-field
        v-model="description"
        rows="2"
        autosize
        label=""
        type="textarea"
        :maxlength="50"
        placeholder="请输入支付备注内容"
        show-word-limit
      />
    </van-dialog>
    <van-number-keyboard
      v-if="cashierInfo.amountType === 'random'"
      :show="!loading"
      theme="custom"
      extra-key="."
      close-button-text="付款"
      @close="pay"
      @input="input"
      @delete="del"
    />
    <div v-if="cashierInfo.amountType === 'fixed'" class="redirectPayBtn" @click="pay">
      <van-button type="success">
        付款
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { showNotify } from 'vant'
import type {
  CashierPayParam,
  GatewayCashierCodeConfig,
  WxJsapiSignResult,
} from '../CashierCode.api'

import { auth, cashierPay, generateAuthUrl, getCashierCodeConfig } from '../CashierCode.api'

import { AggregateEnum, CashierCodeTypeEnum, GatewayCallTypeEnum } from '@/enums/daxpay/DaxPayEnum'
import router from '@/router'
import { useKeyboard } from '@/hooks/daxpay/useKeyboard'

const route = useRoute()
const { code: cashierCode } = route.params
const { code: authCode } = route.query

const show = ref<boolean>(false)
const showRemark = ref<boolean>(false)
const loading = ref<boolean>(false)
const cashierInfo = ref<GatewayCashierCodeConfig>({})
const amount = ref<string>('0')
const description = ref<string>()
const openId = ref<string>()

const { input, del } = useKeyboard(amount)

onMounted(() => {
  init()
})

/**
 * 初始化
 */
async function init() {
  loading.value = true
  getCashierCodeConfig(cashierCode, AggregateEnum.WECHAT)
    .then((res) => {
      if (res.code) {
        router.replace({ name: 'payFail', query: { msg: res.msg } })
        return
      }
      loading.value = false
      const data = res.data
      cashierInfo.value = data as any
      // 判断类型
      if (cashierInfo.value?.amountType === 'fixed') {
        amount.value = data.amount as string
      }
      else {
        amount.value = '0'
      }
      // 判断是否需要获取OpenId
      if (data.needOpenId) {
        // 如果不是重定向跳转过来， 跳转到到重定向地址
        if (!authCode) {
          // 重定向跳转到微信授权地址
          generateAuthUrl(cashierCode, CashierCodeTypeEnum.WECHAT_PAY)
            .then((res) => {
              if (res.code) {
                router.replace({ name: 'payFail', query: { msg: res.msg } })
                return
              }
              const url = res.data
              location.replace(url)
            })
            .catch((res) => {
              router.replace({ name: 'payFail', query: { msg: res.message } })
            })
        }
        else {
          // 认证获取OpenId
          auth({
            cashierCode: cashierCode as string,
            cashierType: CashierCodeTypeEnum.WECHAT_PAY,
            authCode: authCode as string,
          })
            .then((res) => {
              if (res.code) {
                router.replace({ name: 'payFail', query: { msg: res.msg } })
                return
              }
              openId.value = res.data.openId as string
              show.value = true
            })
            .catch((res) => {
              router.replace({ name: 'payFail', query: { msg: res.message }, replace: true })
            })
        }
      }
      else {
        show.value = true
      }
    })
    .catch((error) => {
      router.replace({ name: 'payFail', query: { msg: error } })
    })
}

/**
 * 微信jsapi方式支付
 */
function pay() {
  const amountValue = Number(amount.value)
  if (amountValue === 0) {
    showNotify({ type: 'warning', message: '金额不可为0' })
    return
  }

  loading.value = true
  const from = {
    amount: amountValue,
    cashierCode,
    openId: openId.value,
    cashierType: CashierCodeTypeEnum.WECHAT_PAY,
    description: description.value,
  } as CashierPayParam
  cashierPay(from).then((res) => {
    if (res.code) {
      router.replace({ name: 'payFail', query: { msg: res.msg } })
      return
    }
    loading.value = false
    // 根据类型拉起对应的支付。 支持跳转和jsapi
    if (cashierInfo.value?.callType === GatewayCallTypeEnum.jsapi) {
      const json = JSON.parse(res.data.payBody)
      jsapiPay(json)
    }
    if (cashierInfo.value?.callType === GatewayCallTypeEnum.link) {
      location.replace(res.data.payBody as any)
    }
  })
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
        query: { title: '支付成功' },
      })
    }
  })
}
</script>

<style scoped lang="less">
@color: #4caf50;

:deep(.van-key--blue) {
  background: @color;
}
.wchatMpPay {
  position: relative;
  .container {
    background: linear-gradient(to bottom, #07c160, #07c160, #ffffff); // 从蓝色渐变到白色
    width: 100%;
    padding: 40px;
    height: 40%;
    border-radius: 10px;
    text-align: center;
    color: white;

    .payName {
      margin: 5px 0;
      font-size: 16px;

      .paytext {
        font-size: 20px;
        margin-left: 5px;
        font-weight: 600;
      }
    }

    .amount-display {
      background-color: white;
      color: @color;
      border-radius: 20px;
      padding: 20px;
      margin: 20px 0;
      display: flex;
      gap: 1.875rem;
      align-items: center;

      p {
        font-size: 32px;
      }

      .title {
        font-size: 20px;
      }
    }
  }

  .notes {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;

    .remark {
      color: @color;
      cursor: pointer;
      .remarkDecript {
        max-width: 75vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .redirectPayBtn {
    width: 100%;
    margin: 0 auto;
    position: absolute;
    bottom: 3.125rem;
    display: flex;
    justify-content: center;
    .van-button {
      width: 90%;
    }
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
</style>
