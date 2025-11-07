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
            <van-field
              v-model="form.legal.address"
              autosize
              label-align="top"
              name="address"
              label="证件居住地址"
              placeholder="请输入证件居住地址"
              :disabled="showable"
              :rules="[{ required: true, message: '请输入证件居住地址' }]"
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
              <van-field name="licensePicUrl" label="营业执照照片" label-align="top" :disabled="showable">
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
              <b-cascader
                v-model="form.license.regionCode"
                name="regionCode"
                label="营业执照所在区县"
                placeholder="请选择营业执照所在区县"
                :disabled="showable"
                :rules="[{ required: true, message: '请选择营业执照所在区县' }]"
                :options="pca"
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
            <!-- 营业范围 -->
            <b-cascader
              v-model="form.other.mccCodes"
              name="mccCodes"
              label="营业范围"
              placeholder="请选择营业范围"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择营业范围' }]"
              :options="mccCodes"
            />
            <!-- 经营场所所在区县 -->
            <b-cascader
              v-model="form.shop.regionCode"
              name="regionCode"
              label="经营场所所在区县"
              placeholder="请选择所在区县"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择所在区县' }]"
              :options="pca"
            />
            <!-- 经营场所详细地址 -->
            <van-field
              v-model="form.shop.address"
              autosize
              label-align="top"
              name="address"
              placeholder="请输入经营场所详细地址"
              label="经营场所详细地址"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入经营场所详细地址' }]"
            />
            <!-- 门头照 -->
            <van-field
              name="doorPicUrl"
              label="门头照"
              label-align="top"
              :disabled="showable"
              :rules="[{ required: true, message: '请上传门头照' }]"
            >
              <template #input>
                <BUpload
                  v-model:pic-url="form.shop.doorPicUrl"
                  v-model:pic-id="form.shop.doorPic"
                  :showable="showable"
                />
              </template>
            </van-field>
            <!-- 店内照 -->
            <van-field
              name="insidePicUrl"
              label="店内照"
              label-align="top"
              :disabled="showable"
              :rules="[{ required: true, message: '请上传店内照' }]"
            >
              <template #input>
                <BUpload
                  v-model:pic-url="form.shop.insidePicUrl"
                  v-model:pic-id="form.shop.insidePic"
                  :showable="showable"
                />
              </template>
            </van-field>
            <!-- 收银台照 -->
            <van-field
              name="cashierPicUrl"
              label="收银台照"
              label-align="top"
              :disabled="showable"
              :rules="[{ required: true, message: '请上传收银台照' }]"
            >
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
        <!-- 第二模块 -->
        <template v-if="currentPage.currentIndex === 3">
          <div class="commonTitle">
            结算卡信息
          </div>
          <van-cell-group inset>
            <!-- 商户类型 -->
            <van-field
              v-if="form.merchant.merchantType !== 'micro'"
              name="accountType"
              label="账户类型"
              label-align="top"
              :disabled="showable"
              :rules="[{ required: true, message: '请输入结算账户类型' }]"
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
              name="cardFrontPicUrl" :label="
                form.bankAccount.accountType !== 'company_owner'
                  ? '银行卡正面'
                  : '开户许可证'
              " label-align="top"
              :disabled="showable"
              :rules="[
                {
                  required: true,
                  message: `请上传${
                    form.bankAccount.accountType !== 'company_owner'
                      ? '银行卡正面'
                      : '开户许可证'
                  }图片`,
                },
              ]"
            >
              <template #input>
                <div class="readOcr">
                  <BUpload
                    v-model:pic-url="form.bankAccount.cardFrontPicUrl"
                    v-model:pic-id="form.bankAccount.cardFrontPic"
                    :showable="showable"
                  />
                  <van-button
                    v-if="
                      !showable && form.bankAccount.cardFrontPicUrl
                        && form.bankAccount.accountType !== 'company_owner'
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
            <!-- 银行卡账户名 -->
            <van-field
              v-model="form.bankAccount.accountName"
              label-align="top"
              name="accountName"
              placeholder="请输入银行卡账户名"
              label="银行卡账户名"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入银行卡账户名' }]"
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
            <!-- 开户银行省市 -->
            <b-cascader
              v-model="form.other.bankRegionCode"
              name="bankRegionCode"
              label="开户银行省市"
              placeholder="请选择开户银行省市"
              :disabled="showable"
              :rules="[{ required: true, message: '请选择开户银行省市' }]"
              :options-level="2"
              :options="pca"
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
            <!-- 开户银行网点名称 -->
            <van-field
              v-model="form.bankAccount.bankName"
              label-align="top"
              name="bankName"
              placeholder="请输入开户银行网点名称"
              label="开户银行网点名称"
              clearable
              :disabled="showable"
              :rules="[{ required: form.bankAccount.accountType === 'company_owner', message: '请输入开户银行网点名称' }]"
            />
            <!-- 银行预留手机号 -->
            <van-field
              v-model="form.bankAccount.bankPhone"
              label-align="top"
              name="bankPhone"
              placeholder="请输入银行预留手机号"
              label="银行预留手机号"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入银行预留手机号' }]"
            />
          </van-cell-group>
          <template
            v-if="['person_not_owner'].includes(form.bankAccount?.accountType as string)"
          >
            <div class="commonTitle">
              持卡人信息
            </div>
            <van-cell-group inset>
              <!-- 持卡人身份证正面图片 -->
              <van-field
                name="frontPicUrl"
                label="持卡人身份证正面图片"
                label-align="top"
                :disabled="showable"
                :rules="[{ required: true, message: '请上传持卡人身份证正面图片' }]"
              >
                <template #input>
                  <BUpload
                    v-model:pic-url="form.cardHolder.frontPicUrl"
                    v-model:pic-id="form.cardHolder.frontPic"
                    :showable="showable"
                  />
                </template>
              </van-field>
              <!-- 持卡人身份证反面图片 -->
              <van-field
                name="backPicUrl"
                label="持卡人身份证反面图片"
                label-align="top"
                :disabled="showable"
                :rules="[{ required: true, message: '请上传持卡人身份证反面图片' }]"
              >
                <template #input>
                  <BUpload
                    v-model:pic-url="form.cardHolder.backPicUrl"
                    v-model:pic-id="form.cardHolder.backPic"
                    :showable="showable"
                  />
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
              <!-- 法人手持结算授权合影 -->
              <van-field
                name="legaHandAuthPicUrl"
                label="法人手持结算授权合影"
                label-align="top"
                :disabled="showable"
                :rules="[{ required: true, message: '请上传法人手持结算授权合影' }]"
              >
                <template #input>
                  <BUpload
                    v-model:pic-url="form.other.legaHandAuthPicUrl"
                    v-model:pic-id="form.other.legaHandAuthPic"
                    :showable="showable"
                  />
                </template>
              </van-field>
            </van-cell-group>
          </template>
        </template>

        <!-- 费率配置模块 -->
        <template v-if="clientCode === 'dax-pay-agent' && currentPage.currentIndex === 4">
          <div class="commonTitle">
            费率配置
          </div>
          <van-cell-group inset>
            <!-- 微信费率 -->
            <van-field
              v-model="form.rate.wechatRate"
              label-align="top"
              name="wechatRate"
              placeholder="请输入微信费率"
              label="微信费率(%)"
              type="number"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入微信费率' }]"
              :min="agentRate.wechatRate?.mchRate || 0"
              :max="100"
              :step="0.01"
              :precision="2"
            />
            <!-- 支付宝费率 -->
            <van-field
              v-model="form.rate.alipayRate"
              label-align="top"
              name="alipayRate"
              placeholder="请输入支付宝费率"
              label="支付宝费率(%)"
              type="number"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入支付宝费率' }]"
              :min="agentRate.alipayRate?.mchRate || 0"
              :max="100"
              :step="0.01"
              :precision="2"
            />
            <!-- 银行卡借记卡费率 -->
            <van-field
              v-model="form.rate.bankDebitRate"
              label-align="top"
              name="bankDebitRate"
              placeholder="请输入银行卡借记卡费率"
              label="银行卡借记卡费率(%)"
              type="number"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入银行卡借记卡费率' }]"
              :min="agentRate.bankDebitRate?.mchRate || 0"
              :max="100"
              :step="0.01"
              :precision="2"
            />
            <!-- 银行卡贷记卡费率 -->
            <van-field
              v-model="form.rate.bankCreditRate"
              label-align="top"
              name="bankCreditRate"
              placeholder="请输入银行卡贷记卡费率"
              label="银行卡贷记卡费率(%)"
              type="number"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入银行卡贷记卡费率' }]"
              :min="agentRate.bankCreditRate?.mchRate || 0"
              :max="100"
              :step="0.01"
              :precision="2"
            />
            <!-- 银联二维码借记卡费率 -->
            <van-field
              v-model="form.rate.unionDebitRate"
              label-align="top"
              name="unionDebitRate"
              placeholder="请输入银联二维码借记卡费率"
              label="银联二维码借记卡费率(%)"
              type="number"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入银联二维码借记卡费率' }]"
              :min="agentRate.unionDebitRate?.mchRate || 0"
              :max="100"
              :step="0.01"
              :precision="2"
            />
            <!-- 银联二维码贷记卡费率 -->
            <van-field
              v-model="form.rate.unionCreditRate"
              label-align="top"
              name="unionCreditRate"
              placeholder="请输入银联二维码贷记卡费率"
              label="银联二维码贷记卡费率(%)"
              type="number"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入银联二维码贷记卡费率' }]"
              :min="agentRate.unionCreditRate?.mchRate || 0"
              :max="100"
              :step="0.01"
              :precision="2"
            />
            <!-- 银联二维码1000以下费率 -->
            <van-field
              v-model="form.rate.unionMixRate"
              label-align="top"
              name="unionMixRate"
              placeholder="请输入银联二维码1000以下费率"
              label="银联二维码1000以下费率(%)"
              type="number"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入银联二维码1000以下费率' }]"
              :min="agentRate.unionMixRate?.mchRate || 0"
              :max="100"
              :step="0.01"
              :precision="2"
            />
            <!-- 银行卡借记卡封顶手续费 -->
            <van-field
              v-model="form.rate.bankDebitMax"
              label-align="top"
              name="bankDebitMax"
              placeholder="请输入银行卡借记卡封顶手续费"
              label="银行卡借记卡封顶手续费(元)"
              type="number"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入银行卡借记卡封顶手续费' }]"
              :min="agentRate.bankDebitMax?.mchRate || 0"
              :max="100"
              :step="0.01"
              :precision="2"
            />
            <!-- 银联二维码借记卡封顶手续费 -->
            <van-field
              v-model="form.rate.unionDebitMax"
              label-align="top"
              name="unionDebitMax"
              placeholder="请输入银联二维码借记卡封顶手续费"
              label="银联二维码借记卡封顶手续费(元)"
              type="number"
              clearable
              :disabled="showable"
              :rules="[{ required: true, message: '请输入银联二维码借记卡封顶手续费' }]"
              :min="agentRate.unionDebitMax?.mchRate || 0"
              :max="100"
              :step="0.01"
              :precision="2"
            />
          </van-cell-group>
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
        <van-button type="primary" plain block :disabled="showable" @click="saveTemp">
          暂存
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showConfirmDialog, showDialog, showNotify } from 'vant'
import { useRoute } from 'vue-router'
import { computed, onMounted, reactive, ref } from 'vue'
import type { AgentPermConfig, HkrtRateConfig, MccConst, MerchantApply } from './HkrtApply.api'
import { findById, findH5ById, getAgentPermConfig, getConfig, mccTree, save, saveH5 } from './HkrtApply.api'
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
// sign 作为H5独立访问时, 用来给数据验证访问做的安全措施
// clientCode 终端编码, 默认网关端. 嵌入时会传输对应的终端编码
// show 是否为展示模式, 嵌入式才会生效, 此时只能看数据
const { id: applyId, sign, token, clientCode, show } = route.query

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
    // 只有当clientCode为dax-pay-agent时才显示费率配置步骤
    ...(clientCode === 'dax-pay-agent'
      ? [{
          index: 4,
          title: '费率配置',
        }]
      : []),
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

