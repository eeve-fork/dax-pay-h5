<template>
  <van-uploader v-bind="$attrs" v-model="fileList" reupload :max-count="1" :preview-image="true" :after-read="afterRead" :before-delete="delImg" />
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { showNotify } from 'vant'
import { getUploadParams, saveOssFileInfo, uploadFile } from '@/api/FileUpload.api.js'
import type { WebHeaders } from '#/web'

const { webHeader } = defineProps<{ webHeader?: WebHeaders }>()
const picUrl = defineModel<string | undefined>('picUrl')
const picId = defineModel<string | undefined>('picId')

const fileList = ref<any[]>([])

const uploadUrl = ref<string>()
const uploadHeader = ref<Map<string, string>>()
const uploadAttachName = ref<string>()

watch(() => picUrl.value, () => {
  buildFileList()
}, { immediate: true })

/**
 *  上传
 */
async function afterRead(fileObj) {
  const file = fileObj.file
  // 前端直传获取签名链接
  await getUploadParams({
    fileName: file.name,
    mediaType: file.type || '*/*',
    fileSize: file.size,
  }, webHeader)
    .then(({ data }) => {
      // 预签名形式
      uploadUrl.value = data.url
      uploadHeader.value = data.headers
      uploadAttachName.value = data.attachName
    })
    .catch(() => {
      showNotify({ type: 'danger', message: '文件上传失败' })
    })
  // 文件上传
  await uploadFile(uploadUrl.value, file, { 'Content-Type': file.type || '*/*' }).then()
  // 保存上传记录
  const url = `${uploadAttachName.value}`
  saveOssFileInfo({
    url,
    size: file.size,
    originalFilename: file.name,
    filename: uploadAttachName.value,
    contentType: file.type,
  }, webHeader)
    .then(() => {
      picUrl.value = url
      showNotify({ type: 'success', message: '文件上传成功' })
    })
    .catch(() => {
      showNotify({ type: 'danger', message: '文件上传失败' })
    })
}

/**
 * 构建文件列表
 */
function buildFileList() {
  if (picUrl.value) {
    fileList.value = [{
      status: 'done',
      url: getFileUrl(picUrl.value),
    }]
  }
  else {
    fileList.value = []
  }
}

/**
 * 获取文件预览地址
 * @param fileUrl 文件保存的名称
 */
function getFileUrl(fileUrl?: string) {
  fileUrl = fileUrl?.startsWith('/') ? fileUrl.slice(1) : fileUrl
  return `${import.meta.env.VITE_GLOB_API_URL_PREFIX}/file/download/${fileUrl}`
}

/**
 * 删除
 */
function delImg() {
  picUrl.value = undefined
  picId.value = undefined
}
</script>
