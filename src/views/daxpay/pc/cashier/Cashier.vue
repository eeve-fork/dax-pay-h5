<template>
  <div class="pcPayTai">
    <van-overlay :show="loading" class-name="loadingOverlay">
      <div class="loading-wrapper" @click.stop>
        <van-loading size="24px">
          发起支付中，请稍后...
        </van-loading>
      </div>
    </van-overlay>

    <div class="pcPayBox">
      <div class="topBox">
        <img src="@/assets/images/cashierBack.png" alt="" class="topBack">
        <div class="top_main">
          <div class="excessTime">
            <span class="exTitle">剩余支付时间</span>
            <span class="number">{{ orderTime.currentMinute }}</span>
            <span class="point">:</span>
            <span class="number">{{ orderTime.currentSeconds }}</span>
          </div>
          <div class="orderTitle">
            {{ orderObj?.order.title }}
          </div>
          <div class="orderPrice">
            <span>收款金额：</span>
            <p>
              ￥ {{ orderObj?.order.amount }}
            </p>
          </div>
          <div class="orderId">
            订单编号: {{ orderObj?.order.orderNo }}
          </div>
          <div v-if=" orderObj?.order.description" class="orderId">
            订单描述: {{ orderObj?.order.description }}
          </div>
          <!-- 点击支付前的按钮 -->
          <div v-if="!codeLink" class="methodBox">
            <div
              v-for="item in orderObj?.groupConfigs"
              :key="item.id"
              class="methodItem"
              :class="{ methodItemClick: payMethObj.payClickItemId === item.id }"
              @click="payMethObj.payClick(item)"
            >
              <img :src="getImageUrl(item.icon)" alt="">
              <span>{{ item.name }}</span>
            </div>
          </div>
          <!-- 点击支付后的失效按钮 -->
          <div v-else class="methodBox">
            <div
              v-for="item in orderObj?.groupConfigs"
              :key="item.id"
              class="methodItem disable"
              :class="{ methodItemClick: payMethObj.payClickItemId === item.id }"
            >
              <img :src="getImageUrl(item.icon)" alt="">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="content">
        <!-- 聚合支付 -->
        <div v-if="isAggregateShow" class="payMethodCode">
          <div class="qrBox">
            <vue-qr :text="orderObj?.aggregateUrl" />
          </div>
          <view class="payTitleBox">
            <div class="payTitle_top">
              <img src="@/assets/images/alipay.png" mode="scaleToFill">
              <img src="@/assets/images/wechat.png" mode="scaleToFill">
              <p>请使用扫一扫进行付款</p>
            </div>
          </view>
        </div>
        <!-- 非聚合 -->
        <div v-else class="payMethodChildBox">
          <!-- 常规跳转支付 -->
          <template v-if="!codeLink">
            <div class="topbox">
              <div
                v-for="item in childRenList"
                :key="item.id"
                class="payMethodChildItem"
                :class="{ itemClick: payMethObj.itemClickObj.id === item.id }"
                @click="payMethObj.itemBtnClick(item)"
              >
                <img :src="getImageUrl(item.icon)" alt="">
                <span>{{ item.name }}</span>
              </div>
            </div>
            <button
              v-if="!payMethObj.itemClickObj.id"
              class="payClickBtn grey"
              :disabled="!payMethObj.itemClickObj.id"
              hover-class="button-hover"
            >
              立即支付
            </button>
            <button
              v-else
              class="payClickBtn"
              :disabled="!payMethObj.itemClickObj.id"
              hover-class="button-hover"
              @click="payMethObj.toPayTypeClick"
            >
              立即支付
            </button>
          </template>
          <!-- 二维码扫码支付 -->
          <div v-else class="qrCodePayBox">
            <div class="qrCode">
              <vue-qr v-if="codeLink" :text="codeLink" :size="200" />
            </div>
            <view class="payTitleBox">
              <div class="payTitle_top">
                <img src="@/assets/images/success1.png" mode="scaleToFill">
                <p>扫码支付</p>
              </div>
              <div class="payTitle_bottom">
                请尽快完成扫码支付
              </div>
            </view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import { getOrderAndConfig, orderStatus, payOrder } from '@/views/daxpay/pc/cashier/Cashier.api'