// 代理商权限配置
const agentPerm = ref<AgentPermConfig>({})

// 代理商费率配置
const agentRate = ref<HkrtRateConfig>({
  wechatRate: {},
  alipayRate: {},
  bankDebitRate: {},
  bankCreditRate: {},
  unionDebitRate: {},
  unionCreditRate: {},
  unionMixRate: {},
  bankDebitMax: {},
  unionDebitMax: {},
})

// 表单数据对象
const form = ref<MerchantApply>({
  merchant: {},
  legal: {},
  license: {},
  shop: {},
  bankAccount: {},
  cardHolder: {},
  other: {},
  settle: {},
  rate: {},
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

  // 获取权限配置和费率配置
  Promise.all([
    getAgentPermConfig(),
    getConfig(),
  ]).then(([permRes, rateRes]) => {
    agentPerm.value = permRes.data
    agentRate.value = rateRes.data
  }).catch(() => {
    showNotify({ type: 'danger', message: '获取权限或费率配置失败' })
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
  })
}

/**
 * 点击上一步
 */
function prevClick() {
  // 如果当前是第4步且clientCode不是dax-pay-agent，则回到第3步
  if (currentPage.currentIndex === 4 && clientCode !== 'dax-pay-agent') {
    currentPage.currentIndex = 3
    return
  }

  // 其他情况，正常回到上一步
  if (currentPage.currentIndex > 1) {
    currentPage.currentIndex--
  }
}

/**
 * 点击下一步进行校验
 */
function nextClick() {
  // 如果是查看模式，直接跳转到下一步，不进行表单验证
  if (showable.value) {
    // 如果是最后一步，不执行任何操作
    if (currentPage.currentIndex >= currentPage.date.length) {
      return
    }
    currentPage.currentIndex++
    return
  }

  // 表单验证
  formRef.value.validate()
    .then(() => {
      // 如果是最后一步，则提交
      if (currentPage.currentIndex >= currentPage.date.length) {
        submitClick()
        return
      }

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
    form.value.legal.address = data.address
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
function bankOcr() {
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
