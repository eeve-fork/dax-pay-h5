<template>
  <div>
    <div class="container">
      <div class="payName">
        <span>付款给</span>
        <span class="paytext">杨家臭豆腐{{ mchName }}</span>
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
          <van-text-ellipsis :content="`备注: ${description}`" />
          <div />
        </div>
      </div>
    </div>
    <van-dialog
      v-model:show="showRemark"
      title="支付备注"
      confirm-button-text="保存"
      cancel-button-text="清除"
      confirm-button-color="#108ee9"
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
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { showNotify } from 'vant'
import type { CashierPayParam, ChannelCashierConfigResult } from '../CashierCode.api'
import { cashierPay, getCashierInfo, getMchName } from '../CashierCode.api'
import { AggregateEnum, CashierTypeEnum } from '@/enums/daxpay/DaxPayEnum'
import router from '@/router'
import { useKeyboard } from '@/hooks/daxpay/useKeyboard'

const route = useRoute()
const { mchNo, appId } = route.params

const showRemark = ref<boolean>(false)
const loading = ref<boolean>(false)
const cashierInfo = ref<ChannelCashierConfigResult>({})
const amount = ref<string>('0')
const description = ref<string>('')
const mchName = ref<string>('')

const { input, del } = useKeyboard(amount)

onMounted(() => {
  // initData()
})

/**
 * 初始化数据
 */
function initData() {
  getCashierInfo(AggregateEnum.ALI, appId as string)
    .then(({ data }) => {
      cashierInfo.value = data
    })
    .catch((res) => {
      router.push({ name: 'ErrorResult', query: { msg: res.message } })
    })
  getMchName(mchNo as string)
    .then(({ data }) => {
      mchName.value = data
    })
    .catch((res) => {
      router.push({ name: 'ErrorResult', query: { msg: res.message } })
    })
}

/**
 * 支付
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
    appId,
    cashierType: CashierTypeEnum.ALIPAY,
    description: description.value,
    mchNo,
  } as CashierPayParam
  cashierPay(from).then(({ data }) => {
    loading.value = false
    // 跳转到H5/付款码支付页面
    location.replace(data.payBody)
  })
}
</script>

<style scoped lang="less">
@color: #108ee9;

:deep(.van-key--blue) {
  background: @color;
}

.container {
  background: linear-gradient(to bottom, #1e90ff, #1e90ff, #ffffff); // 从蓝色渐变到白色
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
  }
}
</style>
