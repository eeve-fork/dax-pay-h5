<template>
  <div v-if="orderAndConfig" class="cashier">
    <div class="cash_topBox">
      <div class="payPrice">
        <span class="unit">￥</span>
        <div class="price">
          {{ orderAndConfig.order.amount }} 元
        </div>
      </div>
      <div class="excessTime">
        <span class="exTitle">剩余支付时间</span>
        <span class="number">{{ orderTime.currentMinute }}</span>
        <span class="point">:</span>
        <span class="number">{{ orderTime.currentSeconds }}</span>
      </div>
      <div class="payMessItem">
        <div class="itemTitle">
          标题:
        </div>
        <div class="itemContent">
          {{ orderAndConfig.order.title }}
        </div>
      </div>
      <div class="payMessItem">
        <div class="itemTitle">
          订单编号:
        </div>
        <div class="itemContent">
          {{ orderAndConfig.order.orderNo }}
        </div>
      </div>
    </div>
    <div class="cash_bodyBox">
      <h2>请选择支付方式</h2>
      <div class="payGoupList">
        <div
          v-for="item in orderAndConfig.groupConfigs[0].items" :key="item.id" class="payMethodsItem"
          @click="payTypeClick(item)"
        >
          <div class="itemType">
            <img v-if="item.icon === 'wechat'" src="@/assets/images/wechat.png" alt="">
            <img v-if="item.icon === 'alipay'" src="@/assets/images/alipay.png" alt="">
            <img v-if="item.icon === 'aggregate'" src="@/assets/images/aggregate.png" alt="">
            <!-- <img src="@/assets/images/quick_pay.png" alt=""> -->
            <p>{{ item.name }}</p>
            <span v-if="item.recommend"> 推荐</span>
          </div>
          <div class="selectBox">
            <img v-if="item.id === selectId" src="@/assets/images/selected-arrow-icon.png" alt="">
          </div>
        </div>
      </div>
      <div v-if="selectId" class="payBtnBox" @click="payClick">
        支付￥<span>{{ orderAndConfig.order.amount }}</span>
      </div>
      <div v-else class="payBtnBox noSelect">
        支付￥<span>{{ orderAndConfig.order.amount }}</span>
      </div>
    </div>
    <!-- loading -->
    <div v-if="loading" id="loadingMask" class="loadingMask hide">
      <div class="content">
        <img class="loadingImg" src="@/assets/images/loading.png" alt="">
        <div class="loadingTxt">
          处理中，请耐心等待
        </div>
      </div>
    </div>
    <!-- 取消支付 -->
    <div v-if="cancelObj.showCancelMask" id="cancelPay" class="cancelMask">
      <div class="confirmDialog">
        <div class="confirmHeader">
          确定离开收银台
        </div>
        <div class="confimContent">
          <p class="contentTxt">
            订单尚未完成支付，请尽快支付。
          </p>
        </div>
        <div class="confimFooter">
          <div id="confirmLeaveBtn" class="confimBtn" @click="cancelObj.handleConfirmLeave">
            确认离开
          </div>
          <div id="continuePay" class="confimBtn payBtn" style="color: #E41937" @click="cancelObj.handleContinuePay">
            继续支付
          </div>
        </div>
      </div>
    </div>
    <!-- 关闭页面 -->
    <div v-if="closeObj.showCloseMask" id="cancelPay" class="cancelMask">
      <div class="confirmDialog">
        <div class="confirmHeader">
          确定关闭该页面？
        </div>
        <div class="confimContent">
          <p class="contentTxt" />
        </div>
        <div class="confimFooter">
          <div id="confirmLeaveBtn" class="confimBtn" @click="closeObj.handleConfirmClose">
            确认关闭
          </div>
          <div id="continuePay" class="confimBtn payBtn" style="color: #E41937" @click="closeObj.handleContinueClose">
            继续支付
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showFailToast } from 'vant'
import type { OrderAndConfig } from '@/views/daxpay/h5/cashier/Cashier.api'
import { getOrderAndConfig, payOrder } from '@/views/daxpay/h5/cashier/Cashier.api'
import { getBrowserUA } from '@/utils/uaUtil'
import { GatewayCallTypeEnum } from '@/enums/daxpay/DaxPayEnum'

const route = useRoute()
const router = useRouter()

// 获取传入的参数
const { orderNo } = route.params
// 储存初始化的数据
const orderAndConfig = ref<OrderAndConfig>()

