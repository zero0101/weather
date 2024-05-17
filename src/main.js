import { createApp } from 'vue'
import App from './App.vue'
import 'reset-css' //清除默认样式的第三方包
import './main.css' //自定义的全局样式
import './assets/fontawesome-free-6.5.2-web/css/all.min.css' //引入fontAwesome
import { createPinia } from 'pinia'
import router from './router/index.js'

// eslint-disable-next-line no-unused-vars
import * as echarts from 'echarts'
import vueEcharts from 'vue-echarts'

const app = createApp(App)
//注册全局组件
app.component('v-chart', vueEcharts)
app.use(router)
app.use(createPinia())
app.mount('#app')
