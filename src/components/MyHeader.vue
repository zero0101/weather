<template>
  <div class="header">
    <div class="nav">
      <div class="title" @click="backToHome">
        <i class="fa-solid fa-sun"></i>
        <div>新中地天气</div>
      </div>
      <div class="msg" v-if="weatherStore.myCityRelTimeWeather">
        <div class="address">{{ weatherStore.myCityRelTimeWeather.city }}</div>
        <div class="weather">
          实时天气：{{ weatherStore.myCityRelTimeWeather.weather }}
          {{ weatherStore.myCityRelTimeWeather.temperature }}℃
        </div>
        <div class="wind">
          {{ weatherStore.myCityRelTimeWeather.winddirection }}风{{
            weatherStore.myCityRelTimeWeather.windpower
          }}级
        </div>
      </div>
      <div class="notice">
        <i class="fa-solid fa-circle-info" @click="showAttention"></i>
        <i class="fa-solid fa-plus last" v-if="weatherStore.showAdd" @click="addCity"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const weatherStore = useWeatherStore()

onMounted(async () => {
  //得到ip城市的adcode
  await weatherStore.getCityMsg()

  //来查询ip城市的实时weather
  await weatherStore.getMyCityRelTimeWeather(weatherStore.cityMsg.adcode)
})

//返回主页
const backToHome = () => {
  router.push('/')
}
//显示注意页面
const showAttention = () => {
  weatherStore.changeShowNotice()
}
//添加城市
const addCity = () => {
  //将信息存储到浏览器本地 注意 要把对象形式转换为字符串形式
  localStorage.setItem(
    weatherStore.cityRelTimeWeather.city,
    JSON.stringify(weatherStore.cityRelTimeWeather)
  )
  //不显示'+''
  weatherStore.showAddToFalse()
}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 30;
  //防止透视
  background-color: rgb(0 102 138);
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  .nav {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding-right: 10rem;
    padding-left: 10rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    margin: 0 auto;
    text-align: center;

    .title {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      font-size: 1.5rem;
      line-height: 2rem;
      color: inherit;
      text-decoration: inherit;
      cursor: pointer;
    }
    .msg {
      display: flex;
      gap: 1rem;
      align-items: center;
      .address {
        font-size: 1.125rem;
        line-height: 1.75rem;
      }
      .weather {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
      .wind {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }
    .notice {
      flex: 1;
      display: flex;
      justify-content: end;
      gap: 0.75rem;
      i {
        font-size: 1.25rem;
        line-height: 1.75rem;
        cursor: pointer;
        transition: 1s;
        &:hover {
          color: rgb(0 78 113);
        }
        &.last {
          transition-duration: 0.15s;
        }
      }
    }
  }
}
</style>
