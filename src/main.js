import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.prototype.$bus = new Vue()

//引入框架
import Mint from 'mint-ui'
Vue.use(Mint)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
