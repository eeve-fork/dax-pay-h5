<template>
  <div class="boarded">
    <!-- 步骤页 -->
    <van-overlay v-show="loading" :show="true">
      <div class="loading-wrapper" @click.stop>
        <van-loading size="24px">
          操作中...
        </van-loading>
      </div>
    </van-overlay>
    <div class="stepsBox">
      <span class="current">{{ currentPage.currentIndex }} </span>/{{ currentPage.date.length }}
      <span class="stepName"> {{ currentPage.currentTitle }}</span>
    </div>
    <div class="formBox">
      <van-form ref="formRef" colon required="auto">
        <!-- 第一模块 - 主体信息 -->
        <template v-if="currentPage.currentIndex === 1">
          <div class="commonTitle">
            主体信息
          </div>
          <van-cell-group inset>
            <!-- 商户类型 -->
            <van-field name="merchantType" label="商户类型" label-align="top" :disabled="showable" :rules="[{ required: true, message: '请选择商户类型' }]">
              <template #input>
                <van-radio-group
                  v-model="form.merchant.merchantType"
                  :disabled="showable"
                  direction="horizontal"
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
            <!-- 小微商户类型 -->
            <van-field
              v-if="form.merchant.merchantType === 'micro'"
              name="microBizType"
              label="小微商户类型"
              label-align="top"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择小微商户类型' }]"
            >
              <template #input>
                <van-radio-group
                  v-model="form.other.microBizType"
                  :disabled="showable"
                  direction="vertical"
                >
                  <van-radio name="MICRO_TYPE_STORE" class="pb-2">
                    门店场所
                  </van-radio>
                  <van-radio name="MICRO_TYPE_MOBILE" class="pb-2">
                    流动经营/便民服务
                  </van-radio>
                  <van-radio name="MICRO_TYPE_ONLINE">
                    线上商品/服务交易
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 企业性质 -->
            <van-field
              v-if="form.merchant.merchantType === 'enterprise'"
              name="enterpriseNature"
              label="企业性质"
              label-align="top"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择企业性质' }]"
            >
              <template #input>
                <van-radio-group
                  v-model="form.other.enterpriseNature"
                  :disabled="showable"
                  direction="horizontal"
                >
                  <van-radio name="LIMITED_COMPANY">
                    有限责任公司
                  </van-radio>
                  <van-radio name="STOCK_COMPANY">
                    股份有限公司
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 商户简称 -->
            <van-field
              v-model="form.merchant.merchantShortName"
              label-align="top"
              name="merchantShortName"
              placeholder="请输入商户简称"
              label="商户简称"
              clearable
              maxlength="15"
              :disabled="showable"
              :rules="[{ required: true, message: '请输入商户简称' }]"
            />
            <!-- 商户全称 -->
            <van-field
              v-model="form.merchant.merchantName"
              label-align="top"
              name="merchantName"
              placeholder="请输入商户全称"
              label="商户全称"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入商户全称' }]"
            />
            <!-- 联系邮件 -->
            <van-field
              v-model="form.other.email"
              label-align="top"
              name="email"
              placeholder="请输入联系邮件地址"
              label="联系邮件"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入联系邮件地址' }]"
            />
            <!-- 客服电话 -->
            <van-field
              v-model="form.other.servicePhone"
              label-align="top"
              name="servicePhone"
              placeholder="请输入客服电话"
              label="客服电话"
              clearable
              maxlength="15"
              :disabled="showable"
              :rules="[{ required: true, message: '请输入客服电话' }]"
            />
          </van-cell-group>

          <div class="commonTitle">
            法人信息
          </div>
          <van-cell-group inset>
            <!-- 身份证正面 -->
            <van-field
              name="frontPicUrl"
              label="身份证正面"
              label-align="top"
              :disabled="showable"
              :rules="[{ required: true, message: '请上传身份证正面图片' }]"
            >
              <template #input>
                <div class="readOcr">
                  <BUpload
                    v-model:pic-url="form.legal.frontPicUrl"
                    v-model:pic-id="form.legal.frontPic"

                    :showable="showable"
                  />
                  <van-button
                    v-if="!showable && form.legal.frontPicUrl"
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
              name="backPicUrl"
              label="身份证反面"
              label-align="top"
              :disabled="showable"
              :rules="[{ required: true, message: '请上传身份证反面图片' }]"
            >
              <template #input>
                <div class="readOcr">
                  <BUpload
                    v-model:pic-url="form.legal.backPicUrl"
                    v-model:pic-id="form.legal.backPic"

                    :showable="showable"
                  />
                  <van-button
                    v-if="!showable && form.legal.backPicUrl"
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
            <!-- 手持身份证正面照 -->
            <van-field
              v-if="form.merchant.merchantType === 'micro'"
              name="handIdCardFrontPicUrl"
              label="手持身份证正面照"
              label-align="top"
              :disabled="showable"
              :rules="[{ required: true, message: '请上传手持身份证正面照' }]"
            >
              <template #input>
                <BUpload
                  v-model:pic-url="form.other.handIdCardFrontPicUrl"
                  v-model:pic-id="form.other.handIdCardFrontPic"

                  :showable="showable"
                />
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
              :disabled="showable"
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
              :disabled="showable"
              :rules="[{ required: true, message: '请输入身份证号' }]"
            />
            <!-- 身份证有效期 -->
            <van-field label="长期有效" label-align="top" :disabled="showable">
              <template #input>
                <van-switch v-model="form.legal.periodLong" :disabled="showable" />
              </template>
            </van-field>
            <!-- 证件有效期开始日期 -->
            <BDatePicker
              v-model="form.legal.startDate"
              name="startDate"
              label="证件开始日期"
              placeholder="请选择证件有效期开始日期"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择证件开始时间' }]"
            />
            <!-- 证件有效期结束日期 -->
            <BDatePicker
              v-if="!form.legal.periodLong"
              v-model="form.legal.endDate"
              name="endDate"
              label="证件有效期结束日期"
              placeholder="请选择证件结束时间"
              :disabled="showable"
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
              :disabled="showable"
              :rules="[{ required: true, message: '请输入手机号' }]"
            />
          </van-cell-group>

          <template
            v-if="['individual', 'enterprise'].includes(form.merchant.merchantType as string)"
          >
            <div class="commonTitle">
              营业执照信息
            </div>
            <van-cell-group inset>
              <!-- 营业执照照片 -->
              <van-field name="licensePicUrl" label="营业执照照片" label-align="top" :disabled="showable" :rules="[{ required: true, message: '请上传营业执照照片' }]">
                <template #input>
                  <div class="readOcr">
                    <BUpload
                      v-model:pic-url="form.license.licensePicUrl"
                      v-model:pic-id="form.license.licensePic"

                      :showable="showable"
                    />
                    <van-button
                      v-if="!showable && form.license.licensePicUrl"
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
              <!-- 工商网截图 -->
              <van-field
                name="busNetPicUrl"
                label="工商网截图"
                label-align="top"
                :disabled="showable"
                :rules="[{ required: true, message: '请上传工商网截图' }]"
              >
                <template #input>
                  <BUpload
                    v-model:pic-url="form.other.busNetPicUrl"
                    v-model:pic-id="form.other.busNetPic"

                    :showable="showable"
                  />
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
                :disabled="showable"
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
                maxlength="40"
                :disabled="showable"
                :rules="[{ required: true, message: '请输入营业执照名称' }]"
              />
              <!-- 营业执照详细地址 -->
              <van-field
                v-model="form.license.address"
                autosize
                label-align="top"
                name="address"
                label="营业执照详细地址"
                placeholder="请输入营业执照详细地址"
                :disabled="showable"
                :rules="[{ required: true, message: '请输入营业执照详细地址' }]"
              />
              <!-- 营业执照有效期 -->
              <van-field label="长期有效" label-align="top" :disabled="showable">
                <template #input>
                  <van-switch v-model="form.license.periodLong" :disabled="showable" />
                </template>
              </van-field>
              <!-- 营业执照有效期开始日期 -->
              <BDatePicker
                v-model="form.license.startDate"
                name="startDate"
                label="营业执照开始日期"
                placeholder="请选择营业执照有效期开始日期"
                :disabled="showable"
                :rules="[{ required: true, message: '请选择营业执照开始时间' }]"
              />
              <!-- 营业执照有效期结束日期 -->
              <BDatePicker
                v-if="!form.license.periodLong"
                v-model="form.license.endDate"
                name="endDate"
                label="营业执照有效期结束日期"
                placeholder="请选择营业执照结束时间"
                :disabled="showable"
                :rules="[{ required: true, message: '请选择营业执照结束时间' }]"
              />
            </van-cell-group>
          </template>
        </template>

        <!-- 第二模块 - 经营信息 -->
        <template v-if="currentPage.currentIndex === 2">
          <div class="commonTitle">
            经营类目
          </div>
          <van-cell-group inset>
            <!-- 商户经营类目 -->
            <BCascader
              v-model="form.other.mchMccCodes"
              name="mchMccCodes"
              label="商户经营类目"
              placeholder="请选择商户经营类目"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择商户经营类目' }]"
              :options="mchMccCodes"
            />
            <!-- 微信经营类目 -->
            <BCascader
              v-model="form.other.wxMccCodes"
              name="wxMccCodes"
              label="微信经营类目"
              placeholder="请选择微信经营类目"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择微信经营类目' }]"
              :options="wxMccCodes"
            />
            <!-- 商户类别 -->
            <BCascader
              v-model="form.other.mccCodes"
              name="mccCodes"
              label="商户类别"
              placeholder="请选择商户类别"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择商户类别' }]"
              :options="mccCodes"
            />
          </van-cell-group>

          <div class="commonTitle">
            经营场所信息
          </div>
          <van-cell-group inset>
            <!-- 经营场所所在区县 -->
            <BCascader
              v-model="form.shop.regionCode"
              name="regionCode"
              label="经营场所所在区县"
              placeholder="请选择经营场所所在区县"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择经营场所所在区县' }]"
              :options="pca"
            />
            <!-- 经营场所详细地址 -->
            <van-field
              v-model="form.shop.address"
              autosize
              label-align="top"
              name="address"
              placeholder="请输入经营场所详细地址（不含省市区）"
              label="经营场所详细地址"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入经营场所详细地址（不含省市区）' }]"
            />
            <!-- 小程序/公众号截图链接 -->
            <van-field
              name="appScreenshotImgUrl"
              label="小程序/公众号截图链接"
              label-align="top"
              :disabled="showable"
            >
              <template #input>
                <BUpload
                  v-model:pic-url="form.other.appScreenshotImgUrl"
                  v-model:pic-id="form.other.appScreenshotImg"

                  :showable="showable"
                />
              </template>
            </van-field>
            <!-- 支付环境图片 -->
            <van-field
              name="paymentsImgUrl"
              label="支付环境图片"
              label-align="top"
              :disabled="showable"
            >
              <template #input>
                <BUpload
                  v-model:pic-url="form.other.paymentsImgUrl"
                  v-model:pic-id="form.other.paymentsImg"

                  :showable="showable"
                />
              </template>
            </van-field>
          </van-cell-group>
        </template>
      </van-form>
    </div>

    <!-- 底部按钮 -->
    <div class="btnContain">
      <div class="btnBox">
        <van-button v-if="!showable && currentPage.currentIndex === 1 && clientCode" block @click="readMch">
          读取商户信息
        </van-button>
        <van-button v-if="currentPage.currentIndex > 1" type="primary" block @click="prevClick">
          上一步
        </van-button>
        <van-button v-if="currentPage.currentIndex < currentPage.date.length" type="primary" block @click="nextClick">
          下一步
        </van-button>
        <van-button v-if="!showable && currentPage.currentIndex === currentPage.date.length" :disabled="showable" type="primary" block @click="submitClick">
          提交
        </van-button>
      </div>
      <div class="btnBox" style="margin-bottom: 20px">
        <van-button type="primary" color="#ff8a00" :disabled="showable" plain block @click="saveTemp">
          暂存
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { showConfirmDialog, showDialog, showNotify } from 'vant'
import type { MccConst, MerchantApply } from './SandApply.api'
import { findById, findH5ById, mccTree, mchMccTree, save, saveH5, wxMccTree } from './SandApply.api'
import {
  submit,
  submitH5,
} from '@/views/daxpay/h5/onboarded/common/OnbMchApply.api'
import router from '@/router'
import { initMerchantProfile } from '@/views/daxpay/h5/onboarded/common/OnbMchApplyUtil'
import { useTokenStore } from '@/store/modules/token'
import type { Region } from '@/api/System.api'
import { findAllProvinceAndCityAndArea, idCardOcr, licenseOcr } from '@/api/System.api'

