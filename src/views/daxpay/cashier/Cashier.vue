<template>
  <div class="cashier">
    <div class="cash_topBox">
      <div class="payPrice">
        <span class="unit">￥</span>
        <div class="price">1299.8</div>
      </div>
      <div class="excessTime">
        <span class="exTitle">剩余支付时间</span>
        <span class="number">{{ downTime.currentMiute }}</span>
        <span class="point">:</span>
        <span class="number">{{ downTime.currentSeconds }}</span>
      </div>
      <div class="payMessItem">
        <div class="itemTitle">标题:</div>
        <div class="itemContent">商业版 1288 预购版</div>
      </div>
      <div class="payMessItem">
        <div class="itemTitle">订单编号:</div>
        <div class="itemContent">207084835007084835066</div>
      </div>
    </div>
    <div class="cash_bodyBox">
      <h2>请选择支付方式</h2>
      <div class="payGoupList">
        <div
          class="payMethodsItem"
          v-for="item in paymentMethods"
          :key="item"
          @click="payTypeClick(item)"
        >
          <div class="itemType">
            <img :src="item.icon" alt="" />
            <p>{{ item.label }}</p>
            <span v-if="item.recommended"> 推荐</span>
          </div>
          <div class="selectBox">
            <img
              v-if="item.value == payType"
              src="@/assets/images/selected-arrow-icon.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="payBtnBox">支付￥<span>1299.8</span></div>
    </div>
  </div>
</template>
<script setup lang="ts">
// 导入图片文件
import zfbPay from "@/assets/images/zfb_pay.png";
import wxPay from "@/assets/images/new_wx_pay.png";
import quickPay from "@/assets/images/quick_pay.png";
import { ref, reactive, onMounted, onUnmounted } from "vue";

//点击支付类型
const payType = ref("alipay");
const payTypeClick = (item) => {
  console.log(item);
  payType.value = item.value;
};

//支付方式列表
const paymentMethods = ref([
  {
    value: "alipay",
    label: "支付宝",
    icon: zfbPay,
    recommended: true,
  },
  {
    value: "wechat",
    label: "微信",
    icon: wxPay,
    recommended: false,
  },
  {
    value: "quickpay",
    label: "快捷支付",
    icon: quickPay,
    recommended: false,
  },
]);

//倒计时对象
const downTime = reactive({
  timer: null,
  totalTme: 300, //总共时间
  currentMiute: "05", //当前分钟
  currentSeconds: "00", //当前秒数
  formatTime: (time: number) => {
    //格式化时间
    return time.toString().padStart(2, "0");
  },
  startCountdown: () => {
    //每秒渲染时间函数
    if (downTime.totalTme == 0) {
      clearInterval(timer);
      downTime.timer = null;
    }
    downTime.totalTme--;
    downTime.currentMiute = downTime.formatTime(Math.floor(downTime.totalTme / 60));
    downTime.currentSeconds = downTime.formatTime(Math.floor(downTime.totalTme % 60));
  },
});
onMounted(() => {
  downTime.timer = setInterval(() => {
    downTime.startCountdown();
  }, 1000);
});
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
    downTime.timer = null;
  }
});
</script>

<style scoped lang="less">
.cashier {
  font-family: "Microsoft YaHei", "微软雅黑", sans-serif;
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
    padding: 0.9375rem 0.625rem;
    position: relative;
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
  }
}
</style>
