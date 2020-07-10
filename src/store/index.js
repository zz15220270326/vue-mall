import Vue from 'vue'
import Vuex from 'vuex'

// import mutations, actions
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
// state
const state = {
  cartList: []
}

// 1. use
Vue.use(Vuex)

// 2. create store obj
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

// 3. 挂载到Vue实例上
export default store
