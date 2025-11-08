<template>
  <div class="cashouts-edit">
    <van-overlay v-show="loading" :show="true">
      <div class="loading-wrapper" @click.stop>
        <van-loading size="24px">
          加载中...
        </van-loading>
      </div>
    </van-overlay>

    <div class="form-content">
      <div class="form-box">
        <van-form ref="formRef" required="auto" colon>
          <!-- 基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                基本信息
              </div>
            </div>
            <van-cell-group inset>
              <!-- 申请名称 -->
              <van-field
                v-model="form.name"
                label-align="top"
                name="name"
                placeholder="请输入申请名称"
                label="申请名称"
                clearable
                :rules="[{ required: true, message: '请输入申请名称' }]"
              />

              <!-- 提现方式 -->
              <van-field name="type" label="提现方式" label-align="top" :rules="[{ required: true, message: '请选择提现方式' }]">
                <template #input>
                  <van-radio-group v-model="form.type" direction="horizontal">
                    <van-radio name="alipay">
                      支付宝
                    </van-radio>
                    <van-radio name="wechat">
                      微信
                    </van-radio>
                    <van-radio name="bank">
                      银行打款
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>

              <!-- 提现金额 -->
              <van-field
                v-model="form.amount"
                label-align="top"
                name="amount"
                :min="cashoutsConfig.startAmount || 0"
                :max="wallet.availableBalance || 0"
                :placeholder="`请输入要提现的金额，最小${cashoutsConfig.startAmount || 0}元，最大${wallet.availableBalance || 0}元`"
                label="提现金额"
                type="digit"
                clearable
                :rules="[
                  { required: true, message: '请输入提现金额' },
                ]"
                @blur="calcFee"
              />

              <!-- 到账金额 -->
              <van-field
                :model-value="arriveAmountText"
                label-align="left"
                name="arriveAmount"
                label="到账金额"
                readonly
                input-align="right"
              />

              <!-- 提现手续费 -->
              <van-field
                :model-value="feeAmountText"
                label-align="left"
                name="feeAmount"
                label="提现手续费"
                readonly
                input-align="right"
              />
            </van-cell-group>
          </div>

          <!-- 收款信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                收款信息
              </div>
            </div>
            <van-cell-group inset>
              <!-- 收款人 -->
              <van-field
                v-model="form.receiver"
                label-align="top"
                name="receiver"
                placeholder="请输入收款人"
                label="收款人"
                clearable
                :rules="[{ required: true, message: '请输入收款人' }]"
              />

              <!-- 收款方手机号 -->
              <van-field
                v-model="form.receiverMobile"
                label-align="top"
                name="receiverMobile"
                placeholder="请输入收款方手机号"
                label="收款方手机号"
                type="tel"
                clearable
                :rules="[
                  { required: true, message: '请输入收款方手机号' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', required: true },
                ]"
              />

              <!-- 提现备注 -->
              <van-field
                v-model="form.reason"
                autosize
                label-align="top"
                name="reason"
                placeholder="请输入提现备注"
                label="提现备注"
                type="textarea"
                clearable
                :rules="[{ required: true, message: '请输入提现备注' }]"
              />

              <!-- 申请资料 -->
              <van-field name="applyDataUrl" label="申请资料" label-align="top" :rules="[{ required: true, message: '请上传申请资料' }]">
                <template #input>
                  <BUpload
                    v-model:pic-url="form.applyDataUrl"
                  />
                </template>
              </van-field>
            </van-cell-group>
          </div>

          <!-- 账户信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                账户信息
              </div>
            </div>
            <van-cell-group inset>
              <template v-if="form.type === 'bank'">
                <!-- 对公账户名称 -->
                <van-field
                  v-model="form.companyName"
                  label-align="top"
                  name="companyName"
                  placeholder="请输入对公账户名称"
                  label="对公账户名称"
                  clearable
                  :rules="[{ required: true, message: '请输入对公账户名称' }]"
                />

                <!-- 对公账户号码 -->
                <van-field
                  v-model="form.companyAccount"
                  label-align="top"
                  name="companyAccount"
                  placeholder="请输入对公账户号码"
                  label="对公账户号码"
                  clearable
                  :rules="[{ required: true, message: '请输入对公账户号码' }]"
                />

                <!-- 开户银行 -->
                <van-field
                  v-model="form.bankName"
                  label-align="top"
                  name="bankName"
                  placeholder="请输入开户银行名称"
                  label="开户银行"
                  clearable
                  :rules="[{ required: true, message: '请输入开户银行名称' }]"
                />

                <!-- 开户行支行编码 -->
                <van-field
                  v-model="form.bankBranchNo"
                  label-align="top"
                  name="bankBranchNo"
                  placeholder="请输入开户行支行编码"
                  label="开户行支行编码"
                  clearable
                  :rules="[{ required: true, message: '请输入开户行支行编码' }]"
                />
              </template>
              <template v-else>
                <!-- 支付宝/微信账号 -->
                <van-field
                  v-model="form.companyAccount"
                  label-align="top"
                  name="companyAccount"
                  placeholder="请输入支付宝/微信账号"
                  label="支付宝/微信账号"
                  clearable
                  :rules="[{ required: true, message: '请输入支付宝/微信账号' }]"
                />
              </template>
            </van-cell-group>
          </div>
        </van-form>
      </div>

      <!-- 底部按钮 -->
      <div class="bottom-btn">
        <van-button type="primary" block :loading="loading" @click="handleSubmit">
          保存修改
        </van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { showConfirmDialog, showNotify } from 'vant'
