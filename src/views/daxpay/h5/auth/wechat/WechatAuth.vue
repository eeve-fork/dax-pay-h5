<template>
  <van-overlay v-show="show" :show="true">
    <div class="loading-wrapper" @click.stop>
      <van-loading v-if="wxOpenId" size="24px">
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
import { authAndGet } from '@/views/daxpay/h5/auth/ChannelAuth.api'
import router from '@/router'
import { getChannelAuthResult } from '@/utils/channelAuthUtil'
import { useCopy } from '@/hooks/useCopy'

const route = useRoute()
const { appId, channel, channelAuth: isChannel, queryCode } = route.params
const show = ref(true)
const wxOpenId = ref('')

const { copy } = useCopy()

onMounted(() => {
  init()
})

/**
 * 页面初始化
 */
async function init() {
  if (isChannel === '1') {
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

  // 获取回调的参数结果
  const { openId, accessToken } = getChannelAuthResult(channel as string, route.query)
  param.authCode = openId
  param.accessToken = accessToken
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
function auth(param) {
  authAndGet(param).then(({ code, data, msg }) => {
    if (code !== 0) {
      router.replace({ name: 'payFail', query: { msg, title: '获取信息失败' } })
      return
    }
    show.value = false
    showDialog({
      message: `已成功获取用户OpenId: ${data.openId}!`,
      confirmButtonText: '复制并关闭',
    }).then(() => {
      copy(data.openId)
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