const route = useRoute()
const { id: applyId, sign, token, clientCode, show } = route.query
// 是否可查看
const showable = ref<boolean>(show === 'true')

// 请求头信息
const { setToken, setClientCode } = useTokenStore()
// 请求头信息
setToken(token as string)
setClientCode(clientCode as string)

// 当前页面状态
const currentPage = reactive({
  currentIndex: 1,
  currentTitle: '主体信息',
  date: [
    { title: '主体信息' },
    { title: '经营信息' },
  ],
})

// 表单ref对象
const formRef = ref<any>()
const loading = ref<boolean>(false)

const pca = ref<Region[]>([])
const mccCodes = ref<MccConst[]>([])
const wxMccCodes = ref<MccConst[]>([])
const mchMccCodes = ref<MccConst[]>([])

// 表单数据对象
const form = ref<MerchantApply>({
  merchant: {},
  legal: {},
  license: {},
  shop: {},
  other: {},
})

/**
 * 初始化
 */
onMounted(async () => {
  initData()
  getInfo()
})

/**
 * 初始化数据
 */
function initData() {
  // 获取类目数据
  mccTree().then(({ data }) => {
    mccCodes.value = data
  })
  wxMccTree().then(({ data }) => {
    wxMccCodes.value = data
  })
  mchMccTree().then(({ data }) => {
    mchMccCodes.value = data
  })
  // 获取地区树据
  findAllProvinceAndCityAndArea().then(({ data }) => {
    pca.value = data
  })
}

