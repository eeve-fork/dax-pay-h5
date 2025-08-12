
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
  certPeriodLong?: boolean
  /** 身份证开始时间 */
  certStartDate?: string
  /** 身份证结束时间 */
  certEndDate?: string
  /** 身份证正面照片 */
  certFrontPic?: string
  /** 身份证正面照片路径 */
  certFrontPicUrl?: string
  /** 身份证反面照片 */
  certBackPic?: string
  /** 身份证反面照片路径 */
  certBackPicUrl?: string
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
  licenseRegionCode?: string[]
  /** 营业执照详细地址 */
  licenseAddress?: string
  /** 营业执照有效期类型 */
  licensePeriodLong?: boolean
  /** 营业执照开始日期 */
  licenseStartDate?: string
  /** 营业执照结束日期 */
  licenseEndDate?: string
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
  shopName?: string
  /** 省市区编码 */
  shopRegionCode?: string[]
  /** 经营场所详细地址 */
  shopAddress?: string
  /** 门头照 */
  shopDoorPic?: string
  /** 门头照路径 */
  shopDoorPicUrl?: string
  /** 室内照 */
  shopInsidePic?: string
  /** 室内照路径 */
  shopInsidePicUrl?: string
  /** 收银台照片 */
  shopCashierPic?: string
  /** 收银台照片路径 */
  shopCashierPicUrl?: string
}

/**
 * 进件结算卡信息
 * @author xxm
 * @since 2025/6/9
 */
export interface OnbBankAccountApply {
  /** 账户类型 */
  bankAccountType?: string
  /** 银行卡账户名 */
  bankAccountName?: string
  /** 银行卡号 */
  bankCardNo?: string
  /** 银行卡开户行联行号 */
  bankBranchNo?: string
  /** 银行预留手机号 */
  bankPhone?: string
  /** 银行卡正面照片 */
  bankCardPic?: string
  /** 银行卡正面照片路径 */
  bankCardPicUrl?: string
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
  certPeriodLong?: boolean
  /** 身份证开始时间 */
  certStartDate?: string
  /** 身份证结束时间 */
  certEndDate?: string
  /** 身份证正面照片 */
  certFrontPic?: string
  /** 身份证正面照片路径 */
  certFrontPicUrl?: string
  /** 身份证反面照片 */
  certBackPic?: string
  /** 身份证反面照片路径 */
  certBackPicUrl?: string
  /** 非法人结算授权函图片 */
  letterOfAuthPic?: string
  /** 非法人结算授权函图片路径 */
  letterOfAuthPicUrl?: string
}
