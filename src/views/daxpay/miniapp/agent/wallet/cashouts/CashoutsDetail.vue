<template>
  <div class="cashouts-detail">
    <van-overlay v-show="loading" :show="true">
      <div class="loading-wrapper" @click.stop>
        <van-loading size="24px">
          加载中...
        </van-loading>
      </div>
    </van-overlay>

    <div class="detail-content">
      <!-- 基本信息 -->
      <div class="info-card">
        <div class="card-header">
          <div class="card-title">
            基本信息
          </div>
        </div>
        <van-cell-group inset>
          <!-- 提现单号 -->
          <van-field
            :model-value="info?.cashoutsNo || '-'"
            name="cashoutsNo"
            label="提现单号"
            readonly
          />

          <!-- 提现名称 -->
          <van-field
            :model-value="info?.name || '-'"
            name="name"
            label="提现名称"
            readonly
          />

          <!-- 状态 -->
          <van-field
            :model-value="getStatusText(info?.status)"
            name="status"
            label="状态"
            readonly
          />

          <!-- 审核备注 -->
          <van-field
            v-if="info?.auditRemark"
            :model-value="info?.auditRemark || '-'"
            autosize
            name="auditRemark"
            label="审核备注"
            type="textarea"
            readonly
          />

          <!-- 申请时间 -->
          <van-field
            :model-value="info?.applyTime || '-'"
            name="applyTime"
            label="申请时间"
            readonly
          />

          <!-- 审核时间 -->
          <van-field
            v-if="info?.auditTime"
            :model-value="info?.auditTime || '-'"
            name="auditTime"
            label="审核时间"
            readonly
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
            :model-value="info?.receiver || '-'"
            name="receiver"
            label="收款人"
            readonly
          />

          <!-- 收款方手机号 -->
          <van-field
            :model-value="info?.receiverMobile || '-'"
            name="receiverMobile"
            label="收款方手机号"
            readonly
          />

          <!-- 提现金额 -->
          <van-field
            :model-value="info?.amount ? `${info?.amount} 元` : '-'"
            name="amount"
            label="提现金额"
            readonly
          />

          <!-- 提现手续费 -->
          <van-field
            :model-value="info?.feeAmount ? `${info?.feeAmount} 元` : '-'"
            name="feeAmount"
            label="提现手续费"
            readonly
          />

          <!-- 到账金额 -->
          <van-field
            :model-value="info?.arriveAmount ? `${info?.arriveAmount} 元` : '-'"
            name="arriveAmount"
            label="到账金额"
            readonly
          />

          <!-- 提现备注 -->
          <van-field
            :model-value="info?.reason || '-'"
            autosize
            name="reason"
            label="提现备注"
            type="textarea"
            readonly
          />
        </van-cell-group>
      </div>

      <!-- 申请资料 -->
      <div class="info-card">
        <div class="card-header">
          <div class="card-title">
            申请资料
          </div>
        </div>
        <van-cell-group inset>
          <!-- 对公账户名称 -->
          <van-field
            :model-value="info?.companyName || '-'"
            name="companyName"
            label="对公账户名称"
            readonly
          />

          <!-- 对公账户号码/支付宝/微信账号 -->
          <van-field
            :model-value="info?.companyAccount || '-'"
            name="companyAccount"
            :label="info?.type === 'bank' ? '对公账户号码' : '支付宝/微信账号'"
            readonly
          />

          <!-- 开户银行 -->
          <van-field
            v-if="info?.type === 'bank'"
            :model-value="info?.bankName || '-'"
            name="bankName"
            label="开户银行"
            readonly
          />

          <!-- 开户行支行编码 -->
          <van-field
            v-if="info?.type === 'bank'"
            :model-value="info?.bankBranchNo || '-'"
            name="bankBranchNo"
            label="开户行支行编码"
            readonly
          />
          
          <van-field name="applyDataUrl" label="申请资料">
            <template #input>
              <BUpload
                v-model:pic-url="info.applyDataUrl"
                :showable="true"
              />
            </template>
          </van-field>
        </van-cell-group>
      </div>



      <!-- 打款信息 -->
      <div v-if="info?.payoutsTime || info?.payoutsRemark" class="info-card">
        <div class="card-header">
          <div class="card-title">
            打款信息
          </div>
        </div>
        <van-cell-group inset>
          <!-- 打款时间 -->
          <van-field
            :model-value="info?.payoutsTime || '-'"
            name="payoutsTime"
            label="打款时间"
            readonly
          />

          <!-- 打款备注 -->
          <van-field
            :model-value="info?.payoutsRemark || '-'"
            autosize
            name="payoutsRemark"
            label="打款备注"
            type="textarea"
            readonly
          />

          <!-- 打款凭证 -->
          <van-field name="payVoucherUrl" label="打款凭证">
            <template #input>
              <BUpload
                v-model:pic-url="info.payVoucherUrl"
                :showable="true"
              />
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { showNotify } from 'vant'
import { getCashouts } from './Cashouts.api'
import type { AgentCashouts } from './Cashouts.api'
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

// 加载状态
const loading = ref(false)

// 提现详情数据
const info = ref<AgentCashouts>({})

/**
 * 获取状态文本
 */
function getStatusText(status?: string) {
  switch (status) {
    case 'applying':
      return '审核中'
    case 'approved':
      return '审核通过'
    case 'rejected':
      return '审核拒绝'
    case 'approve_failed':
      return '审核失败'
    case 'settling':
      return '结算中'
    case 'settlement_success':
      return '结算成功'
    case 'settlement_failed':
      return '结算失败'
    case 'close':
      return '关闭提现'
    default:
      return '未知'
  }
}

/**
 * 初始化数据
 */
async function initData() {
  loading.value = true
  try {
    const id = route.query.id as string
    // 获取提现详情数据
    const { code, data, msg } = await getCashouts(id)
    if (code) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    info.value = data
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
.cashouts-detail {
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

.detail-content {
  width: 100%;
  height: 100%;
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

:deep(.van-cell-group--inset) {
  margin: 0;
}
</style>
