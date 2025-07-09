<template>
  <van-uploader v-model="fileList" :max-count="1" :preview-image="true" :after-read="afterRead" :before-read="beforeRead()" />
</template>

<script setup>

// 上传前回调
function beforeRead() {
  console.log('上传前')
}

// 上传后回调
function afterRead(file) {
  console.log(file)
}
</script>
