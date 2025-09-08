import { http } from '@/utils/http/axios'
import type { Result } from '#/axios'

/**
 * 通过AuthCode获取并设置认证结果
 * @param param
 */
export function authAndGet(param: AuthCodeParam) {
  return http.request<Result<AuthResult>>({
    url: '/unipay/assist/channel/auth/auth',
    method: 'POST',
    data: param,
  })
}

/**
 * 通道认证参数
 */
export interface AuthCodeParam {
  // 通道
  channel?: string
  // 标识码/openId
  authCode?: string
  // accessToken
  accessToken?: string
  // 查询Code
  queryCode?: string
  // 认证类型
  authType?: string
  // 应用号
  appId?: string
}

/**
 * 认证结果
 */
export interface AuthResult {
  // OpenId
  openId?: string
  // 用户ID
  userId?: string
  // AccessToken
  accessToken?: string
  // 状态
  status?: string
}
