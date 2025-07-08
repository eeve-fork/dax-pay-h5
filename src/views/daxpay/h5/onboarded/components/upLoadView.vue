<template>
  <van-uploader v-model="fileList"  :max-count="1" :preview-image="true" :after-read="afterRead" :before-read="beforeRead()" />
</template>

<script setup>
// 上传文件列表
const fileList = ref([
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/sand.jpeg' },
])

// 上传前回调
function beforeRead() {
  console.log('上传前')
}

// 上传后回调
function afterRead(file) {
  console.log(file)
}
</script>
