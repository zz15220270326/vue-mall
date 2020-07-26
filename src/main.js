import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store"
// 自定义toast插件
import Toast from "components/common/toast"
Vue.use(Toast)
// 移动端fastClick --解决移动端300ms延迟
import fastClick from "fastclick"
fastClick.attach(document.body)
// 引入VueLazyLoad懒加载插件
import VueLazyLoad from "vue-lazyload"
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeHolder.png')
})
// 事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