/**
 * 获取数据
 */
function getInfo() {
  // 终端有值说明是嵌入方式
  const promise = clientCode ? findById(applyId) : findH5ById(applyId, sign)
  promise.then(({ code, data, msg }) => {
    if (code !== 0) {
      router.replace({ name: 'payFail', query: { msg, title: '获取信息失败' } })
      return
    }
    form.value = data
    // 更新当前步骤标题
    updateCurrentTitle()
  })
}

/**
 * 更新当前步骤标题
 */
function updateCurrentTitle() {
  currentPage.currentTitle = currentPage.date[currentPage.currentIndex - 1]?.title || ''
}

/**
 * 点击上一步
 */
function prevClick() {
  currentPage.currentIndex--
  updateCurrentTitle()
}

/**
 * 点击下一步进行校验
 */
function nextClick() {
  // 如果是查看模式，直接跳转到下一步，不进行表单验证
  if (showable.value) {
    currentPage.currentIndex++
    updateCurrentTitle()
    return
  }

  formRef.value.validate()
    .then(() => {
      // 执行下一步操作
      currentPage.currentIndex++
      updateCurrentTitle()
    })
    .catch(() => {
      showNotify({ type: 'danger', message: '表单校验未通过，请仔细检查！' })
    })
}

/**
 * 暂存
 */