import type { CashierConfig, OrderAndConfig } from '@/views/daxpay/pc/cashier/Cashier.api'
import { GatewayCallTypeEnum } from '@/enums/daxpay/DaxPayEnum'

// 实例化路由
const route = useRoute()
const router = useRouter()
const { orderNo } = route.params
const loading = ref<boolean>(false)
// 页面信息对象
const orderObj = ref<OrderAndConfig>()
// 分组下的支付列表
const childRenList = ref<any>([])

// 动态生成图片路径
function getImageUrl(icon) {
  return new URL(`../../../../assets/images/${icon}.png`, import.meta.url).href
}

// 点击支付后非聚合支付二维码链接
const codeLink = ref<string>('')
// 判断是否含有聚合支付
const isAggregateShow = ref<boolean>(false)

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
    if (orderTime.totalTme > 0) {
      orderTime.totalTme--
      orderTime.currentMinute = orderTime.formatTime(Math.floor(orderTime.totalTme / 60))
      orderTime.currentSeconds = orderTime.formatTime(Math.floor(orderTime.totalTme % 60))
    }
  },
  // 格式化时间
  formatTime: (time: number) => {
    return time.toString().padStart(2, '0')
  },
})
// 倒计时定时器
const { pause: timePause, resume: timeResume } = useIntervalFn(() => {
  orderTime.getMinter() // 每秒获取分秒方法
}, 1000)

// 轮询监听定时器
const { pause: lunPause, resume: lunResume } = useIntervalFn(() => {
  queryOrderStatus() // 执行订单状态查询
}, 3000)
// 监听倒计时，到时间跳转超时页面
watch(
  () => orderTime.totalTme,
  (newValue) => {
    if (newValue <= 0) {
      timePause() //  关闭倒计时
      router.replace({ path: `/pc/payFail`, query: { msg: '支付超时，请重新发起支付！' } })
    }
  },
)

// 支付类型对象
const payMethObj = reactive({
  // 判断点击的哪一个类型
  payClickItemId: '',
  // 点击储存的哪一个选择项
  itemClickObj: {} as CashierConfig,
  // 点击切换类型
  payClick: (item: any) => {
    payMethObj.payClickItemId = item.id
    payMethObj.itemClickObj = {} // 将下方选中项重置
    codeLink.value = ''
  },
  // 点击切换选项
  itemBtnClick: (item) => {
    payMethObj.itemClickObj = item
  },
  // 点击支付
  toPayTypeClick: () => {
    loading.value = true
    payOrder({ orderNo: orderNo as string, itemId: payMethObj.itemClickObj?.id as any }).then(
      ({ code, data, msg }) => {
        if (code !== 0) {
          router.replace({ path: `/pc/payFail`, query: { msg } })
          return
        }
        loading.value = false
        // 如果是二维码方式 打开支付弹窗
        if (payMethObj.itemClickObj?.callType === GatewayCallTypeEnum.qr_code) {
          codeLink.value = data.payBody as string
        }
        // 如果是跳转支付直接跳转支付页面
        if (payMethObj.itemClickObj.callType === GatewayCallTypeEnum.link) {
          loading.value = false
          location.replace(data.payBody as string)
        }
      },
    )
  },
})

// 监听点击的是哪个分组
watch(
  () => payMethObj.payClickItemId,
  (newValue) => {
    if (newValue) {
      // 判断是否为聚合支付
      if (newValue === 'agg') {
        isAggregateShow.value = true
        return
      }
      isAggregateShow.value = false
      // 查找点击的分组下面的子项
      childRenList.value = orderObj.value?.groupConfigs.find(item => item.id === newValue)?.items
    }
  },
)

onMounted(() => {
  init() //  初始化数据
})
onUnmounted(() => {
  timePause() //  关闭倒计时
  lunPause() //  关闭轮询
})

