<template>
  <div class="mch-main-body">
    <!-- 加载遮罩 -->
    <van-overlay v-show="loading" :show="true">
      <div class="loading-wrapper" @click.stop>
        <van-loading size="24px">
          加载中...
        </van-loading>
      </div>
    </van-overlay>

    <!-- 表单内容区域 -->
    <div class="form-content">
      <!-- 认证状态卡片 -->
      <div class="status-card">
        <div class="card-header">
          <div class="card-title">
            <span>认证状态</span>
          </div>
        </div>
        <van-cell-group inset>
          <van-cell>
            <template #title>
              <div class="status-info">
                <span class="status-label">当前状态</span>
                <van-tag :type="getAuthStatusType(mchStatus.profileAuth)" class="status-tag">
                  {{ getAuthStatusText(mchStatus.profileAuth) }}
                </van-tag>
              </div>
            </template>
            <template #value>
              <van-button
                v-if="canSubmitAuth"
                type="primary"
                size="small"
                :loading="loading"
                class="auth-btn"
                @click="handleSubmitAuth"
              >
                {{ mchStatus.profileAuth === 'failed' ? '重新提交认证' : '提交认证' }}
              </van-button>
            </template>
          </van-cell>
          <!-- 认证失败原因 -->
          <van-cell
            v-if="mchStatus.profileAuth === 'failed' && mchStatus.profileAuthErrorMsg"
            title="认证失败原因"
            :value="mchStatus.profileAuthErrorMsg"
            value-class="error-text"
          />
        </van-cell-group>
      </div>

      <van-form ref="formRef" required="auto" colon>
        <!-- 基础信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <span>基础信息</span>
            </div>
          </div>
          <van-cell-group inset>
            <!-- 商户类型 -->
            <van-field name="merchantType" label="商户类型" label-align="top" :disabled="!isEditing || mchStatus.profileAuth === 'success'" :rules="[{ required: true, message: '请选择商户类型' }]">
              <template #input>
                <van-radio-group
                  v-model="form.base.merchantType"
                  direction="horizontal"
                  :disabled="!isEditing || mchStatus.profileAuth === 'success'"
                >
                  <van-radio name="micro">
                    小微商户
                  </van-radio>
                  <van-radio name="individual">
                    个体工商户
                  </van-radio>
                  <van-radio name="enterprise">
                    企业
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 商户全称 -->
            <van-field
              v-model="form.base.merchantName"
              label-align="top"
              name="merchantName"
              placeholder="请输入商户全称"
              label="商户全称"
              clearable
              :disabled="!isEditing"
              :rules="[{ required: true, message: '请输入商户全称' }]"
            />
            <!-- 商户简称 -->
            <van-field
              v-model="form.base.merchantShortName"
              label-align="top"
              name="merchantShortName"
              placeholder="请输入商户简称"
              label="商户简称"
              clearable
              :disabled="!isEditing"
              :rules="[{ required: true, message: '请输入商户简称' }]"
            />
          </van-cell-group>
        </div>

        <!-- 法人信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <span>法人信息</span>
            </div>
          </div>
          <van-cell-group inset>
            <!-- 身份证正面 -->
            <van-field
              name="frontPic"
              label="身份证正面"
              label-align="top"
              :disabled="!isEditing"
            >
              <template #input>
                <div class="readOcr">
                  <BUpload
                    v-model:pic-url="form.legal.frontPic"
                    :showable="!isEditing"
                  />
                  <van-button
                    v-if="isEditing && form.legal.frontPic && mchStatus.profileAuth !== 'success'"
                    class="readOcrBtn"
                    hairline
                    plain
                    size="small"
                    @click="ocrIdCardFront"
                  >
                    OCR识别
                  </van-button>
                </div>
              </template>
            </van-field>
            <!-- 身份证反面 -->
            <van-field
              name="backPic"
              label="身份证反面"
              label-align="top"
              :disabled="!isEditing"
            >
              <template #input>
                <div class="readOcr">
                  <BUpload
                    v-model:pic-url="form.legal.backPic"
                    :showable="!isEditing"
                  />
                  <van-button
                    v-if="isEditing && form.legal.backPic && mchStatus.profileAuth !== 'success'"
                    class="readOcrBtn"
                    hairline
                    plain
                    size="small"
                    @click="ocrIdCardBack"
                  >
                    OCR识别
                  </van-button>
                </div>
              </template>
            </van-field>
            <!-- 身份证姓名 -->
            <van-field
              v-model="form.legal.legalName"
              label-align="top"
              name="legalName"
              placeholder="请输入身份证姓名"
              label="身份证姓名"
              clearable
              :disabled="!isEditing || mchStatus.profileAuth === 'success'"
              :rules="[{ required: true, message: '请输入身份证姓名' }]"
            />
            <!-- 身份证号 -->
            <van-field
              v-model="form.legal.certNo"
              label-align="top"
              name="certNo"
              placeholder="请输入身份证号"
              label="身份证号"
              clearable
              :disabled="!isEditing || mchStatus.profileAuth === 'success'"
              :rules="[{ required: true, message: '请输入身份证号' }]"
            />
            <!-- 身份证有效期 -->
            <van-field label="长期有效" label-align="top" :disabled="!isEditing">
              <template #input>
                <van-switch v-model="form.legal.periodLong" :disabled="!isEditing" />
              </template>
            </van-field>
            <!-- 证件有效期开始日期 -->
            <BDatePicker
              v-model="form.legal.startDate"
              name="startDate"
              label="开始日期"
              placeholder="请选择证件有效期开始日期"
              :disabled="!isEditing"
              :rules="[{ required: true, message: '请选择证件开始时间' }]"
            />
            <!-- 证件有效期结束日期 -->
            <BDatePicker
              v-if="!form.legal.periodLong"
              v-model="form.legal.endDate"
              name="endDate"
              label="结束日期"
              placeholder="请选择证件结束时间"
              :disabled="!isEditing"
              :rules="[{ required: true, message: '请选择证件结束时间' }]"
            />
            <!-- 联系人手机号 -->
            <van-field
              v-model="form.legal.contactPhone"
              label-align="top"
              name="contactPhone"
              placeholder="请输入联系人手机号"
              label="联系人手机号"
              clearable
              :disabled="!isEditing"
            />
            <!-- 身份证地址 -->
            <van-field
              v-model="form.legal.address"
              label-align="top"
              name="address"
              placeholder="请输入身份证地址"
              label="身份证地址"
              type="textarea"
              autosize
              clearable
              :disabled="!isEditing"
            />
          </van-cell-group>
        </div>

        <!-- 营业执照信息卡片 -->
        <div v-if="showLicenseInfo" class="info-card">
          <div class="card-header">
            <div class="card-title">
              <span>营业执照信息</span>
            </div>
          </div>
          <van-cell-group inset>
            <!-- 营业执照照片 -->
            <van-field name="licensePic" label="营业执照照片" label-align="top" :disabled="!isEditing" :rules="[{ required: true, message: '请上传营业执照照片' }]">
              <template #input>
                <div class="readOcr">
                  <BUpload
                    v-model:pic-url="form.license.licensePic"
                    :showable="!isEditing"
                  />
                  <van-button
                    v-if="isEditing && form.license.licensePic"
                    class="readOcrBtn"
                    hairline
                    plain
                    size="small"
                    @click="licenseInfoOcr"
                  >
                    OCR识别
                  </van-button>
                </div>
              </template>
            </van-field>

            <!-- 营业执照号 -->
            <van-field
              v-model="form.license.licenseNo"
              label-align="top"
              name="licenseNo"
              placeholder="请输入营业执照号"
              label="营业执照号"
              clearable
              :disabled="!isEditing || mchStatus.profileAuth === 'success'"
              :rules="[{ required: true, message: '请输入营业执照号' }]"
            />
            <!-- 营业执照名称 -->
            <van-field
              v-model="form.license.licenseName"
              label-align="top"
              name="licenseName"
              placeholder="请输入营业执照名称"
              label="营业执照名称"
              clearable
              :disabled="!isEditing || mchStatus.profileAuth === 'success'"
              :rules="[{ required: true, message: '请输入营业执照名称' }]"
            />
            <!-- 执照地址-省市区 -->
            <BCascader
              v-model="form.license.regionCode"
              name="regionCode"
              label="执照地址-省市区"
              placeholder="请选择省市区"
              :disabled="!isEditing"
              :rules="[{ required: true, message: '请选择省市区' }]"
              :options="pca"
            />
            <!-- 营业执照详细地址 -->
            <van-field
              v-model="form.license.address"
              autosize
              label-align="top"
              name="address"
              placeholder="请输入营业执照详细地址"
              label="营业执照详细地址"
              type="textarea"
              clearable
              :disabled="!isEditing"
              :rules="[{ required: true, message: '请输入营业执照详细地址' }]"
            />
            <!-- 注册有效期 -->
            <van-field label="长期有效" label-align="top" :disabled="!isEditing">
              <template #input>
                <van-switch v-model="form.license.periodLong" :disabled="!isEditing" />
              </template>
            </van-field>
            <!-- 开始日期 -->
            <BDatePicker
              v-model="form.license.startDate"
              name="startDate"
              label="开始日期"
              placeholder="请选择注册开始日期"
              :disabled="!isEditing"
              :rules="[{ required: true, message: '请选择注册开始日期' }]"
            />
            <!-- 结束日期 -->
            <BDatePicker
              v-if="!form.license.periodLong"
              v-model="form.license.endDate"
              name="endDate"
              label="结束日期"
              placeholder="请选择注册结束日期"
              :disabled="!isEditing"
              :rules="[{ required: true, message: '请选择注册结束日期' }]"
            />
          </van-cell-group>
        </div>
      </van-form>
    </div>

    <!-- 底部按钮 -->
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
import { computed, onMounted, ref } from 'vue'
import { showConfirmDialog, showNotify } from 'vant'
import { useRoute } from 'vue-router'
import {
  type MchMainBodyParam,
  type MerchantStatus,
  applyProfileAuth,
  getMainBody,
  getMerchantStatus,
  updateMainBody,
} from './MerchantProfile.api'
import type { Region } from '@/api/System.api'
import { findAllProvinceAndCityAndArea, idCardOcr, licenseOcr } from '@/api/System.api'
import { useTokenStore } from '@/store/modules/token'

