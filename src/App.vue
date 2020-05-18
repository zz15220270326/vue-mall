<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  //引入主要的外部组件
  import MainTabBar from "components/content/main-tab-bar/MainTabBar";

  //引入network相关的内容
  import {getHomeMultiData} from "./network/home";

  export default {
    name: 'App',
    components: {
      MainTabBar
    },
    data() {
      return {
        // homeResult: null,
        banner: [],
        recommend: [],
      }
    },
    created() {
      //1. 请求多个数据
      getHomeMultiData()
        .then(result => {
          console.log(result);
          this.banner = result.data.banner
          this.recommend = result.data.recommend
        })
        .catch()

    }
  }

</script>

<style>
  @import './assets/css/base.css';
</style>
