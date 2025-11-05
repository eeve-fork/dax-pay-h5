import { http } from '@/utils/http/axios'
import type { MchEntity, Result } from '#/axios'

/**
 * 查询主体信息
 */
export function getMainBody(mchNo: string) {
  return http.request<Result<MchMainBody>>({
    method: 'get',
    url: '/mini/agent/mch/profile/getMainBody',
    params: { mchNo },
  })
}

/**
 * 更新主体信息
 */
export function updateMainBody(params: MchMainBody) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/mini/agent/mch/profile/updateMainBody',
    data: params,
  })
}

/**
 * 查询经营场所信息
 */
export function getShopInfo(mchNo: string) {
  return http.request<Result<MchShopProfile>>({
    method: 'get',
    url: '/mini/agent/mch/profile/shop/getShopProfile',
    params: { mchNo },
  })
}

/**
 * 更新经营场所信息
 */
export function updateShopInfo(params: MchShopProfile) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/mini/agent/mch/profile/shop/update',
    data: params,
  })
}

/**
 * 查询结算信息
 */
export function getSettleInfo(mchNo: string) {
  return http.request<Result<MchSettle>>({
    method: 'get',
    url: '/mini/agent/mch/profile/getSettleInfo',
    params: { mchNo },
  })
}

/**
 * 更新结算信息
 */
export function updateSettleInfo(params: MchSettle) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/mini/agent/mch/profile/updateSettleInfo',
    data: params,
  })
}

/**
 * 提交主体认证
 */
export function applyProfileAuth(mchNo: string) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/mini/agent/mch/profile/applyProfileAuth',
    params: { mchNo },
  })
}

/**
 * 根据商户号查询商户状态信息
 */
export function getMerchantStatus(mchNo: string) {
  return http.request<Result<MerchantStatus>>({
    method: 'get',
    url: '/mini/agent/mch/profile/findMchStatus',
    params: { mchNo },
  })
}

/**
 * 查询结算卡信息
 */
export function getBankCardProfile(mchNo: string) {
  return http.request<Result<MchBankCardProfile>>({
    method: 'get',
    url: '/mini/agent/mch/profile/bankcard/getBankCardProfile',
    params: { mchNo },
  })
}

/**
 * 查询持卡人信息
 */
export function getCardHolderProfile(mchNo: string) {
  return http.request<Result<MchCardHolderProfile>>({
    method: 'get',
    url: '/mini/agent/mch/profile/cardholder/getCardHolderProfile',
    params: { mchNo },
  })
}

/**
 * 查询法人信息
 */
export function getLegalProfile(mchNo: string) {
  return http.request<Result<MchLegalProfile>>({
    method: 'get',
    url: '/mini/agent/mch/profile/legal/getLegalProfile',
    params: { mchNo },
  })
}

/**
 * 查询营业执照信息
 */
export function getLicenseProfile(mchNo: string) {
  return http.request<Result<MchLicenseProfile>>({
    method: 'get',
    url: '/mini/agent/mch/profile/license/getLicenseProfile',
    params: { mchNo },
  })
}

/**
 * 商户主体信息
 */
export interface MchMainBody extends MchEntity {
  // 基础信息
  base: MchBaseProfile
  // 法人信息
  legal: MchLegalProfile
  // 营业执照信息
  license: MchLicenseProfile
}

/**
 * 商户经营场所信息
 */
export interface MchShopProfile extends MchEntity {
  // 经营场所名称
  name?: string
  // 省市区编码
  regionCode?: string[]
  // 经营场所详细地址
  address?: string
  // 门头照
  doorPic?: string
  // 室内照
  insidePic?: string
  // 收银台照片
  cashierPic?: string
}

/**
 * 商户结算信息
 */
export interface MchSettle extends MchEntity {
  // 银行卡信息
  bankCard: MchBankCardProfile
  // 持卡人信息
  cardHolder: MchCardHolderProfile
}

/**
 * 商户基础信息
 */
export interface MchBaseProfile extends MchEntity {
  // 商户类型
  merchantType?: string
  // 商户名称
  merchantName?: string
  // 商户简称
  merchantShortName?: string
  // 认证状态
  profileAuth?: string
  // 认证失败原因
  profileAuthErrorMsg?: string
}

/**
 * 商户法人信息
 */
export interface MchLegalProfile extends MchEntity {
  // 法人姓名
  legalName?: string
  // 法人证件号
  certNo?: string
  // 联系手机号
  contactPhone?: string
  // 长期有效
  periodLong?: boolean
  // 法人证件开始日期
  startDate?: string
  // 法人证件结束日期
  endDate?: string
  // 身份证地址
  address?: string
  // 法人身份证正面照片
  frontPic?: string
  // 法人身份证反面照片
  backPic?: string
}

/**
 * 商户授权函照片
 */
export interface MchLicenseProfile extends MchEntity {
  // 营业执照号
  licenseNo?: string
  // 营业执照名称
  licenseName?: string
  // 省市区编码
  regionCode?: string[]
  // 营业执照详细地址
  address?: string
  // 营业执照长期有效
  periodLong?: boolean
  // 营业执照开始日期
  startDate?: string
  // 营业执照结束日期
  endDate?: string
  // 营业执照照片
  licensePic?: string
}

/**
 * 商户状态信息
 */
export interface MerchantStatus extends MchEntity {
  /** 商户号 */
  mchNo?: string
  /** 主体认证状态 */
  profileAuth?: string
  /** 认证错误信息 */
  profileAuthErrorMsg?: string
}

/**
 * 商户银行卡信息
 */
export interface MchBankCardProfile extends MchEntity {
  // 账户类型
  accountType?: string
  // 银行卡账户名
  accountName?: string
  // 银行卡号
  cardNo?: string
  // 银行卡开户行名称
  bankName?: string
  // 银行卡开户行联行号
  branchNo?: string
  // 银行预留手机号
  bankPhone?: string
  // 银行卡正面照片
  cardFrontPic?: string
  // 银行卡反面照片
  cardBackPic?: string
}

/**
 * 商户持卡人信息
 */
export interface MchCardHolderProfile extends MchEntity {
  // 持卡人姓名
  holderName?: string
  // 持卡人证件号
  certNo?: string
  // 身份证长期有效
  periodLong?: boolean
  // 身份证开始时间
  startDate?: string
  // 身份证结束时间
  endDate?: string
  // 持卡人身份证正面照片
  frontPic?: string
  // 持卡人身份证反面照片
  backPic?: string
  // 非法人结算授权函图片
  letterOfAuthPic?: string
}
