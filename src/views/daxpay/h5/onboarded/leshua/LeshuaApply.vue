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
      <van-form ref="formRef" required="auto" colon>
        <!-- 第一模块 -->
        <template v-if="currentPage.currentIndex === 1">
          <div class="commonTitle">
            联系人信息
          </div>
          <van-cell-group inset>
            <!-- 商户类型 -->
            <van-field name="merchantType" label="商户类型" label-align="top" :disabled="showable" :rules="[{ required: true, message: '请选择商户类型' }]">
              <template #input>
                <van-radio-group
                  v-model="form.merchant.merchantType"
                  direction="horizontal"
                  :disabled="showable"
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
            <!-- 商户简称 -->
            <van-field
              v-model="form.merchant.merchantShortName"
              label-align="top"
              name="merchantShortName"
              placeholder="请输入商户简称"
              label="商户简称"
              clearable
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
            <!-- 费率通道识别码 -->
            <van-field
              v-model="form.other.reportConfigId"
              label-align="top"
              name="reportConfigId"
              placeholder="请输入费率通道识别码"
              label="费率通道识别码"
              type="number"
              clearable
              :disabled="showable"
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
                  /><van-button
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
              label="开始日期"
              placeholder="请选择证件有效期开始日期"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择证件开始时间' }]"
            />
            <!-- 证件有效期结束日期 -->
            <BDatePicker
              v-if="!form.legal.periodLong"
              v-model="form.legal.endDate"
              name="endDate"
              label="结束日期"
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
              :rules="[{ required: true, message: '请输入联系人手机号' }]"
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
                :disabled="showable"
                :rules="[{ required: true, message: '请输入营业执照名称' }]"
              />
              <!-- 营业执照详细地址 -->
              <van-field
                v-model="form.license.address"
                autosize
                label-align="top"
                name="address"
                placeholder="请输入营业执照详细地址"
                label="营业执照详细地址"
                clearable
                :disabled="showable"
                :rules="[{ required: true, message: '请输入营业执照详细地址' }]"
              />
              <!-- 注册有效期 -->
              <van-field label="长期有效" label-align="top" :disabled="showable">
                <template #input>
                  <van-switch v-model="form.license.periodLong" :disabled="showable" />
                </template>
              </van-field>
              <!-- 开始日期 -->
              <BDatePicker
                v-model="form.license.startDate"
                name="startDate"
                label="开始日期"
                placeholder="请选择注册开始日期"
                :disabled="showable"
                :rules="[{ required: true, message: '请选择注册开始日期' }]"
              />
              <!-- 结束日期 -->
              <BDatePicker
                v-if="!form.license.periodLong"
                v-model="form.license.endDate"
                name="endDate"
                label="结束日期"
                placeholder="请选择注册结束日期"
                :disabled="showable"
                :rules="[{ required: true, message: '请选择注册结束日期' }]"
              />
            </van-cell-group>
          </template>
        </template>
        <!-- 第二模块 -->
        <template v-if="currentPage.currentIndex === 2">
          <div class="commonTitle">
            经营场所信息
          </div>
          <van-cell-group inset>
            <!-- 门店名称 -->
            <van-field
              v-model="form.shop.name"
              label-align="top"
              name="name"
              placeholder="请输入门店名称"
              label="门店名称"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入门店名称' }]"
            />
            <!-- 门店类型 -->
            <van-field name="type" label="门店类型" label-align="top" :disabled="showable" :rules="[{ required: true, message: '请选择门店类型' }]">
              <template #input>
                <van-radio-group
                  v-model="form.shop.type"
                  direction="horizontal"
                  :disabled="showable"
                >
                  <van-radio name="1">
                    总店（默认）
                  </van-radio>
                  <van-radio name="0">
                    分店
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 总店商户号 -->
            <van-field
              v-if="form.shop.type === '0'"
              v-model="form.other.totalMchNo"
              label-align="top"
              name="totalMchNo"
              placeholder="请输入总店商户号"
              label="总店商户号"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入总店商户号' }]"
            />
            <!-- 结算类型 -->
            <van-field name="settleType" label="结算类型" label-align="top" :disabled="showable" :rules="[{ required: true, message: '请选择结算类型' }]">
              <template #input>
                <van-radio-group
                  v-model="form.shop.settleType"
                  direction="horizontal"
                  :disabled="showable"
                >
                  <van-radio name="0">
                    独立结算（默认）
                  </van-radio>
                  <van-radio name="1">
                    合并结算至总店
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 经营类目 -->
            <b-cascader
              v-model="form.other.mccCodes"
              name="mccCodes"
              label="经营类目"
              placeholder="请选择经营类目"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择经营类目' }]"
              :options="mccCodes"
            />
            <!-- 所在区县 -->
            <b-cascader
              v-model="form.shop.regionCode"
              name="regionCode"
              label="所在区县"
              placeholder="请选择所在区县"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择所在区县' }]"
              :options="pca"
            />
            <!-- 详细地址 -->
            <van-field
              v-model="form.shop.address"
              autosize
              label-align="top"
              name="address"
              placeholder="请输入详细地址"
              label="详细地址"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入详细地址' }]"
            />
            <!-- 商户门头图片 -->
            <van-field name="doorPicUrl" label="商户门头图片" label-align="top" :disabled="showable" :rules="[{ required: true, message: '请上传商户门头图片' }]">
              <template #input>
                <BUpload
                  v-model:pic-url="form.shop.doorPicUrl"
                  v-model:pic-id="form.shop.doorPic"

                  :showable="showable"
                />
              </template>
            </van-field>
            <!-- 营业场所室内照片 -->
            <van-field name="insidePicUrl" label="营业场所室内照片" label-align="top" :disabled="showable" :rules="[{ required: true, message: '请上传营业场所室内照片' }]">
              <template #input>
                <BUpload
                  v-model:pic-url="form.shop.insidePicUrl"
                  v-model:pic-id="form.shop.insidePic"

                  :showable="showable"
                />
              </template>
            </van-field>
            <!-- 收银台照片 -->
            <van-field name="cashierPicUrl" label="收银台照片" label-align="top" :disabled="showable" :rules="[{ required: true, message: '请上传收银台照片' }]">
              <template #input>
                <BUpload
                  v-model:pic-url="form.shop.cashierPicUrl"
                  v-model:pic-id="form.shop.cashierPic"

                  :showable="showable"
                />
              </template>
            </van-field>
          </van-cell-group>
        </template>
        <!-- 第三模块 -->
        <template v-if="currentPage.currentIndex === 3">
          <div class="commonTitle">
            结算卡信息
          </div>
          <van-cell-group inset>
            <!-- 账户类型 -->
            <van-field
              v-if="form.merchant.merchantType !== 'micro'"
              name="accountType" label="账户类型" label-align="top"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择账户类型' }]"
            >
              <template #input>
                <van-radio-group
                  v-model="form.bankAccount.accountType"
                  :disabled="showable"
                  direction="horizontal"
                >
                  <van-radio :disabled="form.merchant.merchantType === 'micro'" name="company_owner">
                    公户
                  </van-radio>
                  <van-radio name="person_owner">
                    对私法人
                  </van-radio>
                  <van-radio :disabled="form.merchant.merchantType === 'micro'" name="person_not_owner">
                    对私非法人
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 银行卡正面 -->
            <van-field
              name="cardFrontPicUrl"
              :label="
                form.bankAccount.accountType !== 'company_owner' ? '银行卡正面' : '开户许可证'
              "
              label-align="top"
              :disabled="showable"
              :rules="[{ required: true, message: '请上传银行卡正面' }]"
            >
              <template #input>
                <div class="readOcr">
                  <BUpload
                    v-model:pic-url="form.bankAccount.cardFrontPicUrl"
                    v-model:pic-id="form.bankAccount.cardFrontPic"

                    :showable="showable"
                  />
                  <van-button
                    v-if="!showable && form.bankAccount.cardFrontPicUrl"
                    class="readOcrBtn"
                    hairline
                    plain
                    size="small"
                    @click="bankCardInfoOcr"
                  >
                    OCR识别
                  </van-button>
                </div>
              </template>
            </van-field>
            <!-- 银行卡开户名 -->
            <van-field
              v-model="form.bankAccount.accountName"
              label-align="top"
              name="accountName"
              placeholder="请输入银行卡开户名"
              label="银行卡开户名"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入银行卡开户名' }]"
            />
            <!-- 银行卡号 -->
            <van-field
              v-model="form.bankAccount.cardNo"
              label-align="top"
              name="cardNo"
              placeholder="请输入银行卡号"
              label="银行卡号"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入银行卡号' }]"
            />
            <!-- 开户银行联行号 -->
            <van-field
              v-model="form.bankAccount.branchNo"
              label-align="top"
              name="branchNo"
              placeholder="请输入开户银行联行号"
              label="开户银行联行号"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入开户银行联行号' }]"
            />
          </van-cell-group>
          <template
            v-if="
              ['person_not_owner', 'company_not_owner'].includes(
                form.bankAccount?.accountType as string,
              )
            "
          >
            <div class="commonTitle">
              持卡人信息
            </div>
            <van-cell-group inset>
              <!-- 持卡人身份证正面 -->
              <van-field
                name="frontPicUrl"
                label="持卡人身份证正面"
                label-align="top"
                :disabled="showable"
                :rules="[{ required: true, message: '请上传持卡人身份证正面图片' }]"
              >
                <template #input>
                  <div class="readOcr">
                    <BUpload
                      v-model:pic-url="form.cardHolder.frontPicUrl"
                      v-model:pic-id="form.cardHolder.frontPic"

                      :showable="showable"
                    />
                    <van-button
                      v-if="!showable && form.cardHolder.frontPicUrl"
                      class="readOcrBtn"
                      hairline
                      plain
                      size="small"
                      @click="ocrBankIdCardFront"
                    >
                      OCR识别
                    </van-button>
                  </div>
                </template>
              </van-field>
              <!-- 持卡人身份证反面 -->
              <van-field
                name="backPicUrl"
                label="持卡人身份证反面"
                label-align="top"
                :disabled="showable"
                :rules="[{ required: true, message: '请上传持卡人身份证反面图片' }]"
              >
                <template #input>
                  <div class="readOcr">
                    <BUpload
                      v-model:pic-url="form.cardHolder.backPicUrl"
                      v-model:pic-id="form.cardHolder.backPic"

                      :showable="showable"
                    /><van-button
                      v-if="!showable && form.cardHolder.backPicUrl"
                      class="readOcrBtn"
                      hairline
                      plain
                      size="small"
                      @click="ocrBankIdCardBack"
                    >
                      OCR识别
                    </van-button>
                  </div>
                </template>
              </van-field>
              <!-- 持卡人身份证号 -->
              <van-field
                v-model="form.cardHolder.certNo"
                label-align="top"
                name="certNo"
                placeholder="请输入持卡人身份证号"
                label="持卡人身份证号"
                clearable
                :disabled="showable"
                :rules="[{ required: true, message: '请输入持卡人身份证号' }]"
              />

              <!-- 非法人结算授权函图片 -->
              <van-field
                name="letterOfAuthPicUrl"
                label="非法人结算授权函图片"
                label-align="top"
                :disabled="showable"
                :rules="[{ required: true, message: '请上传非法人结算授权函图片' }]"
              >
                <template #input>
                  <BUpload
                    v-model:pic-url="form.cardHolder.letterOfAuthPicUrl"
                    v-model:pic-id="form.cardHolder.letterOfAuthPic"

                    :showable="showable"
                  />
                </template>
              </van-field>
            </van-cell-group>
          </template>
        </template>
      </van-form>
    </div>
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
import { showConfirmDialog, showDialog, showNotify } from 'vant'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import type { MccConst, MerchantApply } from './LeshuaApply.api'
import { findById, findH5ById, mccTree, save, saveH5 } from './LeshuaApply.api'
import {
  submit,
  submitH5,
} from '@/views/daxpay/h5/onboarded/common/OnbMchApply.api'

