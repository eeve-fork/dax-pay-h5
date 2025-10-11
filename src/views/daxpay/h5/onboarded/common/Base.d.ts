/**
 * 商户进件申请单
 */
export interface IsvMchApply extends MchEntity {
  // 进件通道
  channel?: string
  // 进件类型
  applyType?: string
  // 服务商
  isvNo?: string
  // 进件的商户类型
  applyMchType?: string
  // 商户号
  mchNo?: string
  // 单据名称
  name?: string
  // 表单数据
  formData?: string
  // 外部状态
  outStatus?: string
  // 状态
  status?: string
  // 错误提示
  errorMsg?: string
}

/**
 * 进件商户申请信息
 * @author xxm
 * @since 2025/6/9
 */
export interface OnbMerchantApply {
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
export interface OnbLegalApply {
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
export interface OnbLicenseApply {
  /** 营业执照号 */
  licenseNo?: string
  /** 营业执照名称 */
  licenseName?: string
  /** 执照地址-省市区编码 */
  regionCode?: string[]
  /** 营业执照详细地址 */
  address?: string
  /** 营业执照有效期类型 */
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
 * 经营场所信息
 * @author xxm
 * @since 2025/6/9
 */
export interface OnbShopApply {
  /** 经营场所名称 */
  name?: string
  /** 省市区编码 */
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
export interface OnbBankAccountApply {
  /** 账户类型 */
  accountType?: string
  /** 银行卡账户名 */
  accountName?: string
  /** 银行卡号 */
  cardNo?: string
  /** 银行卡开户行联行号 */
  branchNo?: string
  /** 银行预留手机号 */
  phone?: string
  /** 银行卡正面照片 */
  cardFrontPic?: string
  /** 银行卡正面照片路径 */
  cardFrontPicUrl?: string
}

/**
 * 持卡人信息
 * @author xxm
 * @since 2025/6/9
 */
export interface OnbCardHolderApply {
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
