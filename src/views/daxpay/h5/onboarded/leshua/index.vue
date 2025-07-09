<template>
  <div class="leshuaOnBoarded">
    <!-- 步骤页 -->
    <van-overlay v-show="loading" :show="true">
      <div class="loading-wrapper" @click.stop>
        <van-loading size="24px">
          获取中...
        </van-loading>
      </div>
    </van-overlay>
    <div class="stepsBox">
      <span class="current">{{ currentObj.currentIndex }} </span>/{{ currentObj.date.length }}
      <span class="stepName"> {{ currentObj.currentTitle }}</span>
      <!-- 经营信息 结算账户 -->
    </div>
    <div class="formBox">
      <van-form ref="formRef">
        <!-- 第一模块 -->
        <template v-if="currentObj.currentIndex === 1">
          <div class="commonTitle">
            联系人信息
          </div>
          <van-cell-group inset>
            <!-- 商户类型 -->
            <van-field name="merchantType" label="商户类型：" label-align="top" required>
              <template #input>
                <van-radio-group
                  v-model="formData.mchApply.merchant.merchantType"
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
              v-model="formData.mchApply.merchant.merchantShortName"
              label-align="top"
              name="merchantShortName"
              placeholder="请输入"
              label="商户简称："
              required
              clearable
              :rules="rulesOne.merchantShortName"
            />
          </van-cell-group>
          <div class="commonTitle">
            法人信息
          </div>
          <van-cell-group inset>
            <!-- 身份证正面： -->
            <van-field name="checkboxGroup" label="身份证正面：" label-align="top" required>
              <template #input>
                <upLoadView />
              </template>
            </van-field>
            <!-- 身份证反面： -->
            <van-field name="checkboxGroup" label="身份证反面：" label-align="top" required>
              <template #input>
                <upLoadView />
              </template>
            </van-field>
            <!-- 身份证姓名 -->
            <van-field
              v-model="formData.mchApply.legal.legalName"
              label-align="top"
              name="legalName"
              placeholder="请输入"
              label="身份证姓名："
              required
              clearable
              :rules="rulesOne.legalName"
            />
            <!-- 身份证号码 -->
            <van-field
              v-model="formData.mchApply.legal.certNo"
              label-align="top"
              name="certNo"
              placeholder="请输入"
              label="身份证号码："
              required
              clearable
              :rules="rulesOne.certNo"
            />
            <!-- 身份证有效期： -->
            <van-field label="身份证有效期：" label-align="top">
              <template #input>
                <van-switch v-model="formData.mchApply.legal.certPeriodLong">
                  <template #node>
                    <div class="vSwitch">
                      {{ formData.mchApply.legal.certPeriodLong ? "长期" : "" }}
                    </div>
                  </template>
                </van-switch>
              </template>
            </van-field>
            <!-- 证件有效期开始日期 -->
            <van-field
              v-model="formData.mchApply.legal.certStartDate"
              name="certStartDate"
              label="证件有效期开始日期："
              label-align="top"
              readonly
              placeholder="请选择"
              required
              :clearable="true"
              :rules="rulesOne.certStartDate"
              @click="datePickerObj.openPickObj('certStartDate')"
            />
            <!-- 证件有效期结束日期 -->
            <van-field
              v-if="!formData.mchApply.legal.certPeriodLong"
              v-model="formData.mchApply.legal.certEndDate"
              readonly
              name="certEndDate"
              label="证件有效期结束日期："
              placeholder="请选择"
              label-align="top"
              required
              clearable
              :rules="rulesOne.certEndDate"
              @click="datePickerObj.openPickObj('certEndDate')"
            />

            <!-- 联系人手机号 -->
            <van-field
              v-model="formData.mchApply.other.contactPhone"
              label-align="top"
              name="contactPhone"
              placeholder="请输入"
              label="联系人手机号："
              required
              clearable
              :rules="rulesOne.contactPhone"
            />
          </van-cell-group>
          <template
            v-if="['individual', 'enterprise'].includes(formData.mchApply.merchant.merchantType)"
          >
            <div class="commonTitle">
              营业执照信息
            </div>
            <van-cell-group inset>
              <!-- 营业执照照片： -->
              <van-field name="licensePicUrl" label="营业执照照片：" label-align="top" required>
                <template #input>
                  <upLoadView />
                </template>
              </van-field>

              <!-- 营业执照号 -->
              <van-field
                v-model="formData.mchApply.license.licenseNo"
                label-align="top"
                name="licenseNo"
                placeholder="请输入"
                label="营业执照号："
                required
                clearable
                :rules="rulesOne.licenseNo"
              />
              <!-- 营业执照名称 -->
              <van-field
                v-model="formData.mchApply.license.licenseName"
                label-align="top"
                name="licenseName"
                placeholder="请输入"
                label="营业执照名称："
                required
                clearable
                :rules="rulesOne.licenseName"
              />
              <!-- 营业执照详细地址 -->
              <van-field
                v-model="formData.mchApply.license.licenseAddress"
                label-align="top"
                name="licenseAddress"
                placeholder="请输入"
                label="营业执照详细地址："
                required
                clearable
                :rules="rulesOne.licenseAddress"
              />
              <!-- 注册有效期： -->
              <van-field label="注册有效期：" label-align="top">
                <template #input>
                  <van-switch v-model="formData.mchApply.license.licensePeriodLong">
                    <template #node>
                      <div class="vSwitch">
                        {{ formData.mchApply.license.licensePeriodLong ? "长期" : "" }}
                      </div>
                    </template>
                  </van-switch>
                </template>
              </van-field>
              <!-- 开始日期 -->
              <van-field
                v-model="formData.mchApply.license.licenseStartDate"
                name="licenseStartDate"
                label="开始日期："
                label-align="top"
                readonly
                placeholder="请选择"
                required
                clearable
                :rules="rulesOne.licenseStartDate"
                @click="datePickerObj.openPickObj('licenseStartDate')"
              />
              <!-- 结束日期 -->
              <van-field
                v-if="!formData.mchApply.license.licensePeriodLong"
                v-model="formData.mchApply.license.licenseEndDate"
                readonly
                name="licenseEndDate"
                label="结束日期："
                placeholder="请选择"
                label-align="top"
                required
                clearable
                :rules="rulesOne.licenseEndDate"
                @click="datePickerObj.openPickObj('licenseEndDate')"
              />
            </van-cell-group>
          </template>
        </template>
        <!-- 第二模块 -->
        <template v-if="currentObj.currentIndex === 2">
          <div class="commonTitle">
            经营场所信息
          </div>
          <van-cell-group inset>
            <!-- 门店名称 -->
            <van-field
              v-model="formData.mchApply.shop.shopName"
              label-align="top"
              name="shopName"
              placeholder="请输入"
              label="门店名称："
              required
              :rules="rulesTwo.shopName"
              clearable
            />
            <!-- 经营类目 -->
            <van-field name="mccCodes" label="经营类目：" label-align="top" required>
              <template #input>
                <!-- formData.mchApply.other.mccCodes -->
                <van-field
                  v-model="mccStr"
                  is-link
                  readonly
                  name="mccCodes"
                  placeholder="请选择经营类目"
                  :rules="rulesTwo.mccCodes"
                  @click="cascaderObj.openMccBtn"
                />
              </template>
            </van-field>
            <!-- 经营场所所在区县 -->
            <van-field name="shopRegionCode" label="经营场所所在区县：" label-align="top" required>
              <template #input>
                <!-- formData.mchApply.shop.shopRegionCode -->
                <van-field
                  v-model="areaStr"
                  is-link
                  readonly
                  name="shopRegionCode"
                  :rules="rulesTwo.shopRegionCode"
                  placeholder="请选择所在地区"
                  @click="cascaderObj.openAreaBtn"
                />
              </template>
            </van-field>
            <!-- 经营场所详细地址 -->
            <van-field
              v-model="formData.mchApply.shop.shopAddress"
              label-align="top"
              name="shopAddress"
              placeholder="请输入"
              label="经营场所详细地址："
              required
              :rules="rulesTwo.shopAddress"
              clearable
            />
            <van-field name="checkboxGroup" label="商户门头图片：" label-align="top" required>
              <template #input>
                <upLoadView />
              </template>
            </van-field>
            <van-field name="checkboxGroup" label="营业场所室内照片：" label-align="top" required>
              <template #input>
                <upLoadView />
              </template>
            </van-field>
            <van-field
              name="checkboxGroup"
              label="营业场所室内照片2："
              label-align="top"
              required
            >
              <template #input>
                <upLoadView />
              </template>
            </van-field>
          </van-cell-group>
        </template>
        <!-- 第二模块 -->
        <template v-if="currentObj.currentIndex === 3">
          <div class="commonTitle">
            结算卡信息
          </div>
          <van-cell-group inset>
            <!-- 银行卡正面 -->
            <van-field name="checkboxGroup" label="银行卡正面：" label-align="top" required>
              <template #input>
                <upLoadView />
              </template>
            </van-field>
            <!-- 银行卡开户名 -->
            <van-field
              v-model="formData.mchApply.bankAccount.bankAccountName"
              label-align="top"
              name="bankAccountName"
              placeholder="请输入"
              label="银行卡开户名："
              required
              :rules="rulesThree.bankAccountName"
              clearable
            />
            <!-- 银行卡号 -->
            <van-field
              v-model="formData.mchApply.shop.bankCardNo"
              label-align="top"
              name="bankCardNo"
              placeholder="请输入"
              label="银行卡号："
              required
              clearable
              :rules="rulesThree.bankCardNo"
            />
            <!-- 开户银行联行号 -->
            <van-field
              v-model="formData.mchApply.bankAccount.bankBranchNo"
              label-align="top"
              name="bankBranchNo"
              placeholder="请输入"
              label="开户银行联行号："
              required
              clearable
              :rules="rulesThree.bankBranchNo"
            />
          </van-cell-group>
        </template>
      </van-form>
    </div>
    <div class="btnContain">
      <div class="btnBox">
        <van-button v-if="currentObj.currentIndex > 1" type="primary" block @click="prevClick">
          上一步
        </van-button>
        <van-button v-if="currentObj.currentIndex < currentObj.date.length" type="primary" block @click="nextClick">
          下一步
        </van-button>
        <van-button v-if="currentObj.currentIndex === currentObj.date.length" type="primary" block @click="submitClick">
          提交
        </van-button>
      </div>
      <div class="btnBox" style="margin-bottom: 20px">
        <van-button type="primary" plain block @click="saveTemp">
          暂存
        </van-button>
      </div>
    </div>

    <!-- 公共时间弹窗 -->
    <van-popup v-model:show="datePickerObj.showDatePicker" destroy-on-close position="bottom">
      <van-date-picker
        v-model="datePickerObj.datePickerValue"
        :columns-type="datePickerObj.columType"
        :min-date="new Date(1950, 0, 1)"
        :max-date="new Date(2099, 0, 1)"
        @cancel="datePickerObj.closePickObj"
        @confirm="datePickerObj.onConfirm"
      />
    </van-popup>
    <!-- 级联选择器 -->
    <van-popup v-model:show="cascaderObj.showDialog" round position="bottom">
      <!-- 区域 -->
      <van-cascader
        v-if="cascaderObj.status === 'area'"
        v-model="cascaderObj.areaValue"
        title="请选择经营场所所在区县"
        :field-names="cascaderObj.fieldNames"
        :options="cascaderObj.areaOptions"
        @close="cascaderObj.closeDialog"
        @finish="cascaderObj.onFinish"
      />
      <!-- 类目 -->
      <van-cascader
        v-if="cascaderObj.status === 'mcc'"
        v-model="cascaderObj.mccValue"
        title="请选择经营类目"
        :field-names="cascaderObj.fieldNames"
        :options="cascaderObj.mccOptions"
        @close="cascaderObj.closeDialog"
        @finish="cascaderObj.onFinish"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { showNotify } from 'vant'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import type { MerchantApply } from './leshua.api'
