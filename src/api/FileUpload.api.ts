import type { Result } from '#/axios'
import { http } from '@/utils/http/axios'
import type { WebHeaders } from '#/web'

/**
 * 对象存储预签名
 */
export function getUploadParams(param: FileUploadRequestParams, headers?: WebHeaders) {
  return http.request<Result<FileUploadParamsResult>>({
    url: '/file/getUploadParams',
    method: 'post',
    data: param,
    headers,
  })
}

/**
 * 保存前端直传文件信息
 */
export function saveOssFileInfo(fileInfo: UpdateFileInfo, headers?: WebHeaders) {
  return http.request<Result<UpdateFileInfo>>({
    url: '/file/saveFileInfo',
    method: 'post',
    data: fileInfo,
    headers,
  })
}

/**
 * 文件上传
 */
export function uploadFile(url, file, headers) {
  return http.request<Result<UpdateFileInfo>>({
    url,
    method: 'PUT',
    data: file,
    headers,
  })
}

/**
 * 上传文件信息
 */
export interface UpdateFileInfo {
  // id
  id?: number
  // 文件访问地址
  url?: string
  // 文件大小，单位字节
  size?: string
  // 文件名称
  filename?: string
  // 原始文件名
  originalFilename?: string
  // 基础存储路径
  basePath?: string
  // 存储路径
  path?: string
  // 文件扩展名
  ext?: string
  // MIME类型
  contentType?: string
  // 存储平台
  platform?: string
  // 缩略图访问路径
  thUrl?: string
  // 缩略图名称
  thFilename?: string
  // 缩略图大小，单位字节
  thSize?: string
  // 缩略图MIME类型
  thContentType?: string
  // 文件所属对象id
  objectId?: string
  // 文件所属对象类型，例如用户头像，评价图片
  objectType?: string
  // 文件元数据
  metadata?: string
  // 文件用户元数据
  userMetadata?: string
  // 缩略图元数据
  thMetadata?: string
  // 缩略图用户元数据
  thUserMetadata?: string
  // 附加属性
  attr?: string
  // 文件ACL
  fileAcl?: string
  // 缩略图文件ACL
  thFileAcl?: string
}

/**
 * 预签名上传参数
 */
export interface FileUploadRequestParams {
  /** 文件名称,请携带扩展名 */
  fileName?: string
  /** 文件MIME类型 */
  mediaType?: string
  /** 文件大小 */
  fileSize?: number
}

/**
 * 预签名上传参数结果
 */
export interface FileUploadParamsResult {
  /** 上传后文件名称 */
  attachName?: string
  /** 文件访问地址 */
  url?: string
  /** 文件上传请求头 */
  headers?: Map<string, string>
}
