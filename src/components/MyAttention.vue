<template>
  <div class="all-page">
    <div class="notice">
      <h2 class="about">关于:</h2>
      <p>这个应用可以用来追踪你选择城市的当前天气</p>
      <h2>如何使用:</h2>
      <p>
        1.点击搜索框输入你希望追踪的城市<br />
        2.在搜索结果中选中一个城市，你将获取当地最新的天气<br />
        3.点击右侧的＋号可以将追踪城市的天气情况保存在首页<br />
      </p>
      <h2>移除城市:</h2>
      <p class="lastP">如果你不想在首页关注某个城市,可以通过底部的按钮删<br />除它</p>
      <button @click="closeNotice">关闭</button>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '../stores/index.js'
const weatherStore = useWeatherStore()
const closeNotice = () => {
  weatherStore.changeShowNotice()
}
</script>

<style lang="scss" scoped>
.all-page {
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0px;

  background-color: rgb(0, 0, 0, 0.3);
  color: #000;

  .notice {
    align-self: flex-start;
    padding: 1rem;
    margin-top: 8rem;
    z-index: 20;
    background-color: rgb(255, 255, 255);

    h2 {
      line-height: 24px;
      font-size: 16px;
    }
    p {
      margin-bottom: 1rem;
      font-size: 0.75rem;
      line-height: 1rem;
    }
    .lastP {
      margin-bottom: 0;
    }
    button {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      border: none;
      color: #fff;
      font-size: 0.75rem;
      line-height: 1rem;
      background-color: rgb(0 102 138);
      margin-top: 2rem;
      cursor: pointer;
    }
  }
}
</style>
