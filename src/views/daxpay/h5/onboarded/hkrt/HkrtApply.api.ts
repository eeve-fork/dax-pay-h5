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
    url: '/hkrt/onb/apply/h5/findById',
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
    url: '/hkrt/onb/apply/h5/save',
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
    url: '/hkrt/onb/apply/findById',
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
    url: '/hkrt/onb/apply/save',
    data: param,
    headers,
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
}

/**
 * 其他申请数据
 */
export interface OtherApply {
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
