<template>
  <div class="main">
    <div class="container">
      <div class="search">
        <input type="text" placeholder="请输入城市名称" v-model="searchValue" />
        <ul class="searchResult" v-show="searchValue">
          <p v-if="weatherStore.searchCityMsg === undefined">似乎没有找到你查找的城市</p>
          <li v-else @click="fn">
            {{ weatherStore.searchCityMsg[0].city }}
          </li>
        </ul>
      </div>

      <div class="saveCities" v-if="keys.length > 0 && searchValue.length === 0">
        <div class="city" v-for="(item, index) in saveCityWeather" :key="index">
          <div class="cityMsg" @click="lookCity(index)">
            <span>{{ item.city }}</span>
            <span>{{ item.temperature }}度</span>
          </div>
          <div class="buttons">
            <button @click="lookCity(index)">查看</button>
            <button @click="delCity(index)">删除</button>
          </div>
        </div>
      </div>
      <h2
        class="noCity"
        :class="{ changeMargin: searchValue.length > 0 }"
        v-else
        v-show="searchValue.length === 0"
      >
        暂时没有保存过城市天气信息，请查询后点击右上角"+"号保存。
      </h2>
      <h2 class="nearWeather">近期天气</h2>
      <WeatherCard></WeatherCard>
    </div>
  </div>
</template>

<script setup>
import WeatherCard from '../components/WeatherCard.vue'
import { ref, watch, onMounted } from 'vue'
import { useWeatherStore } from '@/stores'
import { useRouter } from 'vue-router'

const weatherStore = useWeatherStore()
const router = useRouter()

onMounted(() => {
  keys.value = Object.keys(localStorage)
  saveCityWeather.value = keys.value.map((key) => JSON.parse(localStorage.getItem(key)))
  //不显示'+'号'
  weatherStore.showAddToFalse()
})

//监听输入的搜素词
const searchValue = ref('')
watch(searchValue, (newValue) => {
  weatherStore.getSearchCityMsg(newValue)
})
//切换到搜索的路由
const fn = () => {
  router.push({
    path: '/search',
    query: { adcode: weatherStore.searchCityMsg[0].adcode }
  })
  //让'+'显示'
  weatherStore.showAddToTrue()
}
//本地的存储城市
let keys = ref([])
let saveCityWeather = ref([])

//删除城市
const delCity = (index) => {
  localStorage.removeItem(keys.value[index])
  keys.value.splice(index, 1)
  saveCityWeather.value.splice(index, 1)
}
// 查看城市
const lookCity = (index) => {
  //让'+'不显示'
  weatherStore.showAddToFalse()
  //切换路由
  router.push({
    path: '/search',
    query: { adcode: saveCityWeather.value[index].adcode }
  })
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 10rem;
  padding-left: 10rem;

  .search {
    padding-top: 1rem;
    margin-bottom: 2rem;
    position: relative;
    input {
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      width: 100%;
      height: 40.8px;
      background-color: transparent;
      border: 1px solid #e5e7eb;
      border-top: 0;
      border-left: 0;
      border-right: 0;

      line-height: inherit;
      font-size: 100%;
      margin: 0;
      color: inherit;
      &:focus {
        outline: 2px solid transparent;
        outline-offset: 2px;
        box-shadow:
          0 4px 6px -1px rgb(0 0 0 / 0.1),
          0 2px 4px -2px rgb(0 0 0 / 0.1);
        border-color: rgb(0 78 113 /1);
      }
      &::placeholder {
        color: #9ca3af;
      }
    }
    .searchResult {
      position: absolute;
      top: 62px;
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      width: 100%;
      background-color: rgb(0 78 113);
      box-shadow:
        0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
      transition: 0.2s;
      li {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        cursor: pointer;
        line-height: 24px;
      }
    }
  }

  .noCity {
    height: 24px;
    line-height: 24px;
    text-align: center;
    transition: 0.2s;
    &.changeMargin {
      margin-top: 5rem;
    }
  }
  .saveCities {
    max-height: 300px;
    margin-top: 2.5rem;
    scrollbar-width: thin;
    overflow: overlay;
    .city {
      display: flex;
      justify-content: space-between;
      &:hover {
        .cityMsg {
          width: 80%;
        }
        .buttons {
          display: flex;
        }
      }
      .cityMsg {
        display: flex;
        justify-content: space-between;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
        width: 100%;
        background-color: rgb(0 78 113);
        cursor: pointer;
        transition: 0.3s;
        span {
          line-height: 24px;
        }
      }
      .buttons {
        display: none;
        margin-bottom: 1rem;
        gap: 0.5rem;
        button {
          width: 80px;
          cursor: pointer;
          text-align: center;
          background-color: rgb(234 179 8);
          border: none;
          color: #fff;
        }
      }
    }
  }
  .nearWeather {
    margin-top: 1.5rem;
    height: 24px;
    line-height: 24px;
  }
}
</style>
