<template>
  <div class="mch-shop-info">
    <van-overlay v-show="loading" :show="true">
      <div class="loading-wrapper" @click.stop>
        <van-loading size="24px">
          加载中...
        </van-loading>
      </div>
    </van-overlay>

    <div class="form-content">
      <van-form ref="formRef" required="auto" colon>
        <!-- 经营场所 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              经营场所
            </div>
          </div>
          <van-cell-group inset>
            <!-- 经营场所名称 -->
            <van-field
              v-model="form.name"
              label-align="top"
              name="name"
              placeholder="请输入经营场所名称"
              label="经营场所名称"
              clearable
              :disabled="!isEditing"
            />

            <!-- 省市区 -->
            <BCascader
              v-model="form.regionCode"
              name="regionCode"
              label="省市区"
              placeholder="请选择省市区"
              :disabled="!isEditing"
              :options="pca"
            />

            <!-- 详细地址 -->
            <van-field
              v-model="form.address"
              autosize
              label-align="top"
              name="address"
              placeholder="请输入详细地址"
              label="详细地址"
              type="textarea"
              clearable
              :disabled="!isEditing"
            />

            <!-- 门头照片 -->
            <van-field name="doorPic" label="门头照片" label-align="top" :disabled="!isEditing">
              <template #input>
                <BUpload
                  v-model:pic-url="form.doorPic"
                  :showable="!isEditing"
                />
              </template>
            </van-field>

            <!-- 室内照片 -->
            <van-field name="insidePic" label="室内照片" label-align="top" :disabled="!isEditing">
              <template #input>
                <BUpload
                  v-model:pic-url="form.insidePic"
                  :showable="!isEditing"
                />
              </template>
            </van-field>

            <!-- 收银台照片 -->
            <van-field name="cashierPic" label="收银台照片" label-align="top" :disabled="!isEditing">
              <template #input>
                <BUpload
                  v-model:pic-url="form.cashierPic"
                  :showable="!isEditing"
                />
              </template>
            </van-field>
          </van-cell-group>
        </div>
      </van-form>

      <!-- 底部按钮 -->
      <div class="bottom-btn">
        <div v-if="isEditing" class="btn-group">
          <van-button @click="handleCancel">
            取消
          </van-button>
          <van-button type="primary" :loading="loading" @click="handleSubmit">
            保存
          </van-button>
        </div>
        <van-button v-else type="primary" block @click="handleEdit">
          编辑
        </van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { showNotify } from 'vant'
import { getShopInfo, updateShopInfo } from './MerchantProfile.api'
import type { MchShopProfile } from './MerchantProfile.api'
import type { Region } from '@/api/System.api'
import { findAllProvinceAndCityAndArea } from '@/api/System.api'
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
// 原始表单数据，用于取消时恢复
const originalFormData = ref<MchShopProfile>({})

// 表单数据
const form = ref<MchShopProfile>({})

/**
 * 初始化数据
 */
async function initData() {
  loading.value = true
  try {
    const [shopInfoRes, pcaRes] = await Promise.all([
      getShopInfo(),
      findAllProvinceAndCityAndArea(),
    ])
    if (shopInfoRes.data) {
      form.value = shopInfoRes.data
      originalFormData.value = JSON.parse(JSON.stringify(shopInfoRes.data))
    }
    pca.value = pcaRes.data || []
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
 * 提交表单
 */
async function handleSubmit() {
  try {
    await formRef.value?.validate()
    loading.value = true
    const { code, msg } = await updateShopInfo(form.value)
    if (code) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    showNotify({ type: 'success', message: '保存成功' })
    // 保存成功后退出编辑模式
    isEditing.value = false
    // 更新原始数据
    originalFormData.value = JSON.parse(JSON.stringify(form.value))
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
.mch-shop-info {
  padding-bottom: 80px;
}

.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
}

.form-content {
  padding-bottom: 80px;
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
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: #fff;
  border-top: 1px solid #ebedf0;
  .btn-group {
    display: flex;
    gap: 12px;

    .van-button {
      flex: 1;
    }
  }
}

:deep(.van-cell-group--inset) {
  margin: 0;
}
</style>
