import { http } from '@/utils/http/axios'
import type { MchEntity, Result } from '#/axios'

/**
 * 查询钱包
 */
export function getWallet() {
  return http.request<Result<AgentWallet>>({
    method: 'get',
    url: '/agent/wallet/get',
  })
}

/**
 * 创建提现申请
 */
export function createApply(params: AgentCashouts) {
  return http.request<Result<number>>({
    method: 'post',
    url: '/agent/cashouts/create',
    data: params,
  })
}

/**
 * 获取提现配置
 */
export function getConfig() {
  return http.request<Result<AgentCashoutsConfig>>({
    method: 'get',
    url: '/agent/cashouts/config/get',
  })
}

/**
 * 提现手续费金额计算
 */
export function calcCashoutsFee(cashoutsAmount: number) {
  return http.request<Result<AgentCashoutsConfig>>({
    method: 'get',
    url: '/agent/cashouts/calcCashoutsFee',
    params: { cashoutsAmount },
  })
}

/**
 * 提现申请分页
 */
export function pageCashouts(params: any) {
  return http.request<Result<any>>({
    method: 'get',
    url: '/agent/cashouts/page',
    params,
  })
}

/**
 * 提现申请详情
 */
export function getCashouts(id: number) {
  return http.request<Result<AgentCashouts>>({
    method: 'get',
    url: '/agent/cashouts/findById',
    params: { id },
  })
}

/**
 * 修改提现申请
 */
export function updateCashouts(params: AgentCashouts) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/agent/cashouts/update',
    data: params,
  })
}

/**
 * 关闭提现申请
 */
export function closeCashouts(id: number) {
  return http.request<Result<void>>({
    method: 'post',
    url: '/agent/cashouts/close',
    params: { id },
  })
}

/**
 * 钱包
 */
export interface AgentWallet extends MchEntity {
  /** 余额 */
  balance?: number
  /** 可用余额 */
  availableBalance?: number
  /** 冻结金额 */
  freezeBalance?: number
  /** 提现中金额 */
  withdrawBalance?: number
  /** 在途金额 */
  onWayBalance?: number
}

/**
 * 提现申请
 */
export interface AgentCashouts extends MchEntity {
  /** 申请名称 */
  name?: string
  /** 提现方式 */
  type?: string
  /** 提现金额 */
  amount?: number
  /** 到账金额 */
  arriveAmount?: number
  /** 提现手续费 */
  feeAmount?: number
  /** 收款人 */
  receiver?: string
  /** 收款方手机号 */
  receiverMobile?: string
  /** 提现备注 */
  reason?: string
  /** 申请资料 */
  applyDataUrl?: string
  /** 对公账户名称 */
  companyName?: string
  /** 对公账户号码 */
  companyAccount?: string
  /** 开户银行 */
  bankName?: string
  /** 开户行支行编码 */
  bankBranchNo?: string
  /** 状态 */
  status?: string
  /** 外部状态 */
  outStatus?: string
}

/**
 * 提现配置
 */
export interface AgentCashoutsConfig extends MchEntity {
  /** 起提金额 */
  startAmount?: number
  /** 单笔限额 */
  singleLimit?: number
  /** 每日限额 */
  dailyLimit?: number
  /** 费率 */
  feeRate?: number
  /** 固定费用 */
  fixedFee?: number
  /** 到账金额 */
  arriveAmount?: number
  /** 提现手续费 */
  feeAmount?: number
}
