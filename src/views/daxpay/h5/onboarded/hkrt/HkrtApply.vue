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
        <!-- 第一模块 -->
        <template v-if="currentPage.currentIndex === 1">
          <div class="commonTitle">
            联系人信息
          </div>
          <van-cell-group inset>
            <!-- 商户类型 -->
            <van-field name="merchantType" label="商户类型" label-align="top" :rules="[{ required: true, message: '请选择商户类型' }]">
              <template #input>
                <van-radio-group
                  v-model="form.mchApply.merchant.merchantType"
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
            <!-- 商户简称 -->
            <van-field
              v-model="form.mchApply.merchant.merchantShortName"
              label-align="top"
              name="merchantShortName"
              placeholder="请输入商户简称"
              label="商户简称"
              clearable
              :rules="[{ required: true, message: '请输入商户简称' }]"
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
              :rules="[{ required: true, message: '请上传身份证正面图片' }]"
            >
              <template #input>
                <div class="readOcr">
                  <BUpload
                    v-model:pic-url="form.mchApply.legal.frontPicUrl"
                    v-model:pic-id="form.mchApply.legal.frontPic"
                    :web-header="headers"
                  />
                  <van-button
                    v-if="form.mchApply.legal.frontPicUrl"
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
              :rules="[{ required: true, message: '请上传身份证反面图片' }]"
            >
              <template #input>
                <div class="readOcr">
                  <BUpload
                    v-model:pic-url="form.mchApply.legal.backPicUrl"
                    v-model:pic-id="form.mchApply.legal.backPic"
                    :web-header="headers"
                  /><van-button
                    v-if="form.mchApply.legal.backPicUrl"
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
              v-model="form.mchApply.legal.legalName"
              label-align="top"
              name="legalName"
              placeholder="请输入身份证姓名"
              label="身份证姓名"
              clearable
              :rules="[{ required: true, message: '请输入身份证姓名' }]"
            />
            <!-- 身份证号码 -->
            <van-field
              v-model="form.mchApply.legal.certNo"
              label-align="top"
              name="certNo"
              placeholder="请输入身份证号码"
              label="身份证号码"
              clearable
              :rules="[{ required: true, message: '请输入身份证号码' }]"
            />
            <!-- 身份证有效期 -->
            <van-field label="长期有效" label-align="top">
              <template #input>
                <van-switch v-model="form.mchApply.legal.periodLong" />
              </template>
            </van-field>
            <!-- 证件有效期开始日期 -->
            <BDatePicker
              v-model="form.mchApply.legal.startDate"
              name="startDate"
              label="证件开始日期"
              placeholder="请选择证件有效期开始日期"
              :rules="[{ required: true, message: '请选择证件开始时间' }]"
            />
            <!-- 证件有效期结束日期 -->
            <BDatePicker
              v-if="!form.mchApply.legal.periodLong"
              v-model="form.mchApply.legal.endDate"
              name="endDate"
              label="证件有效期结束日期"
              placeholder="请选择证件结束时间"
              :rules="[{ required: true, message: '请选择证件结束时间' }]"
            />
            <van-field
              v-model="form.mchApply.legal.address"
              autosize
              label-align="top"
              name="address"
              label="证件居住地址"
              placeholder="请输入证件居住地址"
              :rules="[{ required: true, message: '请输入证件居住地址' }]"
            />
            <!-- 联系人手机号 -->
            <van-field
              v-model="form.mchApply.legal.contactPhone"
              label-align="top"
              name="contactPhone"
              placeholder="请输入联系人手机号"
              label="联系人手机号"
              clearable
              :rules="[{ required: true, message: '请输入手机号' }]"
            />
          </van-cell-group>
          <template
            v-if="['individual', 'enterprise'].includes(form.mchApply.merchant.merchantType as string)"
          >
            <div class="commonTitle">
              营业执照信息
            </div>
            <van-cell-group inset>
              <!-- 营业执照照片 -->
              <van-field name="licensePicUrl" label="营业执照照片" label-align="top">
                <template #input>
                  <div class="readOcr">
                    <BUpload
                      v-model:pic-url="form.mchApply.license.licensePicUrl"
                      v-model:pic-id="form.mchApply.license.licensePic"
                      :web-header="headers"
                    />
                    <van-button
                      v-if="form.mchApply.license.licensePicUrl"
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
                v-model="form.mchApply.license.licenseNo"
                label-align="top"
                name="licenseNo"
                placeholder="请输入营业执照号"
                label="营业执照号"
                clearable
                :rules="[{ required: true, message: '请输入营业执照号' }]"
              />
              <!-- 营业执照名称 -->
              <van-field
                v-model="form.mchApply.license.licenseName"
                label-align="top"
                name="licenseName"
                placeholder="请输入营业执照名称"
                label="营业执照名称"
                clearable
                :rules="[{ required: true, message: '请输入营业执照名称' }]"
              />
              <b-cascader
                v-model="form.mchApply.license.licenseRegionCode"
                name="shopRegionCode"
                label="营业执照所在区县"
                placeholder="请选择营业执照所在区县"
                :rules="[{ required: true, message: '请选择营业执照所在区县' }]"
                :options="pca"
              />
              <!-- 营业执照注册地址 -->
              <van-field
                v-model="form.mchApply.license.address"
                autosize
                label-align="top"
                name="address"
                label="营业执照注册地址"
                placeholder="请输入营业执照注册地址"
                :rules="[{ required: true, message: '请输入营业执照注册地址' }]"
              />
              <!-- 营业执照有效期 -->
              <van-field label="长期有效" label-align="top">
                <template #input>
                  <van-switch v-model="form.mchApply.license.periodLong" />
                </template>
              </van-field>
              <!-- 营业执照有效期开始日期 -->
              <BDatePicker
                v-model="form.mchApply.license.startDate"
                name="startDate"
                label="营业执照开始日期"
                placeholder="请选择营业执照有效期开始日期"
                :rules="[{ required: true, message: '请选择营业执照开始时间' }]"
              />
              <!-- 营业执照有效期结束日期 -->
              <BDatePicker
                v-if="!form.mchApply.license.periodLong"
                v-model="form.mchApply.license.endDate"
                name="endDate"
                label="营业执照有效期结束日期"
                placeholder="请选择营业执照结束时间"
                :rules="[{ required: true, message: '请选择营业执照结束时间' }]"
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
              v-model="form.mchApply.shop.name"
              label-align="top"
              name="name"
              placeholder="请输入门店名称"
              label="门店名称"
              clearable
              :rules="[{ required: true, message: '请输入门店名称' }]"
            />
            <!-- 经营类目 -->
            <b-cascader
              v-model="form.mchApply.other.businessScopeCodes"
              name="businessScopeCodes"
              label="经营类目"
              placeholder="请选择经营类目"
              :rules="[{ required: true, message: '请选择经营类目' }]"
              :options="mccCodes"
            />
            <!-- 经营场所所在区县 -->
            <b-cascader
              v-model="form.mchApply.shop.shopRegionCode"
              name="shopRegionCode"
              label="经营场所所在区县"
              placeholder="请选择所在区县"
              :rules="[{ required: true, message: '请选择所在区县' }]"
              :options="pca"
            />
            <!-- 经营场所详细地址 -->
            <van-field
              v-model="form.mchApply.shop.address"
              autosize
              label-align="top"
              name="address"
              placeholder="请输入经营场所详细地址"
              label="经营场所详细地址"
              clearable
              :rules="[{ required: true, message: '请输入经营场所详细地址' }]"
            />
            <!-- 门头照 -->
            <van-field
              name="doorPic"
              label="门头照"
              label-align="top"
              :rules="[{ required: true, message: '请上传门头照' }]"
            >
              <template #input>
                <BUpload
                  v-model:pic-url="form.mchApply.shop.doorPicUrl"
                  v-model:pic-id="form.mchApply.shop.doorPic"
                  :web-header="headers"
                />
              </template>
            </van-field>
            <!-- 店内照 -->
            <van-field
              name="insidePic"
              label="店内照"
              label-align="top"
              :rules="[{ required: true, message: '请上传店内照' }]"
            >
              <template #input>
                <BUpload
                  v-model:pic-url="form.mchApply.shop.insidePicUrl"
                  v-model:pic-id="form.mchApply.shop.insidePic"
                  :web-header="headers"
                />
              </template>
            </van-field>
            <!-- 收银台照 -->
            <van-field
              name="cashierPic"
              label="收银台照"
              label-align="top"
              :rules="[{ required: true, message: '请上传收银台照' }]"
            >
              <template #input>
                <BUpload
                  v-model:pic-url="form.mchApply.shop.cashierPicUrl"
                  v-model:pic-id="form.mchApply.shop.cashierPic"
                  :web-header="headers"
                />
              </template>
            </van-field>
          </van-cell-group>
        </template>
        <!-- 第二模块 -->
        <template v-if="currentPage.currentIndex === 3">
          <div class="commonTitle">
            结算卡信息
          </div>
          <van-cell-group inset>
            <!-- 商户类型 -->
            <van-field
              name="merchantType"
              label="账户类型"
              label-align="top"
              :rules="[{ required: true, message: '请输入结算账户类型' }]"
            >
              <template #input>
                <van-radio-group
                  v-model="form.mchApply.bankAccount.bankAccountType"
                  direction="horizontal"
                >
                  <van-radio :disabled="form.mchApply.merchant.merchantType === 'micro'" name="company_owner">
                    公户
                  </van-radio>
                  <van-radio name="person_owner">
                    对私法人
                  </van-radio>
                  <van-radio :disabled="form.mchApply.merchant.merchantType === 'micro'" name="person_not_owner">
                    对私非法人
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 银行卡正面 -->
            <van-field
              name="bankCardPicUrl" :label="
                form.mchApply.bankAccount.bankAccountType !== 'company_owner'
                  ? '银行卡正面'
                  : '开户许可证'
              " label-align="top"
              :rules="[
                {
                  required: true,
                  message: `请上传${
                    form.mchApply.bankAccount.bankAccountType !== 'company_owner'
                      ? '银行卡正面'
                      : '开户许可证'
                  }图片`,
                },
              ]"
            >
              <template #input>
                <div class="readOcr">
                  <BUpload
                    v-model:pic-url="form.mchApply.bankAccount.bankCardPicUrl"
                    v-model:pic-id="form.mchApply.bankAccount.bankCardPic"
                    :web-header="headers"
                  />
                  <van-button
                    v-if="
                      form.mchApply.bankAccount.bankCardPicUrl
                        && form.mchApply.bankAccount.bankAccountType !== 'company_owner'
                    "
                    class="readOcrBtn"
                    hairline
                    plain
                    size="small"
                    @click="bankOcr"
                  >
                    OCR识别
                  </van-button>
                </div>
              </template>
            </van-field>
            <!-- 账户类型 -->
            <van-field
              v-model="form.mchApply.bankAccount.accountType"
              is-link
              readonly
              name="accountType"
              label="账户类型"
              placeholder="请选择账户类型"
              @click="showAccountTypePicker = true"
            />
            <van-popup v-model:show="showAccountTypePicker" position="bottom">
              <van-picker
                :columns="accountTypeColumns"
                @confirm="onAccountTypeConfirm"
                @cancel="showAccountTypePicker = false"
              />
            </van-popup>
            <!-- 开户名 -->
            <van-field
              v-model="form.mchApply.bankAccount.accountName"
              label-align="top"
              name="accountName"
              placeholder="请输入开户名"
              label="开户名"
              clearable
              :rules="[{ required: true, message: '请输入开户名' }]"
            />
            <!-- 银行卡号 -->
            <van-field
              v-model="form.mchApply.bankAccount.cardNo"
              label-align="top"
              name="cardNo"
              placeholder="请输入银行卡号"
              label="银行卡号"
              clearable
              :rules="[{ required: true, message: '请输入银行卡号' }]"
            />
            <!-- 开户支行号 -->
            <van-field
              v-model="form.mchApply.bankAccount.branchNo"
              label-align="top"
              name="branchNo"
              placeholder="请输入开户支行号"
              label="开户支行号"
              clearable
              :rules="[{ required: true, message: '请输入开户支行号' }]"
            />
            <!-- 银行预留手机号 -->
            <van-field
              v-model="form.mchApply.bankAccount.phone"
              label-align="top"
              name="phone"
              placeholder="请输入银行预留手机号"
              label="银行预留手机号"
              clearable
              :rules="[{ required: true, message: '请输入银行预留手机号' }]"
            />
            <!-- 银行卡正面照 -->
            <van-field
              name="cardFrontPic"
              label="银行卡正面照"
              label-align="top"
              :rules="[{ required: true, message: '请上传银行卡正面照' }]"
            >
              <template #input>
                <BUpload
                  v-model:pic-url="form.mchApply.bankAccount.cardFrontPicUrl"
                  v-model:pic-id="form.mchApply.bankAccount.cardFrontPic"
                  :web-header="headers"
                />
              </template>
            </van-field>
            <!-- 开户银行省市 -->
            <b-cascader
              v-model="form.mchApply.other.bankRegionCode"
              name="shopRegionCode"
              label="开户银行省市"
              placeholder="请选择开户银行省市"
              :rules="[{ required: true, message: '请选择开户银行省市' }]"
              :options-level="2"
              :options="pca"
            />
            <!-- 开户银行联行号 -->
            <van-field
              v-model="form.mchApply.bankAccount.bankBranchNo"
              label-align="top"
              name="bankBranchNo"
              placeholder="请输入开户银行联行号"
              label="开户银行联行号"
              clearable
              :rules="[{ required: true, message: '请输入开户银行联行号' }]"
            />
            <!-- 开户银行网点名称 -->
            <van-field
              v-model="form.mchApply.other.bankName"
              label-align="top"
              name="bankBranchNo"
              placeholder="请输入开户银行网点名称"
              label="开户银行网点名称"
              clearable
              :rules="[{ required: form.mchApply.bankAccount.bankAccountType === 'company_owner', message: '请输入开户银行网点名称' }]"
            />
            <!-- 预留手机号 -->
            <van-field
              v-model="form.mchApply.bankAccount.bankPhone"
              label-align="top"
              name="bankBranchNo"
              placeholder="请输入持卡人预留手机号"
              label="预留手机号"
              clearable
              :rules="[
                {
                  required:
                    form.mchApply.merchant.merchantType === 'micro'
                    || ['person_owner', 'person_not_owner'].includes(
                      form.mchApply.bankAccount.bankAccountType as string,
                    ),
                  message: '请输入持卡人预留手机号',
                },
              ]"
            />
          </van-cell-group>
          <template
            v-if="['person_not_owner', 'company_not_owner'].includes(form.mchApply.bankAccount?.bankAccountType as string)"
          >
            <div class="commonTitle">
              持卡人信息
            </div>
            <van-cell-group inset>
              <!-- 持卡人身份证正面 -->
              <van-field
                name="frontPic"
                label="持卡人身份证正面"
                label-align="top"
                :rules="[{ required: true, message: '请上传持卡人身份证正面图片' }]"
              >
                <template #input>
                  <BUpload
                    v-model:pic-url="form.mchApply.cardHolder.frontPicUrl"
                    v-model:pic-id="form.mchApply.cardHolder.frontPic"
                    :web-header="headers"
                  />
                </template>
              </van-field>
              <!-- 持卡人身份证反面 -->
              <van-field
                name="backPic"
                label="持卡人身份证反面"
                label-align="top"
                :rules="[{ required: true, message: '请上传持卡人身份证反面图片' }]"
              >
                <template #input>
                  <BUpload
                    v-model:pic-url="form.mchApply.cardHolder.backPicUrl"
                    v-model:pic-id="form.mchApply.cardHolder.backPic"
                    :web-header="headers"
                  />
                </template>
              </van-field>
              <!-- 持卡人身份证有效期 -->
              <van-field label="长期有效" label-align="top">
                <template #input>
                  <van-switch v-model="form.mchApply.cardHolder.periodLong" />
                </template>
              </van-field>
              <!-- 持卡人证件有效期开始日期 -->
              <BDatePicker
                v-model="form.mchApply.cardHolder.startDate"
                name="startDate"
                label="持卡人证件开始日期"
                placeholder="请选择持卡人证件有效期开始日期"
                :rules="[{ required: true, message: '请选择持卡人证件开始时间' }]"
              />
              <!-- 持卡人证件有效期结束日期 -->
              <BDatePicker
                v-if="!form.mchApply.cardHolder.periodLong"
                v-model="form.mchApply.cardHolder.endDate"
                name="endDate"
                label="持卡人证件有效期结束日期"
                placeholder="请选择持卡人证件结束时间"
                :rules="[{ required: true, message: '请选择持卡人证件结束时间' }]"
              />
              <!-- 身份证号码 -->
              <van-field
                v-model="form.mchApply.cardHolder.idCardNo"
                label-align="top"
                name="idCardNo"
                placeholder="请输入身份证号码"
                label="身份证号码"
                clearable
                :rules="[{ required: true, message: '请输入身份证号码' }]"
              />
              <!-- 持卡人姓名 -->
              <van-field
                v-model="form.mchApply.cardHolder.name"
                label-align="top"
                name="name"
                placeholder="请输入持卡人姓名"
                label="持卡人姓名"
                clearable
                :rules="[{ required: true, message: '请输入持卡人姓名' }]"
              />
              <!-- 持卡人手机号 -->
              <van-field
                v-model="form.mchApply.cardHolder.phone"
                label-align="top"
                name="phone"
                placeholder="请输入持卡人手机号"
                label="持卡人手机号"
                clearable
                :rules="[{ required: true, message: '请输入持卡人手机号' }]"
              />
            </van-cell-group>
          </template>
        </template>
      </van-form>
    </div>
    <div class="btnContain">
      <div class="btnBox">
        <van-button v-if="currentPage.currentIndex > 1" type="primary" block @click="prevClick">
          上一步
        </van-button>
        <van-button v-if="currentPage.currentIndex < currentPage.date.length" type="primary" block @click="nextClick">
          下一步
        </van-button>
        <van-button v-if="currentPage.currentIndex === currentPage.date.length" type="primary" block @click="submitClick">
          提交
        </van-button>
      </div>
      <div class="btnBox" style="margin-bottom: 20px">
        <van-button type="primary" plain block @click="saveTemp">
          暂存
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showNotify } from 'vant'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { MccConst, MerchantApply } from './HkrtApply.api'
import { findById, findH5ById, mccTree, save, saveH5 } from './HkrtApply.api'
import type { Region } from '@/views/daxpay/h5/onboarded/common/OnbMchApply.api'
import {
  bankCardOcr,
  findAllProvinceAndCityAndArea,
  idCardOcr,
  licenseOcr,
  submit,
  submitH5,
} from '@/views/daxpay/h5/onboarded/common/OnbMchApply.api'