// 选中的支付方式
const selectId = ref<string>()
// 选中的支付类型
const callType = ref<string>()
function payTypeClick(item) {
  selectId.value = item.id
  callType.value = item.callType
}
// 倒计时对象
const orderTime = reactive({
  totalTme: 0, // 总共时间
  currentMinute: '00', // 当前分钟
  currentSeconds: '00', // 当前秒数
  // 获取倒计时秒数
  getDownTotalTime: (expiredTime: any) => {
    const nowTime = new Date() // 获取当前时间
    const excessTime = new Date(expiredTime) // 获取失效时间
    const interval = excessTime.getTime() - nowTime.getTime() // 获取倒计时毫秒数
    if (interval > 0) {
      orderTime.totalTme = Math.floor(interval / 1000)
    }
    else {
      console.log('失效了')
    }
  },
  // 获取分秒
  getMinter: () => {
    orderTime.totalTme--
    orderTime.currentMinute = orderTime.formatTime(Math.floor(orderTime.totalTme / 60))
    orderTime.currentSeconds = orderTime.formatTime(Math.floor(orderTime.totalTme % 60))
  },
  // 格式化时间
  formatTime: (time: number) => {
    return time.toString().padStart(2, '0')
  },
})

// 定时器
const { pause, resume } = useIntervalFn(() => {
  orderTime.getMinter() // 每秒获取分秒方法
}, 1000)

// 监听倒计时，到时间跳转超时页面
watch(
  () => orderTime.totalTme,
  (newValue) => {
    // eslint-disable-next-line eqeqeq
    if (newValue == 0) {
      router.replace('/PayFail')
    }
  },
)
// 控制加载弹窗
const loading = ref(false)

