import { http } from '@/utils/http/axios'
import type {MchEntity, Result} from '#/axios'
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
export function findH5ById(id, sign) {
  return http.request<Result<MerchantApply>>({
    method: 'get',
    url: '/leshua/onb/apply/h5/findById',
    params: { id, sign },
  })
}

/**
 * 保存信息(独立H5模式)
 */
export function saveH5(param: MerchantApply, sign) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/leshua/onb/apply/h5/save',
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
    url: '/leshua/onb/apply/findById',
    params: { id },
  })
}

/**
 * 保存信息(嵌入模式)
 */
export function save(param: MerchantApply) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/leshua/onb/apply/save',
    data: param,
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
export interface MerchantApply extends MchEntity {
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
  /** 经营类目代码 */
  mccCodes?: string[]
  /** 开户银行省市 */
  bankRegionCode?: string[]
  /** 开户银行网点名称 */
  bankName?: string
  /** 总店商户号 */
  totalMchNo?: string
  /** 线下渠道号 */
  reportConfigId?: number
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