function saveTemp() {
  loading.value = true
  // 终端有值说明是嵌入方式
  const promise = clientCode ? save(form.value) : saveH5(form.value, sign)
  promise.then(({ code, msg }) => {
    if (code !== 0) {
      showNotify({ type: 'danger', message: msg })
    }
    else {
      showNotify({ type: 'success', message: '暂存成功' })
    }
    loading.value = false
  })
}

/**
 * 提交
 */
function submitClick() {
  // 先进行数据校验
  formRef.value
    .validate()
    .then(() => {
      // 校验通过后弹窗确认
      showConfirmDialog({
        title: '提示',
        message: '确定要提交进件申请！',
      }).then(async () => {
        loading.value = true
        // 执行下一步操作
        const savePromise = clientCode ? save(form.value) : saveH5(form.value, sign)
        await savePromise.then(({ code, msg }) => {
          if (code !== 0) {
            showNotify({ type: 'danger', message: msg })
            loading.value = false
          }
        })
        // 提交
        const submitPromise = clientCode ? submit(form.value.applyId) : submitH5(form.value.applyId, sign)
        await submitPromise.then(({ code, msg }) => {
          if (code !== 0) {
            showNotify({ type: 'danger', message: msg })
            return
          }
          // 嵌入方式直接返回
          if (clientCode) {
            showDialog({ title: '提交成功', message: '返回申请列表后请刷新查看最新信息！' }).then(() => {
              uni.navigateBack()
            })
          }
          else {
            // 跳转到成功页面
            router.replace({
              name: 'SuccessResult',
              query: { title: '提交申请成功' },
            })
          }
        })
      })
    })
    .catch(() => {
      showNotify({ type: 'danger', message: '表单校验未通过，请仔细检查！' })
    })
}