// 初始化
function init() {
  getOrderAndConfig(orderNo)
    .then(({ code, msg, data }) => {
      if (code !== 0) {
        router.replace({ path: `/pc/payFail`, query: { msg } })
        return
      }
      lunResume() //  开始轮询查询状态
      // 判断是否存在聚合支付
      if (data.config.aggregateShow) {
        data.groupConfigs.unshift({
          id: 'agg',
          name: '聚合扫码',
          recommend: false,
          icon: 'aggregate',
        })
      }
      orderObj.value = data
      payMethObj.payClickItemId = orderObj.value.groupConfigs[0].id || '' // 赋值第一个
      orderTime.getDownTotalTime(data.order.expiredTime) // 计算倒计时
      orderTime.getMinter() // 先执行一下 解决进入页面一秒后才显示倒计时
      timeResume() // 开启倒计时
    })
    .catch((error) => {
      console.log(error)
    })
}

// 查询订单状态
function queryOrderStatus() {
  orderStatus(orderNo).then((res) => {
    // 判断订单是否支付成功
    if (res.data) {
      router.replace({ path: `/pc/paySuccess/${orderNo}`, replace: true })
    }
  })
}
</script>

<style lang="less">
.loadingOverlay {
  .van-loading__circular {
    color: #fff;
  }
  .van-loading__text {
    color: #fff;
    font-weight: 400;
  }
}
.confirmOverlayPC {
  left: 0;
  width: 100%;
  height: 100%;
}
.pcPayTai {
  .van-overlay {
    left: 0;
    width: 100%;
    height: 100%;
  }
  .van-popup {
    width: 20.8333vw;
    height: 20.8333vw;
    .codeBox {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .title {
        font-size: 1vw;
      }
    }
  }
}
</style>

<style scoped lang="less">
@primary-color: #80c1ff; // 主色调：深紫色
@secondary-color: #ff5252; // 辅助色：红色
@background-color: #f5f5f5; // 页面背景色
@white: #ffffff; // 白色
@border-radius: 1.0417vw; // 统一圆角

