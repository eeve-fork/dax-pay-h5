import { unref } from 'vue'
import type { MchEntity } from './base'
import { http } from '@/utils/http/axios'
import type { PageResult, Result } from '#/axios'

/**
 * 获取单条
 */
export function findById(id) {
  return http.request<Result<IsvMchApply>>({
    url: '/isv/mch/apply/findById',
    method: 'get',
    params: { id: unref(id) },
  })
}

/**
 * 分页
 */
export function page(params) {
  return http.request<Result<PageResult<IsvMchApply>>>({
    url: '/isv/mch/apply/page',
    method: 'get',
    params,
  })
}

/**
 * 保存
 */
export function save(obj: IsvMchApply) {
  return http.request<Result<string>>({
    url: '/isv/mch/apply/create',
    method: 'post',
    data: obj,
  })
}

/**
 * 更新
 */
export function update(obj: IsvMchApply) {
  return http.request({
    url: '/isv/mch/apply/update',
    method: 'post',
    data: obj,
  })
}

/**
 * 提交
 */
export function submit(id) {
  return http.request({
    url: '/isv/mch/apply/submit',
    method: 'post',
    params: { id },
  })
}

/**
 * 根据通道查询进件申请类型下拉列表
 */
export function dropdownByChannel(channel) {
  return http.request({
    url: '/isv/mch/apply/type/dropdownByChannel',
    method: 'get',
    params: { channel },
  })
}

/**
 * 删除
 */
export function del(id) {
  return http.request({
    url: '/isv/mch/apply/delete',
    method: 'post',
    params: { id },
  })
}

/**
 * 同步
 */
export function syncInfo(id) {
  return http.request({
    url: '/isv/mch/apply/sync',
    method: 'post',
    params: { id },
  })
}

/**
 * 生成进件商户
 */
export function genMchInfo(param) {
  return http.request({
    url: '/isv/mch/apply/genMchInfo',
    method: 'post',
    data: param,
  })
}

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
  /** 商户类型 @see OnbMerchantTypeEnum */
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
