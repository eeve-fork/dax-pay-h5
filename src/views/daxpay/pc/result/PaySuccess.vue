<template>
  <div class="pcPayTai">
    <div class="pcPayBox">
      <img src="@/assets/images/success1.png" alt="">
      <p>支付成功</p>
    </div>
  </div>
</template>

<script setup lang="ts">

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
    justify-content: center;
    align-items: center;
    gap: 1.5625vw;
    p {
      font-size: 1.25vw;
      color: #1e90ff;
    }
  }
}
</style>
