import { http } from '@/utils/http/axios'
import type { Result } from '#/axios'
import type {
  OnbBankAccountApply,
  OnbCardHolderApply,
  OnbLegalApply,
  OnbLicenseApply,
  OnbMerchantApply,
  OnbShopApply,
} from '@/views/daxpay/h5/onboarded/common/base'

/**
 * 查询
 */
export function findById(id, headers) {
  return http.request<Result<MerchantApply>>({
    method: 'get',
    url: '/leshua/mch/apply/findById',
    params: { id },
    headers,
  })
}

/**
 * 保存
 */
export function save(param: MerchantApply, headers) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/leshua/mch/apply/save',
    data: param,
    headers,
  })
}

/**
 * 提交申请
 */
export function submit(id, headers){
  return http.request<Result<void>>({
    method: 'post',
    url: '/leshua/mch/apply/save',
    data: param,
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
  merchant: OnbMerchantApply
  /** 法人信息 */
  legal: OnbLegalApply
  /** 商户资质图片信息 */
  license: OnbLicenseApply
  /** 经营场所名称 */
  shop: OnbShopApply
  /** 结算卡信息 */
  bankAccount: OnbBankAccountApply
  /** 持卡人信息 */
  cardHolder: OnbCardHolderApply
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
