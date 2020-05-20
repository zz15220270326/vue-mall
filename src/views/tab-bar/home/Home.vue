<template>
  <div id="home">
    <!--  nav-bar  -->
    <nav-bar class="home-nav-bar">
      <div slot="center">我的购物</div>
    </nav-bar>
    <!--  HomeSwiper  -->
    <home-swiper :banner="banner"></home-swiper>
    <!--  HomeRecommendView  -->
    <home-recommend-view :recommend="recommend"></home-recommend-view>
    <!--  HomeFeatureView  -->
    <home-feature-view></home-feature-view>
    <tab-control :titles="['流行','新款','精选']" class="home-tab-control"></tab-control>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
  //插入组件
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComponents/HomeSwiper";
  import HomeRecommendView from "./childComponents/HomeRecommendView";
  import HomeFeatureView from "./childComponents/HomeFeatureView";
  import TabControl from "components/content/tab-control/TabControl";

  //获取network数据
  import {
    getHomeMultiData,
    getGoodsData
  } from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      TabControl
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
        }
      }
    },
    created() {
      //1. 请求多个数据
      getHomeMultiData()
        .then(result => {
          // console.log(result); //检验是否成功请求数据
          this.banner = result.data.banner.list
          this.recommend = result.data.recommend.list
        })
        .catch(error => {
          console.log(error);
        })
      getGoodsData()
        .then(result => {
          console.log(result);
        }).catch(error => {
          console.log(error);
      })

    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav-bar {
    background-color: var(--color-tint);
    color:#fff;

    position: fixed;
    left: 0;
    right:0;
    top: 0;
    z-index: 9;

  }

  .home-tab-control{
    /*两个要混合使用*/
    position: sticky;
    top: 44px;/*顶部navbar的高度*/
    z-index: 9;
  }

  .home-scroller{
    /*height:300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>