<template>
  <div class="payFail">
    <div class="payLogo">
      <img src="@/assets/images/fail1.png" alt="">
      <p>支付失败</p>
      <span>订单超时自动关闭，请重新发起支付</span>
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
    </div>

    <div class="payBtnBox">
      关闭
    </div>
  </div>
</template>

<script setup lang="ts"></script>

  <style scoped lang="less">
  .payFail {
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
      color: #e74e4e;
      font-weight: 700;
    }
    span {
      letter-spacing: 2px;
      font-size: 0.875rem;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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
    padding: 0 1.25rem;
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
      }
    }
  }
  .payBtnBox {
    width: 90%;
    margin: 0 auto;
    background-color: #e74e4e;
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
