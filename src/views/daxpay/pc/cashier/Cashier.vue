<template>
  <div class="pcPayTai">
    <van-overlay :show="loading" class-name="loadingOverlay">
      <div class="loading-wrapper" @click.stop>
        <van-loading size="24px">
          请稍后...
        </van-loading>
      </div>
    </van-overlay>

    <div class="pcPayBox">
      <div class="header">
        <h1>支付收银台</h1>
      </div>
      <!-- 内容区域 -->
      <div class="content">
        <!-- 上方订单信息盒子 -->
        <div class="orderBox">
          <div class="payPrice">
            <span class="unit">￥</span>
            <div class="price">
              {{ orderObj?.order.amount }}
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
              订单编号:
            </div>
            <div class="itemContent">
              {{ orderObj?.order.orderNo }}
            </div>
          </div>
        </div>
        <!-- 支付方式盒子 -->
        <div class="payMethodBox">
          <div class="methodBox">
            <div
              v-for="item in orderObj?.groupConfigs"
              :key="item.id"
              class="methodItem"
              :class="{ methodItemClick: payMethObj.payClickItemId === item.id }"
              @click="payMethObj.payClick(item)"
            >
              <img v-if="item.icon === 'aggregate-pay'" :src="getImageUrl(item.icon)" alt="">
              <img v-else src="@/assets/images/alipay.png" alt="">
              <span>{{ item.name }}</span>
              <div v-if="item.recommend" class="recommon">
                推荐
              </div>
            </div>
          </div>
          <!-- 聚合支付 -->
          <div v-if="isAggregateShow" class="payMethodCode">
            <vue-qr :text="orderObj?.aggregateUrl" :size="200" />
          </div>
          <div v-else class="payMethodChildBox">
            <div
              v-for="item in childRenList"
              :key="item.id"
              class="payMethodChildItem"
              @click="payMethObj.toPayTypeClick(item)"
            >
              <img :src="getImageUrl(item.icon)" alt="">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <van-popup
        v-model:show="codeshow"
        round
        closeable
        :close-on-click-overlay="false"
        @click-close-icon="closeCode"
      >
        <template #default>
          <div class="codeBox">
            <div class="title">
              请尽快完成支付
            </div>
            <div class="code">
              <vue-qr v-if="codeLink" :text="codeLink" :size="200" />
            </div>
          </div>
        </template>
      </van-popup>
    </div>
    <!-- 二维码弹窗 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showConfirmDialog, showDialog, showFailToast } from 'vant'
import { result } from 'lodash-es'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import { getOrderAndConfig, orderStatus, payOrder } from '@/views/daxpay/pc/cashier/Cashier.api'
import type { CashierGroupConfig, OrderAndConfig } from '@/views/daxpay/pc/cashier/Cashier.api'
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
// 控制二维码弹窗
const codeshow = ref<boolean>(false)
// 二维码链接
const codeLink = ref<string>('')
// 判断是否含有聚合支付
const isAggregateShow = ref<boolean>(false)

// 关闭菜单触发
function closeCode() {
  showConfirmDialog({
    title: '是否关闭支付弹窗?',
    message: '关闭弹窗后该订单会被取消',
    className: 'confirmDialogPC',
    overlayClass: 'confirmOverlayPC',
  })
    .then(() => {
      codeshow.value = false
      router.replace({ path: `/pc/payFail`, query: { msg: '订单已取消，请重新发起支付！' } })
    })
    .catch(() => {
      codeshow.value = true
    })
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
    if (newValue === 0) {
      router.replace({ path: `/pc/payFail`, query: { msg: '支付超时，请重新发起支付！' } })
    }
  },
)

// 支付类型对象
const payMethObj = reactive({
  // 判断点击的哪一个
  payClickItemId: '',
  // 点击切换类型
  payClick: (item: any) => {
    payMethObj.payClickItemId = item.id
  },
  // 点击支付
  toPayTypeClick: (item) => {
    loading.value = true
    payOrder({ orderNo: orderNo as string, itemId: item.id }).then(({ code, data, msg }) => {
      if (code !== 0) {
        router.replace({ path: `/pc/payFail`, query: { msg } })
        return
      }
      loading.value = false
      // 如果是二维码方式 打开支付弹窗
      if (item.callType === GatewayCallTypeEnum.qr_code) {
        codeshow.value = true
        codeLink.value = data.payBody as string
      }
      // 如果是跳转支付直接跳转支付页面
      if (item.callType === GatewayCallTypeEnum.link) {
        router.replace(data.payBody as string)
      }
    })
  },
})

