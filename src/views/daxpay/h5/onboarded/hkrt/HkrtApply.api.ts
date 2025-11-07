import { http } from '@/utils/http/axios'
import type { MchEntity, Result } from '#/axios'
import type {
  OnbBankAccountProfile,
  OnbCardHolderProfile,
  OnbLegalProfile,
  OnbLicenseProfile,
  OnbMerchantProfile,
  OnbShopProfile,
  TradeRateConfigItem,
} from '@/views/daxpay/h5/onboarded/common/Base'

/**
 * 查询(独立H5模式)
 */
export function findH5ById(id, sign) {
  return http.request<Result<MerchantApply>>({
    method: 'get',
    url: '/hkrt/onb/apply/h5/findById',
    params: { id, sign },
  })
}

/**
 * 保存信息(独立H5模式)
 */
export function saveH5(param: MerchantApply, sign) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/hkrt/onb/apply/h5/save',
    data: param,
    params: { sign },
  })
}

/**
 * 查询(嵌入模式)
 */
export function findById(id) {
  return http.request<Result<MerchantApply>>({
    method: 'get',
    url: '/hkrt/onb/apply/findById',
    params: { id },
  })
}

/**
 * 保存信息(嵌入模式)
 */
export function save(param: MerchantApply) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/hkrt/onb/apply/save',
    data: param,
  })
}

/**
 * 海科经营类目树
 */
export function mccTree() {
  return http.request<Result<MccConst[]>>({
    method: 'get',
    url: '/hkrt/mcc/tree',
  })
}

/**
 * 海科商户申请参数
 */
export interface MerchantApply {
  /** 申请单ID */
  applyId?: string
  /** 商户信息 */
  merchant: OnbMerchantProfile
  /** 法人信息 */
  legal: OnbLegalProfile
  /** 商户资质图片信息 */
  license: OnbLicenseProfile
  /** 经营场所名称 */
  shop: OnbShopProfile
  /** 结算卡信息 */
  bankAccount: OnbBankAccountProfile
  /** 持卡人信息 */
  cardHolder: OnbCardHolderProfile
  /** 其他申请信息 */
  other: OtherApply
  /** 结算产品信息 */
  settle: SettleProfile
  /** 费率 */
  rate: HkrtMchRateConfig
}

/**
 * 其他申请数据
 */
export interface OtherApply extends MchEntity {
  /** 联系人手机号 */
  contactPhone?: string
  /** 经营类目代码 */
  mccCodes?: string[]
  /** 开户银行省市 */
  bankRegionCode?: string[]
  /** 开户银行网点名称 */
  bankName?: string
  /** 法人手持结算授权合影 */
  legaHandAuthPic?: string
  /** 法人手持结算授权合影 */
  legaHandAuthPicUrl?: string
  /** 法人证件居住地址 */
  legalIdAddress?: string
}

/**
 * 海科经营类目
 */
export interface MccConst {
  /** 类目 */
  code: string
  /** 类目名称 */
  name: string
  /** 父类目 */
  parentCode: string
  /** 子类目 */
  children?: MccConst[]
}

/**
 * 海科融通入驻结算信息
 */
export interface SettleProfile {
  // 申请ID
  applyId?: string
  // 结算周期
  settlementCycle?: string
  // 提现费率
  withdrawalRate?: number
  // 最小提现费用
  withdrawalFeeMin?: number
  // 对公提现费率
  publicWithdrawalRate?: number
  // 对公最小提现费用
  publicWithdrawalFeeMin?: number
}

/**
 * 海科商户费率配置
 */
export interface HkrtMchRateConfig {
  // 微信费率
  wechatRate?: number
  // 支付宝费率
  alipayRate?: number
  // 银行卡借记卡费率
  bankDebitRate?: number
  // 银行卡贷记卡费率
  bankCreditRate?: number
  // 银联二维码借记卡费率
  unionDebitRate?: number
  // 银联二维码贷记卡费率
  unionCreditRate?: number
  // 银联二维码1000以下费率
  unionMixRate?: number
  // 银行卡借记卡封顶手续费
  bankDebitMax?: number
  // 银联二维码借记卡封顶手续费
  unionDebitMax?: number
}

/**
 * 代理商权限配置
 */
export interface AgentPermConfig {
  /** 是否可用代理商API接口 */
  agentApi?: boolean
  /** 是否可以查询商户订单信息(界面) */
  queryOrder?: boolean
  /** 是否可以代商户退款(界面) */
  refund?: boolean
  /** 是否可以创建商户订单(界面) */
  createOrder?: boolean
  /** 是否可以创建进件商户 */
  createOnbMch?: boolean
  /** 是否可以代商户进行交易(API) */
  tradeApi?: boolean
  /** 是否可以设置商户结算周期 */
  settleCycle?: boolean
  /** 是否可以操作商户应用 */
  setupMchApp?: boolean
  /** 是否可以查看商户应用信息 */
  mchAppInfo?: boolean
  /** 设置商户分账规则 */
  setupMchProfit?: boolean
  /** 可用通道 */
  availableChannel?: string[]
  /** 可用接口 */
  availableApi?: string[]
}

/**
 * 海科费率配置
 */
export interface HkrtRateConfig {
  // 微信费率
  wechatRate: TradeRateConfigItem
  // 支付宝费率
  alipayRate: TradeRateConfigItem
  // 银行卡借记卡费率
  bankDebitRate: TradeRateConfigItem
  // 银行卡贷记卡费率
  bankCreditRate: TradeRateConfigItem
  // 银联二维码借记卡费率
  unionDebitRate: TradeRateConfigItem
  // 银联二维码贷记卡费率
  unionCreditRate: TradeRateConfigItem
  // 银联二维码1000以下费率
  unionMixRate: TradeRateConfigItem
  // 银行卡借记卡封顶手续费
  bankDebitMax: TradeRateConfigItem
  // 银联二维码借记卡封顶手续费
  unionDebitMax: TradeRateConfigItem
}

/**
 * 查询代理商权限
 */
export function getAgentPermConfig() {
  return http.request<Result<AgentPermConfig>>({
    method: 'get',
    url: '/agent/perm/config/get',
  })
}

/**
 * 代理端获取代理费率
 */
export function getConfig() {
  return http.request<Result<HkrtRateConfig>>({
    method: 'get',
    url: '/hkrt/rate/agent/getConfig',
  })
}
