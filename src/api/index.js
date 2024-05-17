import request from './axios.js'

//通过ip地址查询所在城市code
export function getAdcode_ip() {
  return request.get('/ip?ip=101.31.8.45&key=3cb780fd4f6da074bc6d275077c50560')
}
//通过城市名查询城市code
export function getAdcode_name(name) {
  return request.get(`/geocode/geo?address=${name}&key=3cb780fd4f6da074bc6d275077c50560`)
}
//通过code来查询预报天气
export function getWeather(code) {
  return request.get(
    `/weather/weatherInfo?city=${code}&key=3cb780fd4f6da074bc6d275077c50560&extensions=all`
  )
}
//通过code来查询实时天气
export function getRelTimeWeather(code) {
  return request.get(`/weather/weatherInfo?city=${code}&key=3cb780fd4f6da074bc6d275077c50560`)
}
