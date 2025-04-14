<template>
  <div v-if="show">
    <div class="container">
      <div class="amount-display">
        <p style="font-size: 20px">
          付款给{{ cashierInfo?.name }}
        </p>
        <p style="font-size: 32px;">
          ¥ {{ amount }}
        </p>
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
      :show="true"
      theme="custom"
      extra-key="."
      close-button-text="付款"
      @close="pay"
      @input="input"
      @delete="del"
    >
      <template #title-left>
        <div style="width: 100vw;display: flex; justify-content: center">
          <div class="remark" @click="showRemark = true">
            <div v-if="!description">
              添加备注
            </div>
            <div v-else style="max-width: 75vw;">
              <van-text-ellipsis :content="`备注: ${description}`" /><div />
            </div>
          </div>
        </div>
      </template>
    </van-number-keyboard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { showNotify } from 'vant'
import type {
  CashierPayParam,
  GatewayCashierConfig,
  WxJsapiSignResult,
} from '../CashierCode.api'

import {
  auth,
  cashierPay,
  generateAuthUrl,
  getCashierCodeConfig,
} from '../CashierCode.api'

import { AggregateEnum, CashierCodeTypeEnum } from '@/enums/daxpay/DaxPayEnum'
import router from '@/router'
import { useKeyboard } from '@/hooks/daxpay/useKeyboard'

const route = useRoute()
const { code: cashierCode } = route.params
const { code: authCode } = route.query

const show = ref<boolean>(false)
const showRemark = ref<boolean>(false)
const loading = ref<boolean>(false)
const cashierInfo = ref<GatewayCashierConfig>({})
const amount = ref<string>('0')
const description = ref<string>('')
const openId = ref<string>('')

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
    .then(({ data }) => {
      cashierInfo.value = data as any
      // 判断是否需要获取OpenId
      if (data.needOpenId) {
        // 如果不是重定向跳转过来， 跳转到到重定向地址
        if (!authCode) {
          // 重定向跳转到微信授权地址
          generateAuthUrl(cashierCode, CashierCodeTypeEnum.WECHAT_PAY).then((res) => {
            const url = res.data
            location.replace(url)
          }).catch((res) => {
            router.push({ name: 'payFail', query: { msg: res.message } })
          })
        }
        else {
          // 认证获取OpenId
          auth({ cashierCode: cashierCode as string, cashierType: CashierCodeTypeEnum.WECHAT_PAY, authCode: authCode as string }).then(({ data }) => {
            openId.value = data.openId as string
            show.value = true
          }).catch((res) => {
            router.push({ name: 'payFail', query: { msg: res.message }, replace: true })
          })
        }
      }
    })
    .catch((error) => {
      console.log(error)
      router.push({ name: 'payFail', query: { msg: error } })
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
  cashierPay(from)
    .then(({ data }) => {
      loading.value = false
      // 拉起jsapi支付
      const json = JSON.parse(data.payBody)
      jsapiPay(json)
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
      router.push({ name: 'SuccessResult', query: { msg: '支付成功' }, replace: true })
    }
  })
}
</script>

<style scoped lang="less">
@color: #4caf50;

:deep(.van-key--blue) {
  background: @color;
}
.container {
  background-color: @color;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  color: white;
  .amount-display {
    background-color: white;
    color: @color;
    border-radius: 20px;
    padding: 20px;
    margin: 20px 0;
  }
  .amount-display p {
    margin: 5px 0;
  }
}
.remark {
  color: @color;
}
</style>
