<template>
  <div>
    <nav-bar class="home-nav-bar">
      <div slot="center">我的购物</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
  </div>
</template>

<script>
  //插入组件
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComponents/HomeSwiper";

  //获取network数据
  import {getHomeMultiData} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper
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
          // console.log(result); //检验是否成功请求数据
          this.banner = result.data.banner.list
          this.recommend = result.data.recommend.list
        })
        .catch(error => {
          console.log(error);
        })

    }
  }
</script>

<style scoped>
  .home-nav-bar {
    background-color: var(--color-tint);
    color:#fff;

    position: fixed;
    left: 0;
    right:0;
    top: 0;
    z-index: 9;
  }

</style>