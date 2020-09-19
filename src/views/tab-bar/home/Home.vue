<template>
  <div id="home" class="wrapper">
    <!--  nav-bar  -->
    <nav-bar class="home-nav-bar">
      <div slot="center">super-mall</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="home-tab-control"
      v-show="ifTcFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @heightDetect="heightDetect"
      :pull-up-load="true"
      @loadMore="loadMore"
    >
      <!--  HomeSwiper  -->
      <home-swiper :banner="banner" v-if="this.banner.length > 0" @swiperImgLoad="swiperImgLoad" />
      <!--  HomeRecommendView  -->
      <home-recommend-view :recommend="recommend" />
      <!--  HomeFeatureView  -->
      <home-feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <good-lists :goods=goodsShow />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    <!-- .native: 监听组件的原生事件(click mousedown ...) -->

  </div>
</template>

<script>
  //引入js文件内容
  import { debounce } from "common/utils"
  //插入组件
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwiper from "./childComponents/HomeSwiper";
  // import MintSwiper from "./childComponents/MintSwiper";
  //导入数据
  import {BACKTOP_DISTANCE} from "common/const"

  import HomeRecommendView from "./childComponents/HomeRecommendView";
  import HomeFeatureView from "./childComponents/HomeFeatureView";
  import TabControl from "@/components/content/tab-control/TabControl";

  //Goods
  import GoodLists from "@/components/content/goods/GoodLists";

  //Better-scroll
  import Scroll from "@/components/common/scroll/Scroll";

  //back-top
  // import BackTop from "components/content/back-top/BackTop";

  //获取network数据
  import {getHomeMultiData, getGoodsData} from "network/home";
  //js
  import {itemListener, backTopMixIns} from "common/mixins";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      TabControl,
      GoodLists,
      Scroll,
    },
    data() {
      return {
        // homeResult: null,
        // titles:['流行','新款','精选'],
        banner: [],
        recommend: [],
        //Home商品的数据结构
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentType: 'pop',
        // isShowBackTop: false,
        tcOffsetTop: 0,
        ifTcFixed: false,
        homeHeight: 0,
        homeItemListener: null
      }
    },
    mixins: [itemListener, backTopMixIns],
    computed:{
      goodsShow() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /*
      * 网络请求相关的方法
      * */
      getHomeMultiData() {
        getHomeMultiData()
          .then(result => {
            // console.log(result); //检验是否成功请求数据
            this.banner = result.data.banner.list
            this.recommend = result.data.recommend.list
          })
          .catch(error => {
            console.log(error);
          })
      },
      getGoodsData(type) {
        let page = this.goods[type].page + 1
        getGoodsData(type, page)
          .then(result => {
            /*for(let item of result.goods) {
            }*/
            let list = result.data.list
            this.goods[type].list.push(...list)
            this.goods[type].page += 1

            //进行下一次上拉加载
            this.$refs.scroll.finishPullUp()
          })
      },
      // getGoodsData(type) {
      //   //获取第一页的数据
      //   let page = this.goods[type].page + 1
      //   getGoodsData(type, page)
      //     .then(res => {
      //       this.goods[type].list.push(...res.goods)   //数组语法，将当前page中的所有数据添加到goods中
      //       this.goods[type].page = res.page
      //     }).catch(error => {
      //     console.log(error);
      //   })
      // },
      /*
      * 事件监听相关的方法
      * */
      tabClick(index) {
        switch(index) {
          case 0:{
            this.currentType = 'pop'
            break
          }
          case 1:{
            this.currentType = 'new'
            break
          }
          case 2:{
            this.currentType = 'sell'
            break
          }
        }
        // 两个tab-control保持一致
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      /*backTopClick() {
        // console.log('backTopClick');
        // 滚到顶部
        // this.$refs.scroll.scroll.scrollTo(0,0,800)
        this.$refs.scroll.scrollTo(0,0)
      },*/
      heightDetect(height) {
        // console.log(height);
        // if (height <= 1000) {
        //   this.isShowBackTop = false
        // }
        // else {
        //   this.isShowBackTop = true
        // }
        //1. 判断backTop是否显示
        this.isShowBackTop = (-height) > BACKTOP_DISTANCE
        //2. 决定tabControl是否吸顶
        this.ifTcFixed = (-height) > this.tcOffsetTop
      },
      loadMore() {
        // console.log('load more');
        this.getGoodsData(this.currentType)
      },
      //监听图片加载
      swiperImgLoad() {
        // console.log(this.$refs.tabControl.$el.offsetTop)
        this.tcOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }
      // debounce(func, delay) {
      //   let timer = null
      //   return function(...args) {
      //     if(timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       func.apply(this, args)
      //     },delay)
      //   }
      // }
    },

    //Vue内部的函数
    created() {
      //1. 请求多个数据
      this.getHomeMultiData()

      //2. 获取goods中的数据
      this.getGoodsData('pop')
      this.getGoodsData('new')
      this.getGoodsData('sell')

      //3. 使两个tab-control的值保持一致
      // index
    },
    mounted() {
      //3. 监听item中图片加载完成
      // const refresh = debounce(this.$refs.scroll.refresh,500)

      //4.事件总线 (保存事件总线中的函数)
      // this.homeItemListener = () => {
      //   refresh()
      // }
      // this.$bus.$on('itemImgLoad', this.homeItemListener)

      //5.获取tabControl的offsetTop  组件中的$el
      // console.log(this.$refs.tabControl.$el.offsetTop);    //偏小
    },
    deactivated() {
      //1. 保存离开的高度
      this.homeHeight = this.$refs.scroll.getScrollHeight()
      //2. 取消函数监听
      this.$bus.$off('itemImgLoad', this.homeItemListener)
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.homeHeight, 0)
      this.$refs.scroll.refresh()
    }

  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    /*vh: 视口高度*/
    position: relative;
  }

  .home-nav-bar {
    background-color: var(--color-tint);
    color: #fff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
    /* 浏览器原生滚动时使用 */

  }

  .home-tab-control {
    /*!*两个要混合使用*!*/
    /*position: sticky;*/
    /*top: 44px;!*顶部navbar的高度*!*/
    /*z-index: 9;*/  /*只有在原生的滚动才能生效*/

    /* 在Better-scroll下 */
    position: relative;
    z-index: 9;
  }

  /*.TcFixed {*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /*height: 300px;
    overflow: hidden;*/
  }

  /*.content {*/
  /*height: calc(100% - 93px);*/
  /*overflow: hidden;*/
  /*margin-top: 44px;*/
  /*}*/

</style>
