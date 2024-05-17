import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAdcode_ip, getWeather, getAdcode_name, getRelTimeWeather } from '@/api/index.js'

export const useWeatherStore = defineStore('weather', () => {
  //城市信息__默认城市
  const cityMsg = ref()
  const getCityMsg = async () => {
    const res = await getAdcode_ip()
    cityMsg.value = res.data
  }
  //城市信息__搜索城市
  const searchCityMsg = ref()
  const getSearchCityMsg = async (name) => {
    const res = await getAdcode_name(name)
    searchCityMsg.value = res.data.geocodes
  }
  //城市预报天气
  const myCityWeather = ref()
  const cityWeather = ref()
  const getMyCityWeather = async (adcode) => {
    const res = await getWeather(adcode)
    myCityWeather.value = res.data.forecasts
    myCityWeather.value[0].casts.forEach((item) => {
      //将星期调整为合适格式
      switch (item.week) {
        case '1':
          item.week = '一'
          break
        case '2':
          item.week = '二'
          break
        case '3':
          item.week = '三'
          break
        case '4':
          item.week = '四'
          break
        case '5':
          item.week = '五'
          break
        case '6':
          item.week = '六'
          break
        case '7':
          item.week = '日'
          break
      }
    })
  }
  const getCityWeather = async (adcode) => {
    const res = await getWeather(adcode)

    cityWeather.value = res.data.forecasts
    dayTemp.value = []
    nightTemp.value = []
    cityWeather.value[0].casts.forEach((item) => {
      //将星期调整为合适格式
      switch (item.week) {
        case '1':
          item.week = '一'
          break
        case '2':
          item.week = '二'
          break
        case '3':
          item.week = '三'
          break
        case '4':
          item.week = '四'
          break
        case '5':
          item.week = '五'
          break
        case '6':
          item.week = '六'
          break
        case '7':
          item.week = '日'
          break
      }
      //得到用于画线的数据

      dayTemp.value.push(item.daytemp)
      nightTemp.value.push(item.nighttemp)
    })

    maxTemp.value = Math.max(...dayTemp.value) + 5
    minTemp.value = Math.min(...nightTemp.value) - 5
  }
  //城市实时天气
  const myCityRelTimeWeather = ref()
  const cityRelTimeWeather = ref()
  const getMyCityRelTimeWeather = async (adcode) => {
    const res = await getRelTimeWeather(adcode)
    myCityRelTimeWeather.value = res.data.lives[0]
  }
  const getCityRelTimeWeather = async (adcode) => {
    const res = await getRelTimeWeather(adcode)
    cityRelTimeWeather.value = res.data.lives[0]
    console.log(cityRelTimeWeather.value)
  }
  //得到用于画线的数据
  const dayTemp = ref([])
  const nightTemp = ref([])
  const maxTemp = ref()
  const minTemp = ref()

  //控制注意页面
  let showNotice = ref(false)
  const changeShowNotice = () => {
    showNotice.value = !showNotice.value
  }
  //控制添加按钮
  let showAdd = ref(false)
  const showAddToTrue = () => {
    showAdd.value = true
  }
  const showAddToFalse = () => {
    showAdd.value = false
  }

  return {
    cityMsg,
    getCityMsg,
    myCityWeather,
    cityWeather,
    getCityWeather,
    getMyCityWeather,
    dayTemp,
    nightTemp,
    maxTemp,
    minTemp,
    showNotice,
    showAdd,
    changeShowNotice,
    searchCityMsg,
    getSearchCityMsg,
    showAddToTrue,
    showAddToFalse,
    myCityRelTimeWeather,
    getMyCityRelTimeWeather,
    cityRelTimeWeather,
    getCityRelTimeWeather
  }
})