import { findById, mccTree, save } from './leshua.api'
import {
  findAllProvinceAndCityAndArea,
  submit,
} from '@/views/daxpay/h5/onboarded/common/onBoarded.api.ts'
import upLoadView from '@/components/upLoadView.vue'

const route = useRoute()
const { id: applyId, token, client } = route.query
const headers = {
  'AccessToken': token,
  'x-client-code': client,
}

// 控制当前页面数据对象
const currentObj = reactive({
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
    return currentObj.date.find(item => item.index === currentObj.currentIndex).title
  }),
})

// 表单ref对象
const formRef = ref<any>()
const loading = ref<boolean>(false)

// 表单数据对象
const formData = ref<MerchantApply>({
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
 * 格式化树装数据
 */
function formatDate(data) {
  if (!Array.isArray(data)) {
    return []
  }
  return data.map((item) => {
    const { children, ...rest } = item

    if (children && children.length > 0 && item.level < 3) {
      rest.children = formatDate(children)
    }
    return rest
  })
}

// 类目接收字段名
const mccStr = ref('')
// 地区接收字段名
const areaStr = ref('')
// 级联选择框对象
const cascaderObj = reactive({
  showDialog: false, // 弹窗
  status: '', // 标识
  fieldNames: {
    text: 'name',
    value: 'code',
    children: 'children',
  }, // 自定义名
  areaOptions: [], // 区域数据
  mccOptions: [], // 类目数据
  areaValue: '', // 区域选择器的值
  mccValue: '', // 类目选择器的值
  openMccBtn: () => {
    // 打开类目弹窗
    cascaderObj.status = 'mcc'
    cascaderObj.showDialog = true
  },
  openAreaBtn: () => {
    // 打开区域弹窗
    cascaderObj.status = 'area'
    cascaderObj.showDialog = true
  },
  closeDialog: () => {
    // 关闭弹窗
    cascaderObj.showDialog = false
    cascaderObj.status = ''
  },
  onFinish: (finish) => {
    // 选择完成事件
    if (cascaderObj.status === 'mcc') {
      // 赋值需要传参的数据
      formData.value.mchApply.other.mccCodes = finish.selectedOptions.map(item => item.code)
      // 用于表单显示
      mccStr.value = finish.selectedOptions.map(item => item.name).join('/')
    }
    if (cascaderObj.status === 'area') {
      formData.value.mchApply.shop.shopRegionCode = finish.selectedOptions.map(item => item.code) // 赋值需要传参的数据
      areaStr.value = finish.selectedOptions.map(item => item.name).join('/')
    }
    cascaderObj.showDialog = false
  },
  // 获取类目数据
  getMccData: () => {
    mccTree().then(({ data }) => {
      cascaderObj.mccOptions = formatDate(data)
    })
  },
  // 获取地区树据
  getAreaDate: () => {
    findAllProvinceAndCityAndArea().then(({ data }) => {
      cascaderObj.areaOptions = formatDate(data)
    })
  },
})

// 控制时间选择弹窗对象
const datePickerObj = reactive({
  showDatePicker: false, // 控制选择弹窗是否显示
  columType: ['year', 'month', 'day'], // 类型
  statusType: '', // 标识 储存点击的是哪个时间框
  datePickerValue: [new Date().getFullYear(), 0, 1], // 绑定的值(默认当前年月一号)
  openPickObj: (type) => {
    datePickerObj.statusType = type // 存储标识
    datePickerObj.showDatePicker = true
  },
  onConfirm: () => {
    // 确定选择
    switch (datePickerObj.statusType) {
      case 'certStartDate': // 证件有效期开始日期
        formData.value.mchApply.legal.certStartDate = datePickerObj.datePickerValue.join('-')
        break
      case 'certEndDate': // 证件有效期结束日期
        formData.value.mchApply.legal.certEndDate = datePickerObj.datePickerValue.join('-')
        break
      case 'licenseStartDate': // 营业执照开始日期
        formData.value.mchApply.license.licenseStartDate = datePickerObj.datePickerValue.join('-')
        break
      case 'licenseEndDate': // 营业执照结束日期
        formData.value.mchApply.license.licenseEndDate = datePickerObj.datePickerValue.join('-')
        break
    }
    datePickerObj.showDatePicker = false
  },
  // 关闭弹窗
  closePickObj: () => {
    datePickerObj.statusType = '' // 存储标识
    datePickerObj.showDatePicker = false
  },
})

// 校验规则第一步
const rulesOne = reactive({
  /* 联系人信息 */
  // 商户简称
  merchantShortName: [{ required: true, message: '请输入商户简称' }],
  /* 法人信息 */
  // 身份证姓名
  legalName: [{ required: true, message: '请输入身份证姓名' }],
  // 身份证号码
  certNo: [
    { required: true, message: '请输入身份证号码' },
    // {
    //   pattern: /^[1-9]\d{16}[0-9X]$/i,
    //   message: '身份证号码格式错误',
    // },
  ],
  // 开始时间
  certStartDate: [{ required: true, message: '请选择证件开始时间' }],
  // 结束时间
  certEndDate: [{ required: true, message: '请选择证件结束时间' }],
  // 手机号码
  contactPhone: [
    { required: true, message: '请输入手机号' },
    // {
    //   pattern: /^1[3-9]\d{9}$/,
    //   message: '手机号格式错误',
    // },
  ],

  /* 营业执照信息 */
  // 营业执照号
  licenseNo: [
    { required: true, message: '请输入营业执照号' },
    {
      pattern: /^\d{15}$|^\d{18}$/,
      message: '营业执照号应为15位或18位数字',
    },
  ],
  // 营业执照名称
  licenseName: [
    { required: true, message: '请输入营业执照名称' },
    {
      max: 100,
      message: '营业执照名称不能超过100个字符',
    },
  ],
  // 营业执照详细地址
  licenseAddress: [
    { required: true, message: '请输入营业执照详细地址' },
    {
      max: 200,
      message: '地址不能超过200个字符',
    },
  ],
  // 注册开始日期
  licenseStartDate: [{ required: true, message: '请选择注册开始日期' }],
  // 注册结束日期（非长期时必填）
  licenseEndDate: [{ required: true, message: '请选择注册结束日期' }],
})
// 校验规则第二步
const rulesTwo = reactive({
  // 门店名称
  shopName: [
    { required: true, message: '请输入门店名称' },
    {
      max: 200,
      message: '名称不能超过32个字符',
    },
  ],
  // 经营类目
  mccCodes: [{ required: true, message: '请选择经营类目' }],
  // 所在区县
  shopRegionCode: [{ required: true, message: '请选择所在区县' }],
  // 详细地址
  shopAddress: [
    { required: true, message: '请输入经营场所详细地址' },
    {
      max: 200,
      message: '详细地址超过32个字符',
    },
  ],
})
// 校验规则第三步
const rulesThree = reactive({
  // 银行卡开户名
  bankAccountName: [{ required: true, message: '请输入银行卡开户名' }],
  // 银行卡号
  bankCardNo: [{ required: true, message: '请输入银行卡号' }],
  // 开户银行联行号
  bankBranchNo: [
    { required: true, message: '请输入开户银行联行号' },
  ],
})

/**
 * 初始化
 */
onMounted(async () => {
  await initData()
  getInfo()
})

/**
 * 初始化数据
 */
function initData() {
  cascaderObj.getMccData() // 获取类目
  cascaderObj.getAreaDate() // 获取区域名
}

/**
 * 获取数据
 */
function getInfo() {
  findById(applyId, headers).then(({ data }) => {
    formData.value = data
    cascaderObj.mccValue = data.mchApply?.other?.mccCodes?.[2]
    cascaderObj.areaValue = data.mchApply?.shop?.shopRegionCode?.[2]
  })
}

/**
 * 筛选出验证规则
 */
function getFieldsByStep(index) {
  switch (index) {
    case 1:
      return Object.keys(rulesOne)
    case 2:
      return Object.keys(rulesTwo)
    case 3:
      return Object.keys(rulesThree)
    default:
      return []
  }
}

/**
 * 点击上一步
 */
function prevClick() {
  currentObj.currentIndex--
}

/**
 * 点击下一步进行校验
 */
function nextClick() {
  const fieldsToValidate = getFieldsByStep(currentObj.currentIndex)
  formRef.value
    .validate(fieldsToValidate)
    .then(() => {
      // 执行下一步操作
      currentObj.currentIndex++
    })
    .catch(() => {
      showNotify({ type: 'danger', message: '还有必填项未填!请仔细检查' })
    })
}

function getLabelText(selectedValue, options) {
  const labels = []
  let currentLevel = options

  for (let i = 0; i < selectedValue.length; i++) {
    const val = selectedValue[i]
    const node = currentLevel.find(item => item.id === val)
    if (!node) {
      break
    }
    labels.push(node.name)
    currentLevel = node.children || []
  }

  return labels.join(' / ')
}

/**
 * 提交
 */
function submitClick() {
  const fieldsToValidate = getFieldsByStep(currentObj.date.length) // 只验证最后一页
  formRef.value
    .validate(fieldsToValidate)
    .then(() => {
      // 执行下一步操作
      submit(formData.value.applyId, headers).then(({ code, data }) => {
        if (code !== 0) {
          showNotify({ type: 'danger', message: data })
        }
        loading.value = false
      })
    })
    .catch(() => {
      showNotify({ type: 'danger', message: '还有必填项未填!请仔细检查' })
    })
}

/**
 * 暂存
 */
function saveTemp() {
  loading.value = true
  save(formData.value, headers).then(({ code, data }) => {
    if (code !== 0) {
      showNotify({ type: 'danger', message: data })
    }
    else {
      showNotify({ type: 'success', message: '暂存成功' })
    }
    loading.value = false
  })
}
</script>

<style lang="less" scoped>
.leshuaOnBoarded {
  width: 100%;
  height: 100%;
  padding-bottom: env(safe-area-inset-bottom);

  .stepsBox {
    width: 100%;
    height: 5%;
    display: flex;
    align-items: center;
    background-color: #f7f7f7;
    padding: 0px 1.25rem;
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
    overflow: scroll;
    padding: 1.25rem 0rem;

    // 公共头部
    .commonTitle {
      height: 3.125rem;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0rem 1.25rem;
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
      padding: 0px 1.25rem;
      margin: 0.625rem 0rem;
    }
  }
}
:deep(.van-form) {
  .van-cell-group {
    &.van-cell-group--inset {
      margin: 0 !important;
    }
    .van-cell {
      .van-cell__title {
        &.van-field__label--top {
          margin-bottom: 0.625rem !important;
        }
      }
      .van-cell__value {
        // 单选
        .van-radio-group {
          .van-radio {
            .van-radio__icon {
              height: 1rem;
              width: 1rem;
              font-size: 1.125rem;
              .van-icon {
                width: 1rem;
                height: 1rem;
                line-height: 1;
              }
            }
            .van-badge__wrapper {
              &.van-icon {
                width: 1rem;
                height: 1rem;
              }
            }
          }
        }
        .van-field__body {
          input {
            border: 0.0625rem solid #f5f5f5;
            height: 3.125rem;
            padding-left: 0.625rem;
            padding-right: 2.5rem;
          }
          .van-field__clear {
            position: absolute;
            right: 0.625rem;
          }
          .van-switch {
            .van-switch__node {
              display: flex;
              justify-content: center;
              .vSwitch {
                font-size: 0.75rem;
              }
            }
          }
        }
      }
      &.van-cell--clickable {
        padding: 0rem 0rem !important;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
