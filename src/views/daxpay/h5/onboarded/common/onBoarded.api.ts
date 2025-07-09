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
 * 提交
 */
export function submit(id, headers) {
  return http.request({
    url: '/isv/mch/apply/submit',
    method: 'post',
    params: { id },
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
