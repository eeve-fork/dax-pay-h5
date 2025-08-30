import { http } from '@/utils/http/axios'
import type { Result } from '#/axios'
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
 * 提交进件申请
 */
export function submit(id, sign, headers) {
  return http.request({
    url: '/onb/mch/apply/h5/submit',
    method: 'post',
    params: { id, sign },
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
