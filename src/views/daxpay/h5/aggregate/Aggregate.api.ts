import type { AuthResult } from '../auth/ChannelAuth.api'
import { http } from '@/utils/http/axios'
import type { Result } from '#/axios'
import type { GatewayOrder, GatewayPayConfig } from '@/views/daxpay/h5/cashier/Cashier.api'

/**
 * 获取聚合支付相关订单和配置信息
 */
export function getQrPayConfig(orderNo, scene) {
  return http.request<Result<AggregateOrderAndConfig>>({
    url: '/unipay/gateway/getQrPayConfig',
    method: 'GET',
    params: { orderNo, scene },
  })
}

/**
 * 获取收银台所需授权链接, 用于获取OpenId一类的信息
 */
export function generateAuthUrl(orderNo, scene) {
  return http.request<Result<string>>({
    url: '/unipay/gateway/generateAuthUrl',
    method: 'POST',
    params: { orderNo, scene },
  })
}

/**
 * 获取授权信息
 */
export function auth(param: GatewayAuthCodeParam) {
  return http.request<Result<AuthResult>>({
    url: '/unipay/gateway/auth',
    method: 'POST',
    data: param,
  })
}

/**
 * 支付成功获取信息
 */
export function getSuccessOrderMessage(orderNo) {
  return http.request<Result<paySuccess>>({
    url: '/unipay/gateway/findOrderByOrderNo',
    method: 'get',
    params: { orderNo },
  })
}

/**
 * 发起支付
 */
export function aggregatePay(param: AggregatePayParam) {
  return http.request<Result<PayResult>>({
    url: '/unipay/gateway/qrPay',
    method: 'POST',
    data: param,
  })
}

/**
 * 网关聚合支付订单和配置信息
 */
export interface AggregateOrderAndConfig {
  /** 订单信息 */
  order?: GatewayOrder
  /** 收银台配置信息 */
  config?: GatewayPayConfig
  /** 自动拉起支付 */
  autoLaunch?: boolean
  /** 需要获取OpenId */
  needOpenId?: boolean
  /** 调起方式 */
  callType?: string
}

/**
 * 认证参数
 */
export interface GatewayAuthCodeParam {
  // 订单号
  orderNo?: string
  // 聚合支付类型
  scene?: string
  // 授权码
  authCode?: string
}

/**
 * 通道收银支付参数
 */
export interface AggregatePayParam {
  // 订单
  orderNo?: string
  // 聚合支付类型
  scene?: string
  // 唯一标识
  openId?: string
}

/**
 * 支付结果
 */
export interface PayResult {
  // 支付状态
  status: string
  // 支付参数体
  payBody: string
  // 商户订单号
  bizOrderNo: string
  // 订单号
  orderNo: string
}

/**
 * 微信Jsapi预支付签名返回信息
 */
export interface WxJsapiSignResult {
  // 公众号ID，由商户传入
  appId?: string
  // 时间戳，自1970年以来的秒数
  timeStamp?: string
  // 随机串
  nonceStr?: string
  // 预支付ID
  package?: string
  // 微信签名方式：
  signType?: string
  // 微信签名
  paySign?: string
}

/**
 * 支付成功返回信息
 */

export interface paySuccess {
  // 商户订单号
  bizOrderNo: string
  // 订单号
  orderNo: string
  //  标题
  title: string
  // 描述
  description: string
  // 金额
  amount: number
  // 超时时间
  expiredTime: number
}
