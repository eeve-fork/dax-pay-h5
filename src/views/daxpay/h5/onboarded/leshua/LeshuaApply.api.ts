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
 * 查询
 */
export function findById(id, sign, headers) {
  return http.request<Result<MerchantApply>>({
    method: 'get',
    url: '/leshua/onb/apply/h5/findById',
    params: { id, sign },
    headers,
  })
}

/**
 * 保存信息
 */
export function save(param: MerchantApply, sign, headers) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/leshua/onb/apply/h5/save',
    data: param,
    params: { sign },
    headers,
  })
}

/**
 * 乐刷经营类目树
 */
export function mccTree() {
  return http.request<Result<MccConst[]>>({
    method: 'get',
    url: '/leshua/mcc/tree',
  })
}

/**
 * 乐刷商户申请参数
 */
export interface MerchantApply {
  /** 申请单ID */
  applyId?: string
  /** 商户申请参数 */
  mchApply: MchApply
}

/**
 * 商户申请信息
 */
export interface MchApply {
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
}

/**
 * 乐刷经营类目
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
