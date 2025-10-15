/**
 * 进件商户信息
 * @author xxm
 * @since 2025/6/9
 */
export interface OnbMerchantProfile {
  /** 进件申请Id */
  applyId?: number
  /** 商户类型 */
  merchantType?: string
  /** 商户全称 */
  merchantName?: string
  /** 商户简称 */
  merchantShortName?: string
}
/**
 * 进件申请法人信息
 * @author xxm
 * @since 2025/6/9
 */
export interface OnbLegalProfile {
  /** 进件申请Id */
  applyId?: number
  /** 法人姓名 */
  legalName?: string
  /** 身份证号 */
  certNo?: string
  /** 身份证有效期类型 */
  periodLong?: boolean
  /** 身份证开始时间 */
  startDate?: string
  /** 身份证结束时间 */
  endDate?: string
  /** 身份证正面照片 */
  frontPic?: string
  /** 身份证正面照片路径 */
  frontPicUrl?: string
  /** 身份证反面照片 */
  backPic?: string
  /** 身份证反面照片路径 */
  backPicUrl?: string
  /** 联系人手机号 */
  contactPhone?: string
  /** 证件居住地址 */
  address?: string
}
/**
 * 进件营业执照信息
 * @author xxm
 * @since 2025/6/9
 */
export interface OnbLicenseProfile {
  /** 进件申请Id */
  applyId?: number
  /** 营业执照号 */
  licenseNo?: string
  /** 营业执照名称 */
  licenseName?: string
  /** 执照地址-省市区编码 */
  regionCode?: string[]
  /** 营业执照详细地址 */
  address?: string
  /** 营业执照长期有效 */
  periodLong?: boolean
  /** 营业执照开始日期 */
  startDate?: string
  /** 营业执照结束日期 */
  endDate?: string
  /** 营业执照照片 */
  licensePic?: string
  /** 营业执照照片路径 */
  licensePicUrl?: string
}
/**
 * 门店信息
 * @author xxm
 * @since 2025/6/9
 */
export interface OnbShopProfile {
  /** 进件申请Id */
  applyId?: number
  /** 门店类型 */
  type?: string
  /** 结算类型 */
  settleType?: string
  /** 经营场所名称 */
  name?: string
  /** 门店地址-省市区编码 */
  regionCode?: string[]
  /** 经营场所详细地址 */
  address?: string
  /** 门头照 */
  doorPic?: string
  /** 门头照路径 */
  doorPicUrl?: string
  /** 室内照 */
  insidePic?: string
  /** 室内照路径 */
  insidePicUrl?: string
  /** 收银台照片 */
  cashierPic?: string
  /** 收银台照片路径 */
  cashierPicUrl?: string
}

/**
 * 进件结算卡信息
 * @author xxm
 * @since 2025/6/9
 */
export interface OnbBankAccountProfile {
  /** 进件申请Id */
  applyId?: number
  /** 账户类型 */
  accountType?: string
  /** 银行卡账户名 */
  accountName?: string
  /** 银行卡号 */
  cardNo?: string
  /** 银行卡开户行名称 */
  bankName?: string
  /** 银行卡开户行联行号 */
  branchNo?: string
  /** 银行预留手机号 */
  bankPhone?: string
  /** 银行卡正面照片 */
  cardFrontPic?: string
  /** 银行卡正面照片路径 */
  cardFrontPicUrl?: string
  /** 银行卡反面照片 */
  cardBackPic?: string
  /** 银行卡反面照片路径 */
  cardBackPicUrl?: string
}

/**
 * 持卡人信息
 * @author xxm
 * @since 2025/6/9
 */
export interface OnbCardHolderProfile {
  /** 进件申请Id */
  applyId?: number
  /** 持卡人姓名 */
  holderName?: string
  /** 身份证号 */
  certNo?: string
  /** 身份证有效期类型 */
  periodLong?: boolean
  /** 身份证开始时间 */
  startDate?: string
  /** 身份证结束时间 */
  endDate?: string
  /** 身份证正面照片 */
  frontPic?: string
  /** 身份证正面照片路径 */
  frontPicUrl?: string
  /** 身份证反面照片 */
  backPic?: string
  /** 身份证反面照片路径 */
  backPicUrl?: string
  /** 非法人结算授权函图片 */
  letterOfAuthPic?: string
  /** 非法人结算授权函图片路径 */
  letterOfAuthPicUrl?: string
}
