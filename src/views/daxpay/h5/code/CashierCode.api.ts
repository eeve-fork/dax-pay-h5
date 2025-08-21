import { http } from '@/utils/http/axios'
import type { Result } from '#/axios'
import type { AuthResult } from '@/views/daxpay/h5/auth/ChannelAuth.api'

/**
 * 获取码牌配置
 */
export function getCashierCodeConfig(cashierCode, cashierScene) {
  return http.request<Result<GatewayCashierCodeConfig>>({
    url: '/unipay/gateway/cashier/getCodeConfig',
    method: 'GET',
    params: { cashierCode, cashierScene },
  })
}

/**
 * 获取码牌收银台所需授权链接, 用于获取OpenId一类的信息
 */
export function generateAuthUrl(cashierCode, cashierScene) {
  return http.request<Result<string>>({
    url: '/unipay/gateway/cashier/code/generateAuthUrl',
    method: 'POST',
    data: { cashierCode, cashierScene },
  })
}

/**
 * 获取授权信息
 */
export function auth(param: CashierCodeAuthParam) {
  return http.request<Result<AuthResult>>({
    url: '/unipay/gateway/cashier/code/auth',
    method: 'POST',
    data: param,
  })
}

/**
 * 发起支付
 */
export function cashierPay(param: GatewayCashierCodePayParam) {
  return http.request<Result<PayResult>>({
    url: '/unipay/gateway/cashier/code/pay',
    method: 'POST',
    data: param,
  })
}

/**
 * 码牌收银支付参数
 */
export interface GatewayCashierCodePayParam {
  // 收银码牌编码
  cashierCode?: string
  // 收银台类型
  cashierScene?: string
  // 支付金额
  amount?: number
  // 唯一标识
  openId?: string
  // 支付描述
  description?: string
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
 * 码牌配置信息
 */
export interface GatewayCashierCodeConfig {
  // 码牌名称
  name?: string
  // 是否启用
  enable?: boolean
  // 金额类型
  amountType?: string
  // 金额
  amount?: string
  // 支付通道
  channel?: string
  // 支付调起方式
  callType?: string
  // 判断是否需要获取openId
  needOpenId?: boolean
  // 备注
  remark?: string
}

/**
 * 码牌用户标识认证类
 */
export interface CashierCodeAuthParam {
  // 收银码牌编码
  cashierCode?: string
  // 支付场景
  cashierScene?: string
  // 授权码
  authCode: string
}
