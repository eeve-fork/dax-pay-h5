import { http } from '@/utils/http/axios'
import type { MchEntity, Result } from '#/axios'
import {MchMainBody} from "@/api/System.api";

/**
 * 提交进件申请(独立H5模式)
 */
export function submitH5(id, sign) {
  return http.request({
    url: '/onb/mch/apply/h5/submit',
    method: 'post',
    params: { id, sign },
  })
}
/**
 * 提交进件申请(嵌入模式)
 */
export function submit(id) {
  return http.request({
    url: '/onb/mch/apply/submit',
    method: 'post',
    params: { id },
  })
}
/**
 * 获取商户主体信息(嵌入)
 */
export function getMainBody(mchNo: string) {
  return http.request<Result<MchMainBody>>({
    url: '/merchant/profile/getMainBody',
    params: { mchNo },
  })
}

/**
 * 获取商户店铺信息(嵌入)
 */
export function getShopInfo(mchNo: string) {
  return http.request<Result<MchShopProfile>>({
    url: '/merchant/profile/shop/findByMchNo',
    params: { mchNo },
  })
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
