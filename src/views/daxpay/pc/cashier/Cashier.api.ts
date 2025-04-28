import { http } from '@/utils/http/axios'
import type { Result } from '#/axios'

/**
 * 获取订单和收银台配置信息
 */
export function getOrderAndConfig(orderNo) {
  return http.request<Result<OrderAndConfig>>({
    url: '/unipay/gateway/getOrderAndConfig',
    method: 'GET',
    params: { orderNo, cashierType: 'pc' },
  })
}
/**
 * 发起支付
 */
export function payOrder(data: payParam) {
  return http.request<Result<payConfig>>({
    url: '/unipay/gateway/cashier/pay',
    method: 'POST',
    data,
  })
}

// 查询订单状态
export function orderStatus(orderNo) {
  return http.request<Result<boolean>>({
    url: '/unipay/gateway/findStatusByOrderNo',
    method: 'GET',
    params: { orderNo },
  })
}
// 查询订单信息
export function orderMessage(orderNo) {
  return http.request<Result<boolean>>({
    url: '/unipay/gateway/findOrderByOrderNo',
    method: 'GET',
    params: { orderNo },
  })
}
/**
 * 收银台配置
 */
export interface OrderAndConfig {
  /** 订单信息 */
  order: GatewayOrder
  /** 收银台配置信息 */
  config: GatewayPayConfig
  /** 收银台分类配置信息 */
  groupConfigs: CashierGroupConfig[]
  /** 聚合二维码 */
  aggregateUrl?: string
}

/**
 * 订单信息
 */
export interface GatewayOrder {
  /** 商户订单号 */
  bizOrderNo?: string
  /** 订单号 */
  orderNo?: string
  /** 标题 */
  title?: string
  /** 描述 */
  description?: string
  /** 金额(元) */
  amount?: number
  expiredTime?: string
}
/**
 * 聚合支付配置信息
 */
export interface GatewayPayConfig {
  /** 收银台名称 */
  name?: string
  /** PC收银台是否同时显示聚合收银码 */
  aggregateShow?: boolean
  /** h5收银台自动升级聚合支付 */
  h5AutoUpgrade?: boolean
}

/**
 * 收银台分类配置
 */
export interface CashierGroupConfig {
  /** 主键 */
  id?: string
  /** 名称 */
  name?: string
  /** 配置项列表 */
  items?: CashierConfig[]
  /** 图标 */
  icon?: string
  /** 是否推荐 */
  recommend?: boolean
}

/**
 * 收银台配置项
 */
export interface CashierConfig {
  /** 主键 */
  id?: string
  /** 发起调用的类型 */
  callType?: string
  /** 名称 */
  name?: string
  /** 支付通道 */
  channel?: string
  /** 支付方式 */
  payMethod?: string
  /** 其他支付方式 */
  otherMethod?: string
  /** 图标 */
  icon?: string
  /** 是否推荐 */
  recommend?: boolean
}

/**
 * 支付配置项参数
 */
export interface payParam {
  // 订单号
  orderNo?: string
  // 支付配置项ID
  itemId?: number
  // 唯一标识
  openId?: string
  // 付款码
  anthCode?: string
}
/**
 * 支付配置项参数返回值
 */
export interface payConfig {
  // 商户订单号
  bizOrderNo?: string
  // 订单号
  orderNo?: string
  // 支付状态
  status?: string
  // 支付参数体
  payBody?: string
}
