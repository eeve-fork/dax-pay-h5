<template>
  <div class="paySuccess">
    <div class="payLogo">
      <img src="@/assets/images/success1.png" alt="">
      <p>支付成功</p>
    </div>
    <div class="payPrice">
      <span class="unit">￥</span>
      <div class="price">
        793.21
      </div>
    </div>
    <div class="payMessBox">
      <div class="payMessItem">
        <div class="itemTitle">
          支付标题
        </div>
        <div class="itemContent">
          商业版 1288 预购版
        </div>
      </div>
      <div class="payMessItem">
        <div class="itemTitle">
          订单编号
        </div>
        <div class="itemContent">
          20708483506
        </div>
      </div>
      <div class="payMessItem">
        <div class="itemTitle">
          支付时间
        </div>
        <div class="itemContent">
          2021-06-25 11:21
        </div>
      </div>
    </div>

    <div class="payBtnBox">
      完成
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.paySuccess {
  padding: 3.5rem 0rem;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  position: relative;
  .payLogo {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    align-items: center;
    img {
      width: 3.125rem;
      height: 3.125rem;
    }
    p {
      font-size: 1.5rem;
      color: #0d6eff;
      font-weight: 700;
    }
  }
  .payPrice {
    display: flex;
    gap: 0.315rem;
    align-items: center;

    .unit {
      font-size: 0.75rem;
      transform: translateY(0.525rem);
    }
    .price {
      font-size: 2rem;
      font-weight: 700;
    }
  }
  .payMessBox {
    width: 100%;
    padding: 0px 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    .payMessItem {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .itemTitle {
        font-size: 1rem;
        color: #797d81;
      }
      .itemContent {
        font-size: 1rem;
        font-weight: 500;
        font-size: '微软雅黑';
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
    bottom: 3.75rem;
    text-align: center;
    line-height: 3.25rem;
    border-radius: 0.625rem;
  }
}
</style>
