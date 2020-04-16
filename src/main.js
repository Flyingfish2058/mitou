// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import VCharts from 'v-charts'
import Apps from './App.vue'
import BaiduMap from 'vue-baidu-map'
import Axios from 'axios'
import qs from 'qs'
import 'vant/lib/index.css'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(VCharts)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'YOUR_APP_KEY'
})
// 时间戳转换日期
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear() + '年'
  const m = (dt.getMonth() + 1 + '月').padStart(2, '0')
  const d = (dt.getDate() + '日').padStart(2, '0')

  // const hh = (dt.getHours() + '').padStart(2, '0')
  // const mm = (dt.getMinutes() + '').padStart(2, '0')
  // const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}${m}${d}`
})
Vue.prototype.$axios = Axios
Vue.prototype.$qs = qs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(Apps)
})