import BUpload from '@/components/BUpload.vue'
import type { WebHeaders } from '#/web'
import router from '@/router'

const route = useRoute()
// sign 作为H5独立访问时, 用来给数据验证访问做的安全措施
// clientCode 终端编码, 默认网关端. 嵌入时会传输对应的终端编码
// showable 是否为展示模式, 嵌入式才会生效, 此时只能看数据
const { id: applyId, sign, token, clientCode, showable } = route.query

// 请求头信息
const headers = {
  'AccessToken': token,
  // 判断是网关端/商户端/代理端
  'x-client-code': clientCode || 'dax-pay-gateway',
} as WebHeaders

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
  mchApply: {
    merchant: {},
    legal: {},
    license: {},
    shop: {},
    bankAccount: {},
    cardHolder: {},
    other: {},
  },
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
  // 终端有值说明是嵌入方式
  const promise = clientCode ? findById(applyId, headers) : findH5ById(applyId, sign, headers)
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
  uni.navigateBack()
  return
  formRef.value.validate()
    .then(() => {
      // 执行下一步操作
      currentPage.currentIndex++
    })
    .catch(() => {
      showNotify({ type: 'danger', message: '还有必填项未填写，请仔细检查！' })
    })
}

/**
 * 暂存
 */
function saveTemp() {
  loading.value = true
  // 终端有值说明是嵌入方式
  const promise = clientCode ? save(form.value, headers) : saveH5(form.value, sign, headers)
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
  formRef.value
    .validate()
    .then(async () => {
      loading.value = true
      // 暂存
      const saveRes = clientCode ? await saveH5(form.value, sign, headers) : await save(form.value, headers)
      if (saveRes.code !== 0) {
        showNotify({ type: 'danger', message: saveRes.msg })
        loading.value = false
      }
      // 提交申请
      const submitRes = clientCode ? await submitH5(form.value.applyId, sign, headers) : await submit(form.value.applyId, headers)
      if (submitRes.code !== 0) {
        showNotify({ type: 'danger', message: submitRes.data })
      }
      loading.value = false
      // 嵌入方式直接返回
      if (clientCode) {
        uni.navigateBack()
      }
      else {
        // 跳转到成功页面
        router.replace({
          name: 'SuccessResult',
          query: { title: '提交申请成功' },
        })
      }
    })
    .catch(() => {
      showNotify({ type: 'danger', message: '还有必填项未填写，请仔细检查！' })
    })
}

