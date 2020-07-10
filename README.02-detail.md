4.2 分类开发
  1. 跳转到详情页
    1. 首先在GoodListItem.vue中设置点击事件itemClick
      itemClick(){
        this.$router.push("detail")
      }
    2. 创建folder: detail -> Detail.vue
    3. router -> index.js:
         const detail = () => import("../views/detail/Detail")
         const routes = {
         ...,
           {
             path:'/detail',
             component: detail
           }
         }
   2. 传参数 (params/query)
     1. params:
              routes = {
                ...,
                {
                  path:'/detail:iid',
                  params: detail
                }
              }
              itemClick(){
                this.$router.push("detail" + this.goodsItem.iid)
              }
              Detail.vue保存iid
              data() {
                return {
                  iid:null
                }
              },
              created() {
                this.iid = this.$route.params.iid
              }
     2. query:
   3. 请求详情页的数据进行开发
     3.1 detailSwiper
       1. 创建组件DetailSwiper
       2. 在network -> detail.js中
         export function getDetail(iid) {
           return request ({
             url: '/detail',
             params: {
               iid
             }
           })
         }   
       3. 在Detail.vue中:
         1. 查找轮播图数据 topImages
         import {getDetail} from "network/detail"
         data() {
           ..,
           goods: null     // --- 用于获取goods中的数据信息
         }
         created() {
           getDetail(this.iid)
             .then((result) => {
               const data = result.result
               this.topImages = data.itemInfo.topImages;
             })
         }
         2. 展示topImages到detailSwiper中
         <detail-swiper :top-images="topImages"/>
       4. 在DetailSwiper中:
         html:
           <swiper>
             <swiper-item v-for="item in topImages" :key="item">
               <img :src="item" alt="">
             </swiper-item>
           </swiper>
         js:
           import {Swiper,SwiperItem} from "components/common/swiper"
           export default {
             name: "DetailSwiper",
             components: {
               Swiper,SwiperItem
             },
             props:{
               topImages:{
                 type: Array,
                 default() {
                   return []
                 }
               }
             }
           }
         style: ...
     3.2 请求商品基本信息
     3.3 请求店铺详情信息
     3.4 补充:
       1. 隐藏导航栏: (设置detail样式)
       2. 添加滚动: Better-scroll
     3.5 商品的详情信息
     3.6 商品的参数信息
     3.7 商品评论信息
     3.8 商品推荐信息
     4. 监听全局事件( mixins的使用 )
     5. 点击标题,滚动到对应的主题
       思路:
         1. 发出事件titleClick
           DetailNavBar.vue:
           titleClick(index) {
             this.$emit('titleClick', index)
           }
         2. 在Detail.vue的data中创建两个新的变量detailHeight, getDetailHeight:
         detailHeight: [], getDetailHeight: null
         3. 防抖实现getDetailHeight(包含性能考虑):
         getDetailHeight = debounce(() => {
           this.detailHeight = [],
           this.detailHeight.push(0),
           this.detailHeight.push(this.$refs.param.$el.offsetTop)
           this.detailHeight.push(this.$refs.comment.$el.offsetTop)
           this.detailHeight.push(this.$refs.recommend.$el.offsetTop)
           // console.log(this.detailHeight)
         }, 100)
         4. 在methods中:
         methods:{
           //..
           imgLoad() {
             this.$refs.scroll.refresh()
             //4.1
             this.getDetailHeight()
           },
           //4.2 先把titleClick挂载在detail-nav-bar中,然后实现titleClick
           titleClick(index) {
             this.$refs.scroll.scrollTo(0, -this.detailHeight[index], 200)
           }
         }
     6. 滚动到对应的主题高度,显示标题
       思路:
         1. 监听滚动的事件(scroll) (my code)
           @heightDetect = heightDetect :probe-type="3"
           heightDetect(height) {
             const currentHeight = -height;                       
           }
         2. 设置currentIndex, 使用循环遍历数组detailHeight
           data() {
           return {
             //...
             currentIndex: 0
           }
           heightDetect(height) {
             const currentHeight = -height;  
             let length = detailHeight.length
             for (let i = 0; i < length; i++) {
               if(this.currentIndex !== i &&
                 (i < length -1 && currentHeight > this.detailHeight[i] && currentHeight < this.detailHeight[i+1]) ||
                 (i === length -1 && currentHeight > this.detailHeight[i])) {
                 this.currentIndex = i;
                 this.$refs.detailNavBar.currentIndex = this.currentIndex
               }
             }                     
           }
           3. 优化
      7. 底部工具栏的封装
      8. back-top
        1. 如何实现
        2. 混入mixins
        3. 将商品添加到购物车中
          1. 在底部工具栏中发出事件addToCart
            this.$emit('addToCart')
          2. 在Detail.vue中:
              addToCart() {
                // 1. 创建商品项目
                const product = {}
                // 2. 给商品项目添加数据
                product.iid = this.iid;
                product.title  = this.goods.title;
                product.desc = this.goods.desc;
                product.image = this.topImages[0];
                product.price = this.goods.realPrice;
                // 3. 提交到vuex的mutations中
                this.$store.commit('addToCart', product)
                // 4. 安装并使用Vuex
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
        4. 优化-vuex的抽取与分离
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
              5. 创建getters.js:
                1.  
                export default {
                  cartLength(state) {
                    return state.cartList.length
                  }
                }
                2. Vuex将getters转化为计算属性
                  
                3.
