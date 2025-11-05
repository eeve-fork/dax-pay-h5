<template>
  <div class="mch-settle-info">
    <van-overlay v-show="loading" :show="true">
      <div class="loading-wrapper" @click.stop>
        <van-loading size="24px">
          加载中...
        </van-loading>
      </div>
    </van-overlay>

    <div class="form-content">
      <van-form ref="formRef" required="auto" colon>
        <!-- 银行卡信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              银行卡信息
            </div>
          </div>
          <van-cell-group inset>
            <van-field name="accountType" label="账户类型" label-align="top" :disabled="!isEditing">
              <template #input>
                <van-radio-group v-model="form.bankCard.accountType" direction="horizontal" :disabled="!isEditing">
                  <van-radio name="company_owner" :disabled="baseProfile.merchantType === 'micro' || !isEditing">
                    公户
                  </van-radio>
                  <van-radio name="person_owner">
                    对私法人
                  </van-radio>
                  <van-radio name="person_not_owner" :disabled="baseProfile.merchantType === 'micro' || !isEditing">
                    对私非法人
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>

            <van-field name="cardFrontPic" label="银行卡正面照片" label-align="top" :disabled="!isEditing">
              <template #input>
                <div>
                  <BUpload v-model:pic-url="form.bankCard.cardFrontPic" :showable="!isEditing" />
                  <div v-if="form.bankCard.cardFrontPic && isEditing" class="readOcr">
                    <van-button class="readOcrBtn" @click="bankOcr">
                      OCR识别
                    </van-button>
                  </div>
                </div>
              </template>
            </van-field>

            <van-field name="cardBackPic" label="银行卡反面照片" label-align="top" :disabled="!isEditing">
              <template #input>
                <BUpload v-model:pic-url="form.bankCard.cardBackPic" :showable="!isEditing" />
              </template>
            </van-field>

            <van-field v-model="form.bankCard.accountName" label-align="top" name="accountName" placeholder="请输入账户名称" label="账户名称" clearable :disabled="!isEditing" />
            <van-field v-model="form.bankCard.cardNo" label-align="top" name="cardNo" placeholder="请输入银行卡号" label="银行卡号" clearable :disabled="!isEditing" />
            <van-field v-model="form.bankCard.bankName" label-align="top" name="bankName" placeholder="请输入开户银行" label="开户银行" clearable :disabled="!isEditing" />
            <van-field v-model="form.bankCard.branchNo" label-align="top" name="branchNo" placeholder="请输入联行号" label="开户行联行号" clearable :disabled="!isEditing" />
            <van-field v-model="form.bankCard.bankPhone" label-align="top" name="bankPhone" placeholder="请输入银行预留手机号" label="银行预留手机号" clearable :disabled="!isEditing" />
          </van-cell-group>
        </div>

        <!-- 持卡人信息（个人非法人显示） -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              持卡人信息
            </div>
          </div>
          <van-cell-group inset>
            <van-field name="frontPic" label="身份证正面" label-align="top" :disabled="!isEditing">
              <template #input>
                <div>
                  <BUpload v-model:pic-url="form.cardHolder.frontPic" :showable="!isEditing" />
                  <div v-if="form.cardHolder.frontPic && isEditing" class="readOcr">
                    <van-button class="readOcrBtn" @click="ocrIdCardFront">
                      OCR识别
                    </van-button>
                  </div>
                </div>
              </template>
            </van-field>

            <van-field name="backPic" label="身份证反面" label-align="top" :disabled="!isEditing">
              <template #input>
                <div>
                  <BUpload v-model:pic-url="form.cardHolder.backPic" :showable="!isEditing" />
                  <div v-if="form.cardHolder.backPic && isEditing" class="readOcr">
                    <van-button class="readOcrBtn" @click="ocrIdCardBack">
                      OCR识别
                    </van-button>
                  </div>
                </div>
              </template>
            </van-field>

            <van-field v-model="form.cardHolder.holderName" label-align="top" name="holderName" placeholder="请输入持卡人姓名" label="持卡人姓名" clearable :disabled="!isEditing" />
            <van-field v-model="form.cardHolder.certNo" label-align="top" name="certNo" placeholder="请输入持卡人证件号" label="持卡人证件号" clearable :disabled="!isEditing" />

            <van-field name="letterOfAuthPic" label="非法人结算授权函" label-align="top" :disabled="!isEditing">
              <template #input>
                <BUpload v-model:pic-url="form.cardHolder.letterOfAuthPic" :showable="!isEditing" />
              </template>
            </van-field>
          </van-cell-group>
        </div>
      </van-form>
    </div>

    <div class="bottom-btn">
      <template v-if="isEditing">
        <div class="btn-group">
          <van-button @click="handleCancel">
            取消
          </van-button>
          <van-button type="primary" :loading="loading" @click="handleSubmit">
            保存
          </van-button>
        </div>
      </template>
      <template v-else>
        <van-button type="primary" block @click="handleEdit">
          编辑
        </van-button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { showNotify } from 'vant'
import { getMainBody, getSettleInfo, updateSettleInfo } from './MerchantProfile.api'
import type { MchBaseProfile, MchSettle } from './MerchantProfile.api'
import { bankCardOcr, idCardOcr } from '@/api/System.api'
import { useTokenStore } from '@/store/modules/token'

