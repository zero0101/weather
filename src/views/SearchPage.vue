<template>
  <div class="container" v-if="weatherStore.cityRelTimeWeather">
    <div class="title">
      你正在预览{{ weatherStore.cityRelTimeWeather.city }}的天气信息<span
        v-if="weatherStore.showAdd"
        >，可以通过右上角的"+"号按钮保存起来</span
      >
    </div>
    <div class="today-weather">
      <h2>当日气温是：{{ weatherStore.cityRelTimeWeather.temperature }}摄氏度</h2>
      <h2>当日天气是：{{ weatherStore.cityRelTimeWeather.weather }}</h2>
      <h2>当日风向是：{{ weatherStore.cityRelTimeWeather.winddirection }}风</h2>
      <h2>当日风力是：{{ weatherStore.cityRelTimeWeather.windpower }}级</h2>
    </div>
    <hr />
    <div class="weather-card">
      <WeatherCard />
    </div>
  </div>
</template>

<script setup>
import WeatherCard from '../components/WeatherCard.vue'
import { useWeatherStore } from '@/stores'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const weatherStore = useWeatherStore()
onMounted(async () => {
  await weatherStore.getCityRelTimeWeather(route.query.adcode)
  //如果查询的页面城市被存储 不显示'+'号
  await weatherStore.getCityWeather(route.query.adcode)
  const keys = Object.keys(localStorage)
  const saveCityWeather = keys.map((key) => JSON.parse(localStorage.getItem(key)))
  saveCityWeather.forEach((item) => {
    if (item.city === weatherStore.cityWeather[0].city) {
      weatherStore.showAddToFalse()
    }
  })
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  // height: 2000px;
  .title {
    padding: 0.5rem;
    background-color: rgb(0 78 113);
    text-align: center;
    line-height: 24px;
  }
  .today-weather {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-top: 1.5rem;
    margin-right: auto;
    margin-left: auto;
    padding-right: 10rem;
    padding-left: 10rem;
    text-align: center;
    h2 {
      line-height: 24px;
    }
  }
  hr {
    margin: 0;
    margin-top: 1.5rem;
    height: 0;
    width: 100%;
    color: inherit;
    border-top-width: 1px;
    border-color: rgb(255 255 255/ 0.1);
  }
  .weather-card {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-right: 10rem;
    padding-left: 10rem;
  }
}
</style>
