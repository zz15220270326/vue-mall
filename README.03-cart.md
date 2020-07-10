1. 安装并使用Vuex
  npm install -S vuex
  store -> index.js:
  index.js: import Vue from 'vue'
  import Vuex from 'vuex'
  Vue.use(Vuex)
  const store = new Vuex.Store({
  state: {
    cartList: []  
  },
  mutations: {
    addToCart(state, payload) {
    state.cartList.push(payload)
    }
  }  
})
}
2. 优化-vuex的抽取与分离
  1. Detail.vue提交到actions中: 
  this.$store.dispatch('addToCart', product)
  2. 在actions中: 
     import ..
     addToCart(context, payload) {
       let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
       // 判断商品是否已经存在
       if (oldProduct) {
       // oldProduct.count ++
         context.commit(ADD_COUNTER, oldProduct)
       }
       else {
         payload.count = 1
         context.commit(ADD_TO_CART, payload)
       }
     }
             3. 在mutations中: 
     import ..
     [ADD_COUNTER](state, payload) {
       payload.count++
     }
     [ADD_TO_CART](state, payload) {
       state.cartList.push(payload)
     }
     4. 创建mutations-types.js:
     export const ADD_COUNTER = 'add_counter'
     export const ADD_TO_CART = 'add_to_cart'  
3. 购物车界面开发: 
   1. nav-bar
     1. 导入组件并设置插槽
     import NavBar from "components/common/navbar/NavBar"     
     components: {
       NavBar
     },
     computed: {
       cartLength() {
         return this.$store.getters.cartLength
       }
     }
     <nav-bar><div slot="center">购物车({{cartLength}})</div></nav-bar>
     2. 创建getters.js:
     // 方法1. 
     export default {
       cartLength(state) {
         return state.cartList.length
       }
     }
     3. 展示商品数据
       1. 创建组件cartList
       export { mapGetters } from 'vuex'
       computed: {
         ...mapGetters(['cartList'])
       }
       2. 创建并挂载组件cartListItem
       import cartListItem from './cartListItem'
       <cart-list-item v-for="(item, index) in cartList" :product="item" :key="index"/>
       3. 在cartListItem中:
       props: {
         product: {
           type: Object,
           default() {
             return {}
           }
         }
       }
       然后写html代码...巴啦啦!
       4. 创建并导入按钮CheckButton组件
       <CheckButton :is-checked="product.checked" @click.native="checkClick"/>
       CheckButton.vue:
         ..
             <img src="~assets/img/cart/tick.svg" :class="{checked: isChecked}" alt="">
         ..
         isChecked: {
           type: BoolLean,
           default() {
           return false
           }
         }    
         <style scoped>
           ..
           .checked {
             border-radius: 50%;
             background-color: orangered;
             border-color: orange;
           }
         </style>
       5.监听CheckButton的点击
       checkClick() {
         this.product.checked = !this.product.checked
       }
       
       