import { http } from '@/utils/http/axios'
import type { Result } from '#/axios'
import type {
  OnbBankAccountApply,
  OnbCardHolderApply,
  OnbLegalApply,
  OnbLicenseApply,
  OnbMerchantApply,
  OnbShopApply,
} from '@/views/daxpay/h5/onboarded/common/Base'

/**
 * 查询
 */
export function findById(id, sign, headers) {
  return http.request<Result<MerchantApply>>({
    method: 'get',
    url: '/hkrt/onb/apply/h5/findById',
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
    url: '/hkrt/onb/apply/h5/save',
    data: param,
    params: { sign },
    headers,
  })
}

/**
 * 海科经营类目树
 */
export function mccTree() {
  return http.request<Result<MccConst[]>>({
    method: 'get',
    url: '/leshua/mcc/tree',
  })
}

/**
 * 海科商户申请参数
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
  /** 营业范围代码 */
  businessScopeCodes?: string[]
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
