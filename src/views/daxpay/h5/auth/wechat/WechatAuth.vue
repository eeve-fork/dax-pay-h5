<template>
  <van-overlay v-show="show" :show="true">
    <div class="loading-wrapper" @click.stop>
      <van-loading size="24px">
        获取中...
      </van-loading>
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { showDialog } from 'vant'
import type { AuthCodeParam } from '@/views/daxpay/h5/auth/ChannelAuth.api'
import { authAndSet } from '@/views/daxpay/h5/auth/ChannelAuth.api'
import router from '@/router'

const route = useRoute()
const { appId, channel, channelAuth: isChannel, queryCode } = route.params
const show = ref(true)

onMounted(() => {
  init()
})

/**
 * 页面初始化
 */
async function init() {
  if (isChannel) {
    // 通道封装认证方式
    channelAuth()
  }
  else {
    // 通用认证方式
    commonAuth()
  }
}

/**
 * 通道认证方式
 */
function channelAuth() {
  const param = reactive<AuthCodeParam>({
    appId: appId as string,
    queryCode: queryCode as string,
    authType: 'wechat',
    channel: channel as string,
  })

  // 海科通道
  if (channel === 'hkrt_pay') {
    const { openid } = route.query
    param.authCode = openid as string
    return
  }
  // 富友通道
  if (channel === 'fuyou_pay') {
    const { openid, access_token } = route.query
    param.authCode = openid as string
    param.accessToken = access_token as string
  }
  // 杉德通道
  if (channel === 'sand_pay') {
    const { buyer_id } = route.query
    param.authCode = buyer_id as string
  }
  auth(param)
}

/**
 * 微信原生通用获取OpenId方式
 */
function commonAuth() {
  const { code } = route.query
  const param = reactive<AuthCodeParam>({
    appId: appId as string,
    queryCode: queryCode as string,
    authType: 'wechat',
    authCode: code as string,
    channel: channel as string,
  })
  auth(param)
}

/**
 * 认证
 */
function auth(param){
  authAndSet(param).then(({ code, msg }) => {
    if (code !== 0) {
      router.replace({ name: 'payFail', query: { msg, title: '获取信息失败' } })
      return
    }
    show.value = false
    showDialog({
      message: '已成功获取用户信息!',
      confirmButtonText: '关闭',
    }).then(() => {
      WeixinJSBridge.call('closeWindow')
    })
  })
}
</script>

<style scoped lang="less">
.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
