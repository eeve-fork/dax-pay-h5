<template>
  <van-overlay v-show="show" :show="true">
    <div class="loading-wrapper" @click.stop>
      <van-loading v-if="aliUserId" size="24px">
        获取中...
      </van-loading>
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { showDialog } from 'vant'
import type { AuthCodeParam } from '@/views/daxpay/h5/auth/ChannelAuth.api'
import { authAndGet } from '@/views/daxpay/h5/auth/ChannelAuth.api'
import router from '@/router'
import { useCopy } from '@/hooks/useCopy'

const script = document.createElement('script')
script.setAttribute(
  'src',
  'https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js',
)
document.head.appendChild(script)
// 脚本加载完毕后进行初始化
script.onload = () => {
  init()
}

const route = useRoute()
const { appId, channel, queryCode, aliAppId } = route.params

const show = ref(true)
const aliUserId = ref('')

const { copy } = useCopy()
/**
 * 页面初始化
 */
async function init() {
  ap.getAuthCode ({
    appId: aliAppId,
    scopes: ['auth_base'],
  }, (res) => {
    const authCode = res.authCode
    const param = ref<AuthCodeParam>({
      appId: appId as string,
      queryCode: queryCode as string,
      authType: 'alipay',
      authCode: authCode as string,
      channel: channel as string,
    })
    authAndGet(param.value).then(({ code, data, msg }) => {
      if (code !== 0) {
        router.replace({ name: 'payFail', query: { msg, title: '获取信息失败' } })
        return
      }
      show.value = false
      let title
      if (data.userId) {
        title = `已成功获取用户ID: ${data.userId}!`
      }
      else {
        title = `已成功获取用户OpenId: ${data.openId}!`
      }
      showDialog({
        message: title,
        confirmButtonText: '复制并关闭',
      }).then(() => {
        copy(data.openId)
        AlipayJSBridge.call('closeWebview')
      })
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
