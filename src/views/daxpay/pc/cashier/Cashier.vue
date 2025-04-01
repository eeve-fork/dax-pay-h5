<template>
  <div class="pcPayTai">
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
              0.02
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
              207592561289848484
            </div>
          </div>
        </div>
        <!-- 支付方式盒子 -->
        <div class="payMethodBox">
          <div class="methodBox">
            <div
              v-for="item in payMethObj.payTypeList"
              :key="item.name"
              class="methodItem"
              :class="{ methodItemClick: payMethObj.payClickItem === item.name }"
              @click="payMethObj.payClick(item)"
            >
              <img :src="item.icon" alt="">
              <span>{{ item.name }}</span>
              <div v-if="item.recommend" class="recommon">
                推荐
              </div>
            </div>
          </div>
          <div class="payMethodChildBox">
            <div v-for="item in 8" :key="item" class="payMethodChildItem">
              <img src="@/assets/images/netbank_company_icon.png" alt="">
              <span>支付方式</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import weiXin from '@/assets/images/new_wx_pay.png'
import zhifuBao from '@/assets/images/zfb_pay.png'
import yinlian from '@/assets/images/union_pay.png'
import shuZhi from '@/assets/images/datarmb_pay.png'
import quick from '@/assets/images/quick_pay.png'
import wangYin from '@/assets/images/net_bank_pay.png'

// const route = useRoute()
const router = useRouter()
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

// 支付类型对象
const payMethObj = reactive({
  // 判断点击的哪一个
  payClickItem: '',
  payClick: (item: any) => {
    payMethObj.payClickItem = item.name
  },
  payTypeList: [
    {
      name: '微信',
      recommend: false,
      icon: weiXin,
    },
    {
      name: '支付宝',
      recommend: true,
      icon: zhifuBao,
    },
    {
      name: '银联支付',
      recommend: false,
      icon: yinlian,
    },
    {
      name: '数字人民币',
      recommend: false,
      icon: shuZhi,
    },
    {
      name: '快捷',
      recommend: false,
      icon: quick,
    },
    {
      name: '网银',
      recommend: false,
      icon: wangYin,
    },
  ],
})

onMounted(() => {
  init()
})
onUnmounted(() => {
  pause()
})

function init() {
  orderTime.getDownTotalTime(new Date().setHours(new Date().getHours() + 1)) // 计算倒计时
  orderTime.getMinter() // 先执行一下 解决进入页面一秒后才显示倒计时
  resume() // 开启倒计时
}
</script>

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
            font-size: 0.9375vw;
            letter-spacing: 0.0521vw;
            &:hover {
              box-shadow: 0 0.5208vw 1.0417vw rgba(0, 0, 0, 0.15); // 鼠标悬停时增强阴影效果
              transform: translateY(-0.2604vw); // 添加轻微上移效果
            }
            img {
              width: 0.7813vw;
              height: 0.7813vw;
            }
          }
        }
      }
    }
  }
}
</style>