const route = useRoute()
const { token } = route.query

// 请求头信息
const { setToken, setClientCode } = useTokenStore()
setToken(token as string)
setClientCode('dax-pay-merchant')

// 表单引用
const formRef = ref()
// 加载状态
const loading = ref(false)
// 编辑状态
const isEditing = ref(false)
// 省市区数据
const pca = ref<Region[]>([])
// 商户状态
const mchStatus = ref<MerchantStatus>({
  profileAuth: 'unauthenticated',
  profileAuthErrorMsg: '',
})
// 原始表单数据，用于取消时恢复
const originalFormData = ref<MchMainBodyParam>({
  base: {},
  legal: {},
  license: {},
})

// 表单数据
const form = ref<MchMainBodyParam>({
  base: {},
  legal: {},
  license: {},
})

// 计算是否可以提交认证
const canSubmitAuth = computed(() => {
  const authStatus = mchStatus.value.profileAuth
  return authStatus === 'unauthenticated' || authStatus === 'failed'
})

// 计算是否显示营业执照信息
const showLicenseInfo = computed(() => {
  const mchType = form.value.base?.merchantType
  return mchType === 'individual' || mchType === 'enterprise'
})

/**
 * 初始化数据
 */
async function initData() {
  loading.value = true
  try {
    // 并行获取主体信息、省市区数据和商户状态
    const [mainBodyRes, pcaRes, mchStatusRes] = await Promise.all([
      getMainBody(),
      findAllProvinceAndCityAndArea(),
      getMerchantStatus(),
    ])

    // 设置表单数据
    if (mainBodyRes.data) {
      form.value = mainBodyRes.data
      // 备份原始数据
      originalFormData.value = JSON.parse(JSON.stringify(mainBodyRes.data))
    }

    // 设置商户状态信息
    if (mchStatusRes.data) {
      mchStatus.value = mchStatusRes.data
    }

    pca.value = pcaRes.data || []
    // 默认为查看模式
    isEditing.value = false
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
 * 身份证正面识别
 */
function ocrIdCardFront() {
  idCardOcr(form.value.legal.frontPic, 'ID_CARD_FRONT').then(({ data, code, msg }) => {
    if (code) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    showNotify({ type: 'success', message: 'OCR识别成功' })
    form.value.legal.certNo = data.idNumber
    form.value.legal.legalName = data.name
  })
}

/**
 * 身份证反面识别
 */
function ocrIdCardBack() {
  idCardOcr(form.value.legal.backPic, 'ID_CARD_BACK').then(({ data, code, msg }) => {
    if (code) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    showNotify({ type: 'success', message: 'OCR识别成功' })
    form.value.legal.periodLong = data.periodLong
    form.value.legal.startDate = data.startDate
    form.value.legal.endDate = data.endDate
  })
}

/**
 * 营业执照OCR
 */
function licenseInfoOcr() {
  licenseOcr(form.value.license.licensePic).then(({ data, code, msg }) => {
    if (code) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    showNotify({ type: 'success', message: 'OCR识别成功' })
    if (mchStatus.value.profileAuth !== 'success') {
      form.value.license.licenseNo = data.number ?? form.value.license.licenseNo
      form.value.license.licenseName = data.name ?? form.value.license.licenseName
    }
    form.value.license.address = data.address
    form.value.license.periodLong = data.periodLong
    form.value.license.startDate = data.startDate
    form.value.license.endDate = data.endDate
  })
}

/**
 * 提交表单
 */
async function handleSubmit() {
  await formRef.value.validate()
  loading.value = true
  try {
    await updateMainBody(form.value)
    showNotify({ type: 'success', message: '保存成功' })
    // 保存成功后退出编辑模式并更新原始数据
    isEditing.value = false
    originalFormData.value = JSON.parse(JSON.stringify(form.value))
  }
  catch (err) {
    console.log(err)
    showNotify({ type: 'danger', message: '保存失败' })
  }
  finally {
    loading.value = false
  }
}

/**
 * 获取认证状态文本
 */
function getAuthStatusText(status) {
  switch (status) {
    case 'unauthenticated':
      return '未认证'
    case 'waiting':
      return '待认证'
    case 'success':
      return '认证成功'
    case 'failed':
      return '认证失败'
    default:
      return '未知状态'
  }
}

/**
 * 获取认证状态类型
 */
function getAuthStatusType(status) {
  switch (status) {
    case 'unauthenticated':
      return 'default' // 灰色
    case 'waiting':
      return 'warning' // 橘色
    case 'success':
      return 'success' // 绿色
    case 'failed':
      return 'danger' // 红色
    default:
      return 'default'
  }
}

/**
 * 提交认证
 */
async function handleSubmitAuth() {
  try {
    await formRef.value.validate()

    showConfirmDialog({
      title: '确定要提交认证吗？',
      message: '请确认信息填写正确，并确保所有信息已填写完毕，点击提交将会保存数据后发起认证',
    }).then(async () => {
      loading.value = true
      try {
        // 先保存数据
        await updateMainBody(form.value)
        // 再提交认证
        await applyProfileAuth()
        showNotify({ type: 'success', message: '认证申请提交成功' })
        // 重新加载数据以获取最新状态
        await initData()
      }
      catch (error) {
        console.error('提交认证失败:', error)
        showNotify({ type: 'danger', message: '提交认证失败' })
      }
      finally {
        loading.value = false
      }
    }).catch(() => {
      // 用户取消
    })
  }
  catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 页面加载时初始化数据
onMounted(() => {
  initData()
})
</script>

<style lang="less" scoped>
.mch-main-body {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding-bottom: env(safe-area-inset-bottom);
}

.form-content {
  flex: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 20px 0;
  padding-bottom: 80px; /* 为底部按钮留出空间 */
}

.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  z-index: 1000;
}

/* 卡片样式 */
.status-card,
.info-card {
  margin-bottom: 16px;
  background: #fff;
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
}

.card-header {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #f7f7f7;
  color: #448ef7;
  letter-spacing: 1px;
  position: relative;
  font-weight: 600;
  border-bottom: none;

  &::before {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    content: '';
    width: 5px;
    height: 20px;
    background-color: #448ef7;
  }
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #448ef7;
}

/* 认证状态样式优化 */
.status-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-label {
  font-weight: 500;
  color: #333;
}

.status-tag {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
}

.auth-btn {
  border-radius: 16px;
  font-size: 12px;
  padding: 4px 12px;
}

.commonTitle {
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  background-color: #fff;
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.readOcr {
  display: flex;
  align-items: center;
  gap: 8px;

  .readOcrBtn {
    margin-left: 8px;
    flex-shrink: 0;
  }
}

.bottom-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 15px 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #eee;

  .btn-group {
    display: flex;
    gap: 12px;

    .van-button {
      flex: 1;
    }
  }
}

/* 表单样式优化 */
:deep(.van-cell-group) {
  margin: 0 !important;
  border-radius: 0;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

:deep(.van-cell-group--inset) {
  margin: 0 !important;
  border-radius: 0;
}

:deep(.van-field__label) {
  font-weight: 500;
  color: #333;
}

:deep(.van-field__control) {
  font-size: 14px;
}

:deep(.van-radio-group) {
  display: flex;
  gap: 16px;
}

:deep(.van-radio) {
  margin-right: 0;
}

/* 认证状态样式 */
:deep(.van-tag) {
  font-size: 12px;
  padding: 2px 6px;
}

/* 上传组件样式优化 */
:deep(.upload-container) {
  border-radius: 6px;
}

:deep(.error-text) {
  color: #ee0a24 !important;
  font-size: 12px;
}
</style>