/**
 * 身份证正面识别
 */
function ocrIdCardFront() {
  idCardOcr(form.value.mchApply.legal.certFrontPicUrl, 'ID_CARD_FRONT', headers).then((res) => {
    if (res.code !== 0) {
      showNotify({ type: 'danger', message: res.msg })
      return
    }
    showNotify({ type: 'success', message: 'OCR识别成功' })
    const data = res.data
    form.value.mchApply.legal.legalName = data.name
    form.value.mchApply.legal.certNo = data.idNumber
    form.value.mchApply.other.legalIdAddress = data.address
  })
}

/**
 * 身份证反面识别
 */
function ocrIdCardBack() {
  idCardOcr(form.value.mchApply.legal.certBackPicUrl, 'ID_CARD_BACK', headers).then(({ code, data, msg }) => {
    if (code !== 0) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    showNotify({ type: 'success', message: 'OCR识别成功' })
    form.value.mchApply.legal.certPeriodLong = data.periodLong
    form.value.mchApply.legal.certStartDate = data.startDate
    form.value.mchApply.legal.certEndDate = data.endDate
  })
}

/**
 * 营业执照OCR
 */
function licenseInfoOcr() {
  licenseOcr(form.value.mchApply.license.licensePicUrl, headers).then(({ code, data, msg }) => {
    if (code !== 0) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    showNotify({ type: 'success', message: 'OCR识别成功' })
    form.value.mchApply.license.licenseNo = data.number
    form.value.mchApply.license.licenseName = data.name
    form.value.mchApply.license.licenseAddress = data.address
    form.value.mchApply.license.licensePeriodLong = data.periodLong
    form.value.mchApply.license.licenseStartDate = data.startDate
    form.value.mchApply.license.licenseEndDate = data.endDate
  })
}

/**
 * 银行卡OCR
 */
function bankOcr() {
  bankCardOcr(form.value.mchApply.bankAccount.bankCardPicUrl, headers).then(({ code, data, msg }) => {
    if (code !== 0) {
      showNotify({ type: 'danger', message: msg })
      return
    }
    showNotify({ type: 'success', message: 'OCR识别成功' })
    form.value.mchApply.bankAccount.bankCardNo = data.cardNumber
  })
}

const showAccountTypePicker = ref(false)
const accountTypeColumns = [
  { text: '对公账户', value: '1' },
  { text: '对私账户', value: '2' },
]

function onAccountTypeConfirm({ selectedOptions }) {
  form.value.mchApply.bankAccount.accountType = selectedOptions[0]?.value
  showAccountTypePicker.value = false
}
onMounted(() => {
  // 嵌入方式才需要判断, 判断是什么环境中
  if (client) {
    uni.getEnv((res) => {
      envType.value = res.miniprogram ? 'miniApp' : 'h5'
    })
  }
})
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
      color: #448ef7;
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
      color: #448ef7;
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
        background-color: #448ef7;
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
