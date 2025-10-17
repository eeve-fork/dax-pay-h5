import { http } from '@/utils/http/axios'
import type { MchEntity, Result } from '#/axios'
/**
 * 地区树
 */
export function findAllProvinceAndCityAndArea() {
  return http.request<Result<Region[]>>({
    url: '/china/region/findAllProvinceAndCityAndArea',
    method: 'get',
  })
}

/**
 * 提交进件申请(独立H5模式)
 */
export function submitH5(id, sign, headers) {
  return http.request({
    url: '/onb/mch/apply/h5/submit',
    method: 'post',
    params: { id, sign },
    headers,
  })
}
/**
 * 提交进件申请(嵌入模式)
 */
export function submit(id, headers) {
  return http.request({
    url: '/onb/mch/apply/submit',
    method: 'post',
    params: { id },
    headers,
  })
}

/**
 * 身份证OCR
 */
export function idCardOcr(uri, type: 'ID_CARD_FRONT' | 'ID_CARD_BACK', headers) {
  return http.request<Result<IdCardOCRResult>>({
    url: '/ocr/idCard',
    method: 'post',
    params: { uri, type },
    headers,
  })
}

/**
 * 营业执照识别
 */
export function licenseOcr(uri, headers) {
  return http.request<Result<BusinessLicenseOCRResult>>({
    url: '/ocr/businessLicense',
    method: 'post',
    params: { uri },
    headers,
  })
}

/**
 * 银行卡识别
 */
export function bankCardOcr(uri, headers) {
  return http.request<Result<BankCardOCRResult>>({
    url: '/ocr/bankCard',
    method: 'post',
    params: { uri },
    headers,
  })
}

/**
 * 获取商户主体信息(嵌入)
 */
export function getMainBody(mchNo: string, headers) {
  return http.request<Result<MchMainBody>>({
    url: '/merchant/profile/getMainBody',
    params: { mchNo },
    headers,
  })
}

/**
 * 获取商户店铺信息(嵌入)
 */
export function getShopInfo(mchNo: string, headers) {
  return http.request<Result<MchShopProfile>>({
    url: '/merchant/profile/shop/findByMchNo',
    params: { mchNo },
    headers,
  })
}

/**
 * 区域
 */
export interface Region {
  code: string
  name: string
  /** 省市区街道 */
  level: 1 | 2 | 3 | 4
  isLeaf?: boolean
  children: Region[]
}

/**
 * 身份证识别结果
 */
export interface IdCardOCRResult {
  /** 身份证号 */
  idNumber?: string
  /** 姓名 */
  name?: string
  /** 性别 */
  sex?: string
  /** 生日 */
  birthDate?: string
  /** 地址 */
  address?: string
  /** 民族 */
  nation?: string
  /** 签发机关 */
  issue?: string
  /** 有效期限 */
  expire?: string
  /** 是否长期有效 */
  periodLong?: boolean
  /** 开始时间 */
  startDate?: string
  /** 结束时间 */
  endDate?: string
}

/**
 * 营业执照识别结果
 */
export interface BusinessLicenseOCRResult {
  /** 公司名称 */
  name?: string
  /** 公司编号 */
  number?: string
  /** 注册地址 */
  address?: string
  /** 法人 */
  legalPerson?: string
  /** 是否长期有效 */
  periodLong?: boolean
  /** 营业期开始时间 */
  startDate?: string
  /** 营业期结束时间 */
  endDate?: string
  /** 公司类型 */
  companyType?: string
  /** 经营范围 */
  businessScope?: string
  /** 注册时间 */
  registeredDate?: string
  /** 证件签发时间 */
  issueDate?: string
}

/**
 * 银行卡识别结果
 */
export interface BankCardOCRResult {
  /** 银行名称 */
  bankName?: string
  /** 银行卡号 */
  cardNumber?: string
  /** 银行卡类型 */
  cardType?: string
  /** 有效期 */
  validToDate?: string
}

/**
 * 商户主体信息参数
 */
export interface MchMainBody {
  // 基础信息
  base: MchBaseProfile
  // 法人信息
  legal: MchLegalProfile
  // 营业执照信息
  license: MchLicenseProfile
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
 * 商户营业执照信息
 */
export interface MchLicenseProfile extends MchEntity {
  // 营业执照号
  licenseNo?: string
  // 营业执照名称
  licenseName?: string
  // 执照地址-省市区编码
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
 * 商户店铺信息
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