import BUpload from '@/components/BUpload.vue'
import router from '@/router'
import { initMerchantProfile } from '@/views/daxpay/h5/onboarded/common/OnbMchApplyUtil'
import { useTokenStore } from '@/store/modules/token'
import type { Region } from '@/api/System.api'
import { bankCardOcr, findAllProvinceAndCityAndArea, idCardOcr, licenseOcr } from '@/api/System.api'

const route = useRoute()
const { id: applyId, sign, token, clientCode, show } = route.query
// 是否可查看
const showable = ref<boolean>(show === 'true')

// 请求头信息
const { setToken, setClientCode } = useTokenStore()
// 请求头信息
setToken(token as string)
setClientCode(clientCode as string)

// 控制当前页面数据对象
const currentPage = reactive({
  currentIndex: 1, // 当前页面的值
  // 数据
  date: [
    {
      index: 1,
      title: '主体信息',
    },
    {
      index: 2,
      title: '经营信息',
    },
    {
      index: 3,
      title: '结算账户',
    },
  ],
  currentTitle: computed(() => {
    return currentPage.date.find(item => item.index === currentPage.currentIndex).title
  }),
})

// 表单ref对象
const formRef = ref<any>()
const loading = ref<boolean>(false)

const pca = ref<Region[]>([])
const mccCodes = ref<MccConst[]>([])