const route = useRoute()
const { token, mchNo } = route.query

// 请求头信息
const { setToken, setClientCode } = useTokenStore()
setToken(token as string)
setClientCode('dax-pay-agent')

// 商户号
const mchNoValue = ref(mchNo as string)

// 表单引用
const formRef = ref()
// 加载状态
const loading = ref(false)
// 编辑状态
const isEditing = ref(false)
// 原始表单数据，用于取消时恢复
const originalFormData = ref<MchSettle>({} as any)

// 基础信息(商户类型等)
const baseProfile = ref<MchBaseProfile>({} as any)

// 表单数据
const form = ref<MchSettle>({
  bankCard: {},
  cardHolder: {},
})

/**
 * 初始化数据
 */
async function initData() {
  loading.value = true
  try {
    const [settleInfoRes, mainBodyRes] = await Promise.all([
      getSettleInfo(mchNoValue.value),
      getMainBody(mchNoValue.value),
    ])
    if (settleInfoRes.data) {
      form.value = settleInfoRes.data
      originalFormData.value = JSON.parse(JSON.stringify(settleInfoRes.data))
    }
    // 设置基础信息
    baseProfile.value = (mainBodyRes.data && mainBodyRes.data.base) || ({} as any)
    isEditing.value = false
  }
  catch (error) {
    console.error('数据加载失败', error)
    showNotify({ type: 'danger', message: '数据加载失败' })
  }
  finally {
    loading.value = false
  }
}

/**
 * 进入编辑模式
 */
function handleEdit() {
  isEditing.value = true
  // 备份当前数据
  originalFormData.value = JSON.parse(JSON.stringify(form.value))
}

/**
 * 取消编辑
 */
function handleCancel() {
  // 恢复原始数据
  form.value = JSON.parse(JSON.stringify(originalFormData.value))
  // 退出编辑模式
  isEditing.value = false
}

/**
 * 提交表单
 */
async function handleSubmit() {
  await formRef.value.validate()
  loading.value = true
  try {
    const params: MchSettle = {
      ...form.value,
      bankCard: form.value.bankCard || {},
      cardHolder: form.value.cardHolder || {},
      mchNo: mchNoValue.value,
    }
    const { code, msg } = await updateSettleInfo(params)
    if (code) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    showNotify({ type: 'success', message: '保存成功' })
    isEditing.value = false
    originalFormData.value = JSON.parse(JSON.stringify(form.value))
  }
  finally {
    loading.value = false
  }
}

function bankOcr() {
  bankCardOcr(form.value.bankCard.cardFrontPic).then(({ data, code, msg }) => {
    if (code) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    form.value.bankCard.cardNo = data.cardNumber || form.value.bankCard.cardNo
    form.value.bankCard.bankName = data.bankName || form.value.bankCard.bankName
    showNotify({ type: 'success', message: 'OCR识别成功' })
  })
}

function ocrIdCardFront() {
  idCardOcr(form.value.cardHolder.frontPic, 'ID_CARD_FRONT').then(({ data, code, msg }) => {
    if (code) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    form.value.cardHolder.holderName = data.name || form.value.cardHolder.holderName
    form.value.cardHolder.certNo = data.idNumber || form.value.cardHolder.certNo
    showNotify({ type: 'success', message: 'OCR识别成功' })
  })
}

function ocrIdCardBack() {
  idCardOcr(form.value.cardHolder.backPic, 'ID_CARD_BACK').then(({ data, code, msg }) => {
    if (code) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    form.value.cardHolder.periodLong = data.periodLong ?? form.value.cardHolder.periodLong
    form.value.cardHolder.startDate = data.startDate || form.value.cardHolder.startDate
    form.value.cardHolder.endDate = data.endDate || form.value.cardHolder.endDate
    showNotify({ type: 'success', message: 'OCR识别成功' })
  })
}

// 页面加载时初始化数据
onMounted(() => {
  initData()
})
</script>

<style lang="less" scoped>
.mch-settle-info {
  /* 视口高度，flex布局使底部按钮常驻且不遮挡内容 */
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
}

.form-content {
  /* 主体内容滚动 */
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 12px;
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
  height: 40px;
  padding: 0 14px;
  background-color: #ecf5ff;
}

.card-title {
  font-size: 16px;
  color: #409eff;
}

/* 让内嵌面板去掉默认边距，卡片白底由容器负责 */
:deep(.van-cell-group--inset) {
  margin: 0;
}

/* 单选横排的间距与对齐 */
:deep(.van-radio-group--horizontal) {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.readOcr {
  display: flex;
  gap: 8px;
  align-items: center;
}

.readOcrBtn {
  margin-top: 8px;
}

.bottom-btn {
  /* 常驻底部，不固定定位，避免遮挡滚动内容 */
  flex-shrink: 0;
  padding: 12px 16px calc(env(safe-area-inset-bottom) + 12px);
  background: #fff;
  border-top: 1px solid #ebedf0;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.04);

  .btn-group {
    display: flex;
    gap: 12px;

    .van-button {
      flex: 1;
    }
  }
}
</style>