// 监听点击的是哪个分组
watch(
  () => payMethObj.payClickItemId,
  (newValue) => {
    if (newValue) {
      // 判断是否为聚合支付
      if (newValue === '111111111111111111') {
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
          id: '111111111111111111',
          name: '聚合支付',
          recommend: false,
          icon: 'aggregate-pay',
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
      codeshow.value = false
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
  background: linear-gradient(to bottom, #1e90ff, @background-color); // 背景渐变色
  display: flex;
  justify-content: center;
  align-items: center;

  .pcPayBox {
    width: 90%;
    height: 90vh;
    border-radius: @border-radius;
    background-color: @white;
    box-shadow: 0 0.4167vw 1.0417vw rgba(0, 0, 0, 0.1); // 添加柔和阴影
    overflow: hidden; // 防止内容溢出
    display: flex;
    flex-direction: column;

    .header {
      background: linear-gradient(135deg, lighten(@primary-color, 10%), @primary-color, lighten(@primary-color, 10%));
      color: @white;
      padding: 1.25vw;
      text-align: center;

      h1 {
        font-size: 1.4583vw;
        font-weight: bold;
        letter-spacing: 2px; // 增加字间距
        margin: 0;
      }
    }

    .content {
      flex: 1;
      padding: 1.25vw;
      padding-top: 8.25vw;
      background-color: @white;
      color: #333;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2.6042vw;

      .orderBox {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        .payPrice {
          font-size: 0.625vw;
          margin-bottom: 1.0417vw;
          display: flex;
          gap: 0.3646vw;
          font-size: 1.6667vw;

          .unit {
            transform: translateY(0.1042vw) scale(1, 0.8);
          }
        }

        .excessTime {
          display: flex;
          align-items: center;
          gap: 0.2604vw;

          .exTitle {
            color: #9fa1a2;
            margin-right: 0.2604vw;
          }

          .point {
            font-weight: 700;
          }

          .number {
            display: block;
            background-color: #ffece8;
            color: #f66662;
            padding: 0.1563vw;
          }
        }

        .payMessItem {
          display: flex;
          gap: 0.4167vw;
          color: #9fa1a2;
        }
      }

      .payMethodBox {
        width: 100%;

        .methodBox {
          display: flex;
          justify-content: center;
          border-bottom: 0.0521vw solid #ccc;

          .methodItem {
            box-sizing: border-box;
            min-width: 8.8542vw;
            padding: 0.7813vw 2.0833vw;
            text-align: center;
            transform: translateY(1px);
            cursor: pointer;
            display: flex;
            gap: 0.325rem;
            align-items: center;
            position: relative;

            .recommon {
              position: absolute;
              right: 30%;
              top: -0.7813vw;
              padding: 0.1042vw 0.3646vw;
              background-color: #e41937;
              color: #ffffff;
              border-radius: 0.7813vw 0 0.7813vw 0;
            }

            img {
              width: 1.25rem;
              height: 1.25rem;
            }

            span {
              font-size: 0.9vw;
              font-weight: 500;
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
        .payMethodCode {
          padding: 2.0833vw 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .payMethodChildBox {
          padding: 2.0833vw 0 2.0833vw 15.625vw;
          display: flex;
          flex-wrap: wrap;
          gap: 1.8417vw;

          .payMethodChildItem {
            width: 13.0208vw;
            height: 5.6042vw;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5208vw;
            background-color: #ffffff;
            border-radius: 0.5208vw; // 添加圆角，使阴影更柔和
            box-shadow: 0 0.2604vw 0.5208vw rgba(0, 0, 0, 0.1); // 添加四周阴影
            transition: all 0.3s ease; // 添加过渡动画
            font-size: 1.2375vw;
            letter-spacing: 0.0521vw;
            position: relative;
            overflow: hidden;
            &:hover {
              box-shadow: 0 0.5208vw 1.0417vw rgba(0, 0, 0, 0.15); // 鼠标悬停时增强阴影效果
              transform: translateY(-0.2604vw); // 添加轻微上移效果
            }
            img {
              width: 1.813vw;
              height: 1.813vw;
            }
          }
        }
      }
    }
  }
}
</style>