// 表单数据对象
const form = ref<MerchantApply>({
  merchant: {},
  legal: {},
  license: {},
  shop: {},
  bankAccount: {},
  cardHolder: {},
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
  // 获取地区树据
  findAllProvinceAndCityAndArea().then(({ data }) => {
    pca.value = data
  })
}

/**
 * 获取数据
 */
function getInfo() {
  const promise = clientCode ? findById(applyId) : findH5ById(applyId, sign)
  promise.then(({ code, data, msg }) => {
    if (code !== 0) {
      router.replace({ name: 'payFail', query: { msg, title: '获取信息失败' } })
      return
    }
    form.value = data
  })
}

/**
 * 点击上一步
 */
function prevClick() {
  currentPage.currentIndex--
}

/**
 * 点击下一步进行校验
 */
function nextClick() {
  // 如果是查看模式，直接跳转到下一步，不进行表单验证
  if (showable.value) {
    currentPage.currentIndex++
    return
  }

  formRef.value.validate()
    .then(() => {
      // 执行下一步操作
      currentPage.currentIndex++
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
 * 银行卡OCR
 */
function bankCardInfoOcr() {
  bankCardOcr(form.value.bankAccount.cardFrontPicUrl).then(({ code, data, msg }) => {
    if (code !== 0) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    showNotify({ type: 'success', message: 'OCR识别成功' })
    form.value.bankAccount.cardNo = data.cardNumber
  })
}

/**
 * 非法人身份证正面识别
 */
function ocrBankIdCardFront() {
  idCardOcr(form.value.legal.frontPicUrl, 'ID_CARD_FRONT').then((res) => {
    showNotify({ type: 'success', message: 'OCR识别成功' })
    const data = res.data
    form.value.cardHolder.holderName = data.name
    form.value.cardHolder.certNo = data.idNumber
  })
}

/**
 * 非法人身份证反面识别
 */
function ocrBankIdCardBack() {
  idCardOcr(form.value.legal.backPicUrl, 'ID_CARD_BACK').then(({ data }) => {
    showNotify({ type: 'success', message: 'OCR识别成功' })
    form.value.cardHolder.periodLong = data.periodLong
    form.value.cardHolder.startDate = data.startDate
    form.value.cardHolder.endDate = data.endDate
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
