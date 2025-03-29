import type { AuthResult } from '../auth/ChannelAuth.api'
import { http } from '@/utils/http/axios'
import type { Result } from '#/axios'
import type { GatewayOrder, GatewayPayConfig } from '@/views/daxpay/cashier/Cashier.api'

/**
 * 获取聚合支付相关订单和配置信息
 */
export function getAggregateConfig(orderNo, aggregateType) {
  return http.request<Result<AggregateOrderAndConfig>>({
    url: '/unipay/gateway/getAggregateConfig',
    method: 'GET',
    params: { orderNo, aggregateType },
  })
}

/**
 * 获取收银台所需授权链接, 用于获取OpenId一类的信息
 */
export function generateAuthUrl(param: GatewayAuthUrlParam) {
  return http.request<Result<string>>({
    url: '/unipay/gateway/generateAuthUrl',
    method: 'POST',
    data: param,
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
 * 发起支付
 */
export function aggregatePay(param: AggregatePayParam) {
  return http.request<Result<PayResult>>({
    url: '/unipay/cashier/code/pay',
    method: 'POST',
    data: param,
  })
}

/**
 * 网关聚合支付订单和配置信息
 */
export interface AggregateOrderAndConfig {
  /** 订单信息 */
  order: GatewayOrder
  /** 收银台配置信息 */
  config: GatewayPayConfig
  /** 聚合支付配置信息 */
  aggregateConfig: AggregateConfig
}

/**
 * 收银台聚合配置信息
 */
export interface AggregateConfig {
  /** 支付类型 */
  aggregateType?: string
  /** 通道 */
  channel?: string
  /** 支付方式 */
  payMethod?: string
  /** 其他支付方式 */
  otherMethod?: string
  /** 自动拉起支付 */
  autoLaunch?: boolean
  /** 需要获取OpenId */
  needOpenId?: boolean
}

/**
 * 获取认证URL参数
 */
export interface GatewayAuthUrlParam {
  // 订单号
  orderNo?: string
  // 聚合支付类型
  aggregateType?: string
}

/**
 * 认证参数
 */
export interface GatewayAuthCodeParam {
  // 订单号
  orderNo?: string
  // 聚合支付类型
  aggregateType?: string
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
  aggregateType?: string
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
