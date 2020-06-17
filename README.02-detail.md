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
     
     
     