.pcPayTai {
  width: 100%;
  height: 100vh;
  background: #f0f4fb; // 背景渐变色
  display: flex;
  justify-content: center;

  .pcPayBox {
    width: 51.875vw;
    height: 37.6563vw;
    transform: translateY(5.2083vw);
    border-radius: @border-radius;
    background-color: @white;
    box-shadow: 0 0.4167vw 1.0417vw rgba(0, 0, 0, 0.1); // 添加柔和阴影
    overflow: hidden; // 防止内容溢出
    display: flex;
    flex-direction: column;

    .topBox {
      background: linear-gradient(305deg, #cfd0f3 0%, #ebf1ff 100%);
      padding: 0vw 1.25vw;
      width: 100%;
      height: 18.5938vw;
      position: relative;
      .topBack {
        height: 100%;
        width: auto;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
      }
      .top_main {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 1.25vw 1.9271vw 0vw;
        left: 0;
        z-index: 2;
        .excessTime {
          position: absolute;
          right: 1.5104vw;
          top: 1.25vw;
          display: flex;
          align-items: center;
          gap: 0.2604vw;

          .exTitle {
            color: #9fa1a2;
            font-size: 0.9896vw;
            margin-right: 0.2604vw;
          }

          .point {
            font-weight: 700;
            font-size: 0.625vw;
          }

          .number {
            display: block;
            background-color: #ffece8;
            color: #ff4d4f;
            padding: 0vw 0.1563vw;
            min-width: 1.5104vw;
            height: 1.5104vw;
            line-height: 1.5104vw;
            text-align: center;
            font-size: 1.0938vw;
            border-radius: 0.2604vw;
          }
        }
        .orderTitle {
          font-size: 1.0938vw;
          color: #000000;
          font-weight: 600;
        }
        .orderPrice {
          display: flex;
          flex-direction: column;
          margin-top: 2.2917vw;
          margin-bottom: 1.6667vw;
          p {
            font-size: 2.3438vw;
            color: #ff4d4f;
            transform: translateX(-0.5208vw);
          }
          span {
            font-size: 1.0938vw;
            color: #303133;
          }
        }
        .orderId {
          font-size: 0.7813vw;
          color: #909399;
        }
        .methodBox {
          display: flex;
          justify-content: center;
          border-bottom: 0.0521vw solid #ccc;
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0vw;
          .methodItem {
            box-sizing: border-box;
            min-width: 8.8542vw;
            padding: 0.7813vw 2.0833vw;
            text-align: center;
            transform: translateY(0.0521vw);
            cursor: pointer;
            display: flex;
            gap: 0.2604vw;
            align-items: center;
            position: relative;
            background-color: #dde0e5;
            border-radius: 0.6771vw 0.6771vw 0vw 0vw;
            margin-right: 0.6771vw;
            &.disable {
              cursor: default;
            }
            img {
              width: 0.9896vw;
              height: 0.8333vw;
            }

            span {
              font-size: 1.0938vw;
              color: #000000;
              font-weight: 600;
            }
          }

          .methodItemClick {
            border-radius: 0.5208vw 0.5208vw 0 0;
            background-color: #ffffff;
            border-top: 1px solid #ccc;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            border-bottom: none;
          }
        }
      }
    }

    .content {
      flex: 1;
      background-color: @white;
      color: #333;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5625vw 1.3542vw;
      .payMethodCode {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.0417vw;
        .qrBox {
          padding: 0.3125vw;
          background-color: #3699f7;
          width: 7.7604vw;
          height: 7.7604vw;
          background: url('@/assets/images/qrCodeBorder.png');
          background-size: 100% 100%;
        }
        .payTitleBox {
          .payTitle_top {
            display: flex;
            gap: 0.2604vw;
            align-items: center;
            margin-bottom: 0.5208vw;
            img {
              width: 1.6146vw;
              height: 1.4583vw;
            }
            p {
              font-size: 0.8333vw;
              color: #393939;
            }
          }
          .payTitle_bottom {
            font-size: 0.7813vw;
            color: #000000;
          }
        }
      }
      .payMethodChildBox {
        width: 100%;
        height: 100%;
        position: relative;
        .topbox {
          width: 100%;
          display: flex;
          gap: 0.5208vw;
          .payMethodChildItem {
            padding: 0.4167vw 0.8333vw;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.2083vw;
            border: 0.0521vw solid #dcdfe6;
            border-radius: 0.3125vw;
            height: 2.9271vw;
            min-width: 8.3646vw;
            cursor: pointer;
            &:hover {
              border: 0.0521vw solid #3699f7;
            }
            img {
              width: 1.5625vw;
              height: 1.5625vw;
            }
            span {
              font-size: 1.3021vw;
              color: #303133;
            }
            &.itemClick {
              border: 0.0521vw solid #3699f7;
              position: relative;
              &::after {
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                width: 0.9375vw;
                height: 0.9375vw;
                background: url('@/assets/images/payItemRLogo.png');
              }
            }
          }
        }
        .payClickBtn {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 9.4271vw;
          height: 2.5354vw;
          display: flex;
          font-size: 0.7813vw;
          justify-content: center;
          align-items: center;
          background-color: #4073e1;
          color: #ffffff;
          border-radius: 0.2083vw;
          margin-top: 0.7292vw;
          cursor: pointer;
          &.grey {
            background-color: #ccc;
            cursor: default;
          }
        }
        .qrCodePayBox {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.1354vw;
          .qrCode {
            padding: 0.3125vw;
            background-color: #3699f7;
            width: 7.7604vw;
            height: 7.7604vw;
            background: url('@/assets/images/qrCodeBorder.png');
            background-size: 100% 100%;
          }
          .payTitleBox {
            .payTitle_top {
              display: flex;
              gap: 0.2604vw;
              align-items: center;
              margin-bottom: 0.5208vw;
              img {
                width: 1.6146vw;
                height: 1.4583vw;
              }
              p {
                font-size: 0.8333vw;
                color: #393939;
              }
            }
            .payTitle_bottom {
              font-size: 0.7813vw;
              color: #000000;
            }
          }
        }
      }
    }
  }
}
</style>
