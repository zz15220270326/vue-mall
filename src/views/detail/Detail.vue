<template>
  <div id="detail">
    <!--1. 顶部导航-->
    <detail-nav-bar class="detailNav" @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
    <!-- 2. 滚动区域 - BS -->
    <scroll class="content" ref="scroll" :probe-type="3" @heightDetect="heightDetect">
      <!-- 3. 详情页轮播图 -->
      <detail-swiper :top-images="topImages" v-if="this.topImages.length > 0"></detail-swiper>
      <!-- 4. 详情页商品基本信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 5. 详情页店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 6. 详情页商品详细信息 -->
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <!-- 7. 详情页商品参数信息 -->
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <!-- 8. 详情页商品评论信息 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <!-- 9. 详情页的推荐数据 -->
      <good-lists :goods="recommend" ref="recommend"></good-lists>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backTopClick" ></back-top>
    <detail-bottom-bar @addToCart="addToCart"/>
    <!--<toast :show="show" :message="message"></toast>-->

  </div>
</template>

<script>
  // 导入组件相关内容
  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailParamInfo from "./childComponents/DetailParamInfo";
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";
  import DetailBottomBar from "./childComponents/DetailBottomBar";
  import GoodLists from "components/content/goods/GoodLists";
  // Toast
  /*import Toast from "components/common/toast"*/

  // 导入数据相关内容
  import {getDetail,getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import {debounce} from "common/utils";
  import {BACKTOP_DISTANCE} from "common/const";

  // 导入混入
  import {itemListener, backTopMixIns} from "common/mixins";

  // 引入滚动
  import Scroll from "components/common/scroll/Scroll";

  // Vuex相关内容
  import { mapActions } from "vuex"





  export default {
    name: "Detail.vue",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodLists,
      DetailBottomBar,

      Scroll,
    },
    data(i) {
      return {
        id: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        detailItemListener: null,
        detailHeight: [],
        getDetailHeight: null,
        currentIndex: 0,
        message: '',
        show: false,
      }
    },
    mixins:[itemListener, backTopMixIns],
    created() {
      // console.log(this.$route.params)
      //1. 保存iid
      /*this.iid = this.$route.params.iid*/
      this.iid = this.$route.query.iid
      //2. 根据详情页请求相应的数据
      getDetail(this.iid)
        .then((result) => {
          // 分离数据
          // console.log(result)
          // 1. 顶部数据: 1.轮播图
          // console.log(result.result.itemInfo.topImages);
          const data = result.result

          this.topImages = data.itemInfo.topImages;

          // 2. 获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          // 3. 创建店铺信息对象
          this.shop = new Shop(data.shopInfo)

          // 4. 保存商品的详情数据
          this.detailInfo = data.detailInfo
          // console.log(this.detailInfo);

          // 5. 商品参数信息的展示
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          //6. 获取评论信息的展示
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }

        }).catch((error) => {
            console.log(error);
      })
      // 7. 推荐信息的展示
      getRecommend()
        .then(result => {
          // console.log(result);
          this.recommend = result.data.list;
        })
        .catch(error => {
          console.log(error);
        })

      //8. 给detailHeight进行赋值
      this.getDetailHeight = debounce(() => {
        this.detailHeight = []

        this.detailHeight.push(0)
        this.detailHeight.push(this.$refs.param.$el.offsetTop)
        this.detailHeight.push(this.$refs.comment.$el.offsetTop)
        this.detailHeight.push(this.$refs.recommend.$el.offsetTop)

        // print
        console.log(this.detailHeight);
      },150)
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImgLoad',this.detailItemListener)
    },
    methods: {
      // ...mapActions(['addCart']),
      ...mapActions({
        add: 'addToCart'
      }),
      imgLoad() {
        this.$refs.scroll.refresh()
        this.getDetailHeight()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.detailHeight[index], 200)
      },
      heightDetect(height) {
        // console.log(height);    // 负的值
        const currentHeight = -height
        // console.log(currentHeight);
        /*
        * 将scrollHeight和detailHeight进行对比
        * 1.    -------------------0
        * 2.    -------------------1
        * 3.    -------------------3
        * 4.    -------------------4
        * */
        let length = this.detailHeight.length;
        for (let i in this.detailHeight) {
          this.currentIndex = i*1;
          if(this.currentIndex !== i) {
            if(this.currentIndex < length -1) {
              if(currentHeight >= this.detailHeight[this.currentIndex] && currentHeight < this.detailHeight[this.currentIndex + 1]) {
                this.$refs.detailNavBar.currentIndex = this.currentIndex
              }
            }
            else {
              if (currentHeight >= this.detailHeight[this.currentIndex]) {
                this.$refs.detailNavBar.currentIndex = this.currentIndex
              }
            }
          }
        }
        /**
         *  let length = this.themeTops.length;
         *  for (let i = 0; i < length; i++) {
         *  let iPos = this.themeTops[i];
         * 判断的方案:
         *  方案一:
         *    条件: (i < (length-1) && currentHeight >= iPos && currentHeight < this.detailHeight[i+1]) || (i === (length-1) && currentHeight >= iPos),
         *    优点: 不需要引入其他的内容, 通过逻辑解决
         *    缺点: 判断条件过长, 并且不容易理解
         *  方案二:
         *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
         *    优点: 简洁明了, 便于理解
         *    缺点: 需要引入一个较大的int数字
         * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
         * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
         */
        // for (let i = 0; i < length; i++) {
        //   this.currentIndex = i;
        //   if((this.currentIndex !== i) &&
        //     ((this.currentIndex < length -1) && (currentHeight > this.detailHeight[this.currentIndex] && currentHeight < this.detailHeight[this.currentIndex + 1])) ||
        //     ((this.currentIndex === length -1)) && (currentHeight > this.detailHeight[this.currentIndex] )) {
        //     this.$refs.detailNavBar.currentIndex = this.currentIndex
        //   }
        // }
        // 是否显示回到顶部
        this.isShowBackTop = currentHeight > BACKTOP_DISTANCE;
      },
      // backTopClick() {
      //   // console.log('backTopClick');
      //   // 滚到顶部
      //   // this.$refs.scroll.scroll.scrollTo(0,0,800)
      //   this.$refs.scroll.scrollTo(0, 0 , 500)
      // }
      addToCart() {
        // 1. 获取商品信息
        const product = {}
        product.iid = this.iid;
        product.title  = this.goods.title;
        product.desc = this.goods.desc;
        product.image = this.topImages[0];
        product.price = this.goods.realPrice;
        // console.log(product);
        /*this.$store.dispatch('addToCart', product)
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
          })*/
        // Promise MapActions
        // this.add(product)
        //   .then(result => {
        //     this.show = true
        //     this.message = result
        //     setTimeout(() => {
        //       this.show = false
        //       this.message = ''
        //     }, 1500)
        //   })
        // .catch(error => {
        //   console.log(error);
        // })
        this.add(product)
          .then(result => {
            /*console.log(this.$toast);*/
            this.$toast.showToast(result, 1500)
          })

      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detailNav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px );
  }
</style>
