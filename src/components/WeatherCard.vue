<template>
  <div class="card">
    <!-- 注意 如果数据还没加载出来则不渲染 避免报错 -->
    <div class="weather-box" v-if="weatherStore.cityWeather">
      <div class="box1 box">
        <span>今天</span>
        <span>{{ weatherStore.cityWeather[0].casts[0].date.slice(5) }}</span>
        <span>{{ weatherStore.cityWeather[0].casts[0].dayweather }}</span>
        <span>风力 {{ weatherStore.cityWeather[0].casts[0].daypower }}级</span>
      </div>
      <div class="box2 box">
        <span>明天</span>
        <span>{{ weatherStore.cityWeather[0].casts[1].date.slice(5) }}</span>
        <span>{{ weatherStore.cityWeather[0].casts[1].dayweather }}</span>
        <span>风力 {{ weatherStore.cityWeather[0].casts[1].daypower }}级</span>
      </div>
      <div class="box3 box">
        <span> 周{{ weatherStore.cityWeather[0].casts[2].week }}</span>
        <span>{{ weatherStore.cityWeather[0].casts[2].date.slice(5) }}</span>
        <span>{{ weatherStore.cityWeather[0].casts[2].dayweather }}</span>
        <span>风力 {{ weatherStore.cityWeather[0].casts[2].daypower }}级</span>
      </div>
      <div class="box4 box">
        <span> 周{{ weatherStore.cityWeather[0].casts[3].week }}</span>
        <span>{{ weatherStore.cityWeather[0].casts[3].date.slice(5) }}</span>
        <span>{{ weatherStore.cityWeather[0].casts[3].dayweather }}</span>
        <span>风力 {{ weatherStore.cityWeather[0].casts[3].daypower }}级</span>
      </div>
    </div>
    <div class="weatherCanvas" v-if="weatherStore.cityWeather">
      <div class="chart">
        <v-chart :option="option"></v-chart>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/index.js'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const weatherStore = useWeatherStore()

onMounted(async () => {
  await weatherStore.getCityMsg()
  //根据路由来确定查询哪个城市的天气
  if (route.name === 'HomePage') {
    await weatherStore.getCityWeather(weatherStore.cityMsg.adcode)
  } else if (route.name === 'SearchPage') {
    await weatherStore.getCityWeather(route.query.adcode)
  }
  renderChart(weatherStore.dayTemp, weatherStore.nightTemp)
})
const option = ref({})
const renderChart = (v1, v2) => {
  option.value = {
    xAxis: {
      type: 'category',
      show: false
    },
    yAxis: {
      type: 'value',
      show: false,
      max: '40',
      min: '0'
    },
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    series: [
      {
        type: 'line',
        data: v1,
        label: {
          show: true,
          formatter(params) {
            return '白' + params.data + '℃'
          },
          position: 'top',
          color: '#fff'
        },
        smooth: true
      },
      {
        type: 'line',
        data: v2,
        label: {
          show: true,
          formatter(params) {
            return '晚' + params.data + '℃'
          },
          position: 'bottom',
          color: '#fff'
        },
        smooth: true
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding-top: 2.5rem;
  padding-left: 3rem;
  padding-right: 3rem;
  margin-top: 0.5rem;
  background-color: rgb(0 78 113 /1);
  border-radius: 0.25rem;

  .weather-box {
    display: flex;
    gap: 1.5rem;
    .box {
      flex: 1 1 0%;
      height: 144px;
      display: flex;
      gap: 1rem;
      flex-direction: column;
      text-align: center;
      span {
        line-height: 24px;
      }
    }
  }
  .weatherCanvas {
    height: 10rem;
    margin-top: 2.5rem;
    .chart {
      position: relative;
      width: 1120px;
      height: 160px;
      padding: 0px;
      margin: 0px;
      border-width: 0px;
      cursor: default;
    }
  }
}
</style>
