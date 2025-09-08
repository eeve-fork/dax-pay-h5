import type { LocationQuery } from 'vue-router'

/**
 * 通道微信认证信息获取
 */
export function getChannelAuthResult(channel: string, query: LocationQuery): ChannelAuthResult {
  // 海科通道
  if (channel === 'hkrt_pay') {
    const { openid } = query
    return {
      openId: openid as string,
    }
  }
  // 富友通道
  if (channel === 'fuyou_pay') {
    const { openid, access_token } = query
    return {
      openId: openid as string,
      accessToken: access_token as string,
    }
  }
  // 杉德通道
  if (channel === 'sand_pay') {
    const { buyer_id } = query
    return {
      openId: buyer_id as string,
    }
  }
  return {}
}

export interface ChannelAuthResult {
  openId?: string
  accessToken?: string
}
