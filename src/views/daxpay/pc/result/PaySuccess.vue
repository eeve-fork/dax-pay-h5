<template>
  <div class="pcPayTai">
    <div class="pcPayBox">
      <img src="@/assets/images/success1.png" alt="">
      <p>支付成功</p>

      <div class="payPrice">
        <span class="unit">￥</span>
        <div class="price">
          {{ order?.amount }}
        </div>
      </div>
      <div class="payMessBox">
        <div class="payMessItem">
          <div class="itemTitle">
            支付标题：
          </div>
          <div class="itemContent">
            {{ order?.title }}
          </div>
        </div>
        <div v-if="order?.description" class="payMessItem">
          <div class="itemTitle">
            订单描述：
          </div>
          <div class="itemContent">
            {{ order?.description }}
          </div>
        </div>

        <div class="payMessItem">
          <div class="itemTitle">
            订单编号：
          </div>
          <div class="itemContent">
            {{ order?.orderNo }}
          </div>
        </div>
      </div>
      <div class="payBtnBox" @click="closeSuccessClick">
        完成
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { findOrderByOrderNo } from '@/views/daxpay/pc/cashier/Cashier.api'

const route = useRoute()
const { orderNo } = route.params
const order = ref()

onMounted(() => {
  init()
  console.log(route)
})

// 初始化函数
function init() {
  findOrderByOrderNo(orderNo).then(({ data }) => {
    order.value = data
  })
}

// 点击关闭
function closeSuccessClick() {
  window.close()
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
    padding: 7.2083vw 0;
    align-items: center;
    gap: 1.5625vw;
    p {
      font-size: 1.25vw;
      color: #1e90ff;
    }
  }
  .payPrice {
    display: flex;
    gap: 0.2604vw;
    align-items: center;

    .unit {
      font-size: 0.625vw;
      transform: translateY(0.4167vw);
    }

    .price {
      font-size: 1.6667vw;
      font-weight: 700;
    }
  }

  .payMessBox {
    width: 100%;
    padding: 0px 1.0417vw;
    display: flex;
    flex-direction: column;
    gap: 0.5208vw;

    .payMessItem {
      width: 100%;
      display: flex;
      justify-content: center;

      .itemTitle {
        font-size: 0.8333vw;
        color: #797d81;
      }

      .itemContent {
        font-size: 0.8333vw;
        font-weight: 500;
        font-size: '微软雅黑';
      }
    }
  }

  .payBtnBox {
    width: 20%;
    margin: 0 auto;
    background-color: #0d6eff;
    color: #fff;
    height: 2.7083vw;
    position: absolute;
    bottom: 7.6042vw;
    text-align: center;
    line-height: 2.7083vw;
    border-radius: 0.5208vw;
    cursor: pointer;
  }
}
</style>