/**
 * 身份证正面识别
 */
function ocrIdCardFront() {
  idCardOcr(form.value.legal.frontPicUrl, 'ID_CARD_FRONT').then((res) => {
    if (res.code !== 0) {
      showNotify({ type: 'danger', message: res.msg })
      return
    }
    showNotify({ type: 'success', message: 'OCR识别成功' })
    const data = res.data
    form.value.legal.legalName = data.name
    form.value.legal.certNo = data.idNumber
  })
}

/**
 * 身份证反面识别
 */
function ocrIdCardBack() {
  idCardOcr(form.value.legal.backPicUrl, 'ID_CARD_BACK').then(({ code, data, msg }) => {
    if (code !== 0) {
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
  licenseOcr(form.value.license.licensePicUrl).then(({ code, data, msg }) => {
    if (code !== 0) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    showNotify({ type: 'success', message: 'OCR识别成功' })
    form.value.license.licenseNo = data.number
    form.value.license.licenseName = data.name
    form.value.license.address = data.address
    form.value.license.periodLong = data.periodLong
    form.value.license.startDate = data.startDate
    form.value.license.endDate = data.endDate
  })
}

/**
 * 读取商户资料
 */
function readMch() {
  showConfirmDialog({
    title: '提示',
    message: '确定要读取商户资料吗？读取后会覆盖已经填写的信息内容！',
  }).then(() => {
    readMchData()
  })
}

/**
 * 读取商户资料
 */
async function readMchData() {
  // 获取当前商户号
  const mchNo = form.value.merchant.mchNo as string
  loading.value = true
  await initMerchantProfile(form.value, mchNo)
  loading.value = false
  showNotify({ type: 'success', message: '商户资料读取成功' })
}
</script>

<style lang="less" scoped>
.boarded {
  width: 100%;
  height: 100%;
  padding-bottom: env(safe-area-inset-bottom);

  .stepsBox {
    width: 100%;
    height: 5%;
    display: flex;
    align-items: center;
    background-color: #f7f7f7;
    padding: 0 1.25rem;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 2px;
    .current {
      color: #ff8a00;
    }
  }
  .formBox {
    width: 100%;
    height: 80%;
    overflow-y: scroll;
    padding: 1.25rem 0;

    // 公共头部
    .commonTitle {
      height: 3.125rem;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 1.25rem;
      background-color: #f7f7f7;
      color: #5C4B37;
      letter-spacing: 1px;
      position: relative;
      font-weight: 600;
      &::before {
        position: absolute;
        top: 50%;
        left: 0.3125rem;
        transform: translateY(-50%);
        content: '';
        width: 0.3125rem;
        height: 1.25rem;
        background-color: #ff8a00;
      }
    }
  }
  .btnContain {
    width: 100%;
    height: 10%;
    .btnBox {
      display: flex;
      gap: 1.25rem;
      padding: 0 1.25rem;
      margin: 0.625rem 0;
    }
  }
}
:deep(.van-form) {
  .van-cell-group {
    &.van-cell-group--inset {
      margin: 0 !important;
    }
  }
}
.readOcr {
  display: flex;
  gap: 8px;
  align-items: center;
  .readOcrBtn {
    transform: translateY(24px);
  }
}
</style>
