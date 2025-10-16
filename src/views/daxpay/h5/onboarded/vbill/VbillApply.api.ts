import { http } from '@/utils/http/axios'
import type { Result } from '#/axios'
import type {
  OnbBankAccountProfile,
  OnbCardHolderProfile,
  OnbLegalProfile,
  OnbLicenseProfile,
  OnbMerchantProfile,
  OnbShopProfile,
} from '@/views/daxpay/h5/onboarded/common/Base'

/**
 * 查询(独立H5模式)
 */
export function findH5ById(id, sign, headers) {
  return http.request<Result<MerchantApply>>({
    method: 'get',
    url: '/vbill/onb/apply/h5/findById',
    params: { id, sign },
    headers,
  })
}

/**
 * 保存信息(独立H5模式)
 */
export function saveH5(param: MerchantApply, sign, headers) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/vbill/onb/apply/h5/save',
    data: param,
    params: { sign },
    headers,
  })
}

/**
 * 查询(嵌入模式)
 */
export function findById(id, headers) {
  return http.request<Result<MerchantApply>>({
    method: 'get',
    url: '/vbill/onb/apply/findById',
    params: { id },
    headers,
  })
}

/**
 * 保存信息(嵌入模式)
 */
export function save(param: MerchantApply, headers) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/vbill/onb/apply/save',
    data: param,
    headers,
  })
}

/**
 * 随行付经营类目树
 */
export function mccTree() {
  return http.request<Result<MccConst[]>>({
    method: 'get',
    url: '/leshua/mcc/tree',
  })
}

/**
 * 随行付商户申请参数
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
  /** 费率配置信息 */
  rate?: RateProfile
}

/**
 * 其他申请数据
 */
export interface OtherApply {
  /** 经营类型 */
  operationalType?: string
  /** 线上产品类型 */
  onlineType?: string
  /** APP名称/网站网址/公众号/小程序/服务窗名称 */
  onlineName?: string
  /** 客服电话 */
  servicePhone?: string
  /** 开户许可证照片 */
  openLicensePic?: string
  /** 开户许可证照片地址 */
  openLicensePicUrl?: string
  /** 营业范围代码 */
  mccCodes?: string[]
  /** ICP许可证或公众号主体信息截图 */
  icpLicencePic?: string
  /** ICP许可证或公众号主体信息截图地址 */
  icpLicencePicUrl?: string
}

/**
 * 随行付商户费率配置参数
 */
export interface RateProfile {
  /** 商户申请单ID */
  applyId?: number
  /** 微信贷记卡费率 */
  wechatCreditRate?: number
  /** 微信借记卡费率 */
  wechatDebitRate?: number
  /** 微信借记卡封顶手续费 */
  wechatDebitMaxFee?: number
  /** 支付宝贷记卡费率 */
  alipayCreditRate?: number
  /** 支付宝借记卡费率 */
  alipayDebitRate?: number
  /** 支付宝借记卡封顶手续费 */
  alipayDebitMaxFee?: number
  /** 银联单笔小于1000贷记卡费率 */
  unionCreditMinRate?: number
  /** 银联单笔小于1000借记卡费率 */
  unionDebitMinRate?: number
  /** 银联单笔大于1000贷记卡费率 */
  unionCreditMaxRate?: number
  /** 银联单笔大于1000借记卡费率 */
  unionDebitMaxRate?: number
  /** 贷记卡费率 */
  creditRate?: number
  /** 借记卡费率 */
  cardDebitRate?: number
  /** 借记卡手续费封顶值 */
  cardDebitCap?: number
  /** 手机闪付贷记卡费率 */
  quickCreditRate?: number
  /** 手机闪付借记卡费率 */
  quickDebitRate?: number
}

/**
 * 随行付经营类目
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
