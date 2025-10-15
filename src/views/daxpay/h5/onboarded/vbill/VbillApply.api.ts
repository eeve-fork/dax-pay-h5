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
    url: '/vbill/onb/apply/h5/findById',
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
    url: '/vbill/onb/apply/h5/save',
    data: param,
    params: { sign },
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
  /** 经营类型 */
  operationalType?: string
  /** 线上产品类型 */
  onlineType?: string
  /** APP名称/网站网址/公众号/小程序/服务窗名称 */
  onlineName?: string
  /** 客服电话 */
  servicePhone?: string
  /** 联系人手机号 */
  contactPhone?: string
  /** 开户许可证照片 */
  openLicensePic?: string
  /** 开户许可证照片地址 */
  openLicensePicUrl?: string
  /** 对公结算说明函照片 */
  letterOfAuthPic?: string
  /** 对公结算说明函照片地址 */
  letterOfAuthPicUrl?: string
  /** 银行卡反面照片 */
  bankCardBackPic?: string
  /** 银行卡反面照片地址 */
  bankCardBackPicUrl?: string
  /** 营业范围代码 */
  businessScopeCodes?: string[]
  /** ICP许可证或公众号主体信息截图 */
  icpLicencePic?: string
  /** ICP许可证或公众号主体信息截图地址 */
  icpLicencePicUrl?: string
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
