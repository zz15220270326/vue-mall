import Vue from 'vue'
import App from './App.vue'
import Router from './router/index'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  Router
}).$mount('#app')