// 发起支付
function payClick() {
  if (callType.value === GatewayCallTypeEnum.link) {
    loading.value = true
    const form = {
      orderNo,
      itemId: selectId.value,
    }
    payOrder(form as any)
      .then(({ data, code, msg }) => {
        if (code !== 0) {
          router.replace({ name: 'payFail', query: { msg } })
          return
        }
        loading.value = false
        location.replace(data.payBody as string)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  else {
    showFailToast('暂不支持！')
  }
}

// 返回弹窗对象
const cancelObj = reactive({
  // 控制弹窗
  showCancelMask: false,
  // 处理确认离开
  handleConfirmLeave: () => {
    cancelObj.showCancelMask = false // 隐藏弹窗
    router.go(-1) // 返回上一页
  },
  // 处理继续支付
  handleContinuePay: () => {
    cancelObj.showCancelMask = false // 隐藏弹窗
    history.pushState(null, '', location.href) // 阻止返回行为
  },
  // 监听事件处理
  handlePopstate: () => {
    cancelObj.showCancelMask = true // 显示取消支付弹窗
  },
})

// 关闭弹窗对象
const closeObj = reactive({
  // 控制弹窗
  showCloseMask: false,
  // 处理确认关闭
  handleConfirmClose: () => {
    closeObj.showCloseMask = false // 隐藏弹窗
    // 尝试关闭页面
    try {
      window.close() // 尝试关闭当前页面
    }
    catch {
      // eslint-disable-next-line no-alert
      alert('无法关闭页面，请手动关闭。')
      router.replace('/')
    }
  },
  // 处理继续支付
  handleContinueClose: () => {
    closeObj.showCloseMask = false // 隐藏弹窗
    history.pushState(null, '', location.href) // 阻止返回行为
  },
  // 监听关闭事件处理
  handleBeforeUnload: (event: BeforeUnloadEvent) => {
    event.preventDefault()
    closeObj.showCloseMask = true
  },

})

onMounted(() => {
  init()
  // 初始化历史记录栈
  history.pushState({ page: 'cashier' }, '', location.href)
  // 监听点击浏览器返回
  window.addEventListener('popstate', cancelObj.handlePopstate)
  window.addEventListener('beforeunload', closeObj.handleBeforeUnload)
})
onUnmounted(() => {
  pause()
  window.removeEventListener('popstate', cancelObj.handlePopstate)
  window.removeEventListener('beforeunload', closeObj.handleBeforeUnload)
})

/**
 * 初始化
 */
function init() {
  getOrderAndConfig(orderNo).then(({ data, code, msg }) => {
    if (code) {
      router.replace({ name: 'payFail', query: { msg } })
      return
    }
    //  如果自动升级聚合支付, 判断是否在对应环境中, 自动进行升级
    if (data.config.h5AutoUpgrade) {
      if (getBrowserUA() !== 'browser') {
        router.replace({ path: `/aggregate/${orderNo}`, replace: true })
        return
      }
    }
    orderAndConfig.value = data // 赋值初始化数据
    orderTime.getDownTotalTime(data.order.expiredTime) // 计算倒计时
    orderTime.getMinter() // 先执行一下 解决进入页面一秒后才显示倒计时
    resume() // 开启倒计时
  }).catch(() => {
  })
}
</script>

<style scoped lang="less">
.cashier {
  font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 1.5%;

  .cash_topBox {
    height: 30%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 1.875rem;

    .payPrice {
      margin-bottom: 1.25rem;
      display: flex;
      gap: 0.425rem;
      font-size: 2rem;

      .unit {
        transform: translateY(0.125rem) scale(1, 0.8);
      }
    }

    .excessTime {
      display: flex;
      align-items: center;
      gap: 0.3125rem;

      .exTitle {
        color: #9fa1a2;
        margin-right: 0.3125rem;
      }

      .point {
        font-weight: 700;
      }

      .number {
        display: block;
        background-color: #ffece8;
        color: #f66662;
        padding: 0.1875rem;
      }
    }

    .payMessItem {
      display: flex;
      gap: 0.5125rem;
      color: #9fa1a2;
    }
  }

  .cash_bodyBox {
    height: 68.5%;
    font-weight: 600;
    background-color: #ffffff;
    padding: 0.9375rem 1.625rem;
    position: relative;

    h2 {
      margin-bottom: 1.25rem;
    }

    .payGoupList {
      width: 100%;
      overflow: scroll;
      height: calc(100% - 6.9375rem);

      .payMethodsItem {
        height: 3.75rem;
        line-height: 3.75rem;
        text-align: center;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .itemType {
          display: flex;
          gap: 0.625rem;
          align-items: center;

          img {
            width: 1.25rem;
            height: 1.25rem;
          }

          span {
            border: 1px solid #3882c2;
            color: #3882c2;
            height: 1.8rem;
            line-height: 1.8rem;
            padding: 0px 5px;
            border-radius: 0.3125rem;
          }
        }

        .selectBox {
          width: 1.25rem;
          height: 1.25rem;
          line-height: 1.25rem;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #ccc;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .payBtnBox {
      width: 90%;
      margin: 0 auto;
      background-color: #0d6eff;
      color: #fff;
      height: 3.25rem;
      position: absolute;
      bottom: 2.75rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      line-height: 3.25rem;
      border-radius: 0.625rem;
    }

    .noSelect {
      background-color: #ccc;
    }
  }

  /* loading */
  .loadingMask {
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    border-radius: 0 0 0.2rem 0.2rem;

    .content {
      position: absolute;
      width: 15rem;
      background: #ffffff;
      border-radius: 0.2rem;
      box-shadow:
        0px 12px 48px 16px rgba(0, 0, 0, 0.03),
        0px 9px 28px 0px rgba(0, 0, 0, 0.05),
        0px 6px 16px -8px rgba(0, 0, 0, 0.08);
      display: flex;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      flex-direction: column;
      align-items: center;
    }

    .loadingImg {
      width: 1.6rem;
      height: 1.6rem;
      margin-top: 2rem;
      animation: 1.6s linear ratate infinite;
    }

    .loadingTxt {
      font-size: 1.125rem;
      color: #22242e;
      margin-top: 1.2rem;
      margin-bottom: 2rem;
    }

    @keyframes ratate {
      0% {
        transform: rotate(0deg);
      }

      40% {
        transform: rotate(144deg);
      }

      80% {
        transform: rotate(288deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }

  /* 取消支付 */
  .cancelMask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;

    .confirmDialog {
      width: 15rem;
      background: #ffffff;
      border-radius: 0.2rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .confirmHeader {
      font-size: 0.9rem;
      line-height: 1.2rem;
      color: #22242e;
      padding: 1.55rem 0.6rem 0;
    }

    .confimContent {
      width: 100%;
      font-size: 0.7rem;
      font-weight: 400;
      color: #6c6e75;
      padding: 0.55rem 1rem 1.55rem;
      display: flex;
      justify-content: center;
      text-align: justify;
    }

    .contentTxt {
      line-height: 1.05rem;
    }

    .confimFooter {
      width: 100%;
      height: 2.5rem;
      display: flex;
      align-items: center;
      border-top: 1px solid #eeeeee;
      position: relative;
    }

    .confimFooter::after {
      position: absolute;
      content: '';
      height: 100%;
      width: 1px;
      background: #eeeeee;
      left: 50%;
      top: 0;
    }

    .confimBtn {
      height: 100%;
      flex: 1;
      color: #22242e;
      text-align: center;
      font-size: 0.7rem;
      line-height: 0.95rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .payBtn {
      color: #5568d5;
    }
  }
}
</style>