import { useRoute } from 'vue-router'
import { calcCashoutsFee, getCashouts, getConfig, getWallet, updateCashouts } from './Cashouts.api'
import type { AgentCashouts, AgentCashoutsConfig, AgentWallet } from './Cashouts.api'
import { useTokenStore } from '@/store/modules/token'

// 获取路由参数
const route = useRoute()

// 请求头信息
const { setToken, setClientCode } = useTokenStore()

// 从URL参数中获取token
const token = route.query.token as string
if (token) {
  setToken(token)
}
setClientCode('dax-pay-agent')

// 表单引用
const formRef = ref()
// 加载状态
const loading = ref(false)

// 钱包数据
const wallet = ref<AgentWallet>({
  balance: 0,
  availableBalance: 0,
  freezeBalance: 0,
  withdrawBalance: 0,
  onWayBalance: 0,
})

// 提现配置
const cashoutsConfig = ref<AgentCashoutsConfig>({
  startAmount: 0,
  singleLimit: 0,
  dailyLimit: 0,
  feeRate: 0,
  fixedFee: 0,
})

// 表单数据
const form = ref<AgentCashouts>({
  type: 'alipay',
  arriveAmount: 0,
  feeAmount: 0,
})

// 计算属性，确保金额字段能正确显示
const arriveAmountText = computed(() => {
  return (form.value.arriveAmount !== undefined && form.value.arriveAmount !== null) ? `${form.value.arriveAmount} 元` : '0 元'
})

const feeAmountText = computed(() => {
  return (form.value.feeAmount !== undefined && form.value.feeAmount !== null) ? `${form.value.feeAmount} 元` : '0 元'
})

/**
 * 初始化数据
 */
async function initData() {
  loading.value = true
  try {
    // 获取钱包数据
    const { data: walletData } = await getWallet()
    wallet.value = walletData

    // 获取提现配置
    const { data: configData } = await getConfig()
    cashoutsConfig.value = configData

    // 获取提现详情数据
    const id = route.query.id as string
    if (id) {
      const { data: cashoutsData } = await getCashouts(id)
      form.value = cashoutsData
    }
  }
  catch (error) {
    console.error('数据加载失败:', error)
    showNotify({ type: 'danger', message: '数据加载失败' })
  }
  finally {
    loading.value = false
  }
}

/**
 * 计算费用和费率
 */
async function calcFee() {
  if (form.value.amount) {
    try {
      const { data } = await calcCashoutsFee(form.value.amount)
      form.value.feeAmount = data.feeAmount
      form.value.arriveAmount = data.arriveAmount
    }
    catch (error) {
      console.error('计算费用失败:', error)
      form.value.feeAmount = 0
      form.value.arriveAmount = 0
    }
  }
  else {
    form.value.feeAmount = 0
    form.value.arriveAmount = 0
  }
}

/**
 * 提交表单
 */
async function handleSubmit() {
  try {
    // 表单验证
    await formRef.value?.validate()
    // 确认弹窗
    await showConfirmDialog({
      title: '提示',
      message: '是否保存提现申请修改！',
    })

    loading.value = true
    // 保存提现申请
    await updateCashouts(form.value)
    showNotify({ type: 'success', message: '保存成功' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1000)
  }
  finally {
    loading.value = false
  }
}

// 页面加载时初始化数据
onMounted(() => {
  initData()
})
</script>

<style lang="less" scoped>
.cashouts-edit {
  width: 100%;
  height: 100%;
  padding-bottom: env(safe-area-inset-bottom);
}

.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
}

.form-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.form-box {
  width: 100%;
  flex: 1;
  overflow-y: scroll;
}

.info-card {
  margin: 12px 8px;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.card-header {
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 14px;
  background-color: #fff4c5;
}

.card-title {
  font-size: 14px;
  color: #5c4b37;
}

.bottom-btn {
  width: 100%;
  padding: 16px;
  background: #fff;
  border-top: 1px solid #ebedf0;
}

:deep(.van-cell-group--inset) {
  margin: 0;
}
</style>
