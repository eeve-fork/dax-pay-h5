import { http } from '@/utils/http/axios'
import type { Result } from '#/axios'
import type {
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
    url: '/sand/onb/apply/h5/findById',
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
    url: '/sand/onb/apply/h5/save',
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
    url: '/sand/onb/apply/findById',
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
    url: '/sand/onb/apply/save',
    data: param,
    headers,
  })
}

/**
 * 杉德经营类目树
 */
export function mccTree() {
  return http.request<Result<MccConst[]>>({
    method: 'get',
    url: '/sand/mcc/tree',
  })
}

/**
 * 杉德微信类目树
 */
export function wxMccTree() {
  return http.request<Result<MccConst[]>>({
    method: 'get',
    url: '/sand/mcc/wxTree',
  })
}

/**
 * 杉德商户经营类目树
 */
export function mchMccTree() {
  return http.request<Result<MccConst[]>>({
    method: 'get',
    url: '/sand/mcc/mchTree',
  })
}

/**
 * 杉德商户申请参数
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
  /** 其他申请信息 */
  other: SandOtherApply
}

/**
 * 杉德其他申请数据
 */
export interface SandOtherApply {
  /** 邮箱 */
  email?: string
  /** 商户经营类目编码 */
  mchMccCodes?: string[]
  /** 微信经营类目编码 */
  wxMccCodes?: string[]
  /** MCC商户类别码 */
  mccCodes?: string[]
  /** 手持身份证正面照图片 */
  handIdCardFrontPic?: string
  /** 手持身份证正面照图片路径 */
  handIdCardFrontPicUrl?: string
  /** 工商网截图 */
  busNetPic?: string
  /** 工商网截图路径 */
  busNetPicUrl?: string
  /** 小程序/公众号截图链接 */
  appScreenshotImg?: string
  /** 小程序/公众号截图链接路径 */
  appScreenshotImgUrl?: string
  /** 支付环境截图 */
  paymentsImg?: string
  /** 支付环境截图路径 */
  paymentsImgUrl?: string
  /** 支付产品编号 */
  productCode?: string
  /** 小微经营类型 */
  microBizType?: string
  /** 企业性质 */
  enterpriseNature?: string
  /** 客服电话 */
  servicePhone?: string
}

/**
 * 杉德经营类目
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
