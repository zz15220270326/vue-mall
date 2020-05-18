<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
          <img slot="item-icon" src="~assets/img/tab-bar/home.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tab-bar/home-alive.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="~assets/img/tab-bar/category.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tab-bar/category-alive.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-icon" src="~assets/img/tab-bar/cart.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tab-bar/cart-alive.png" alt="">
        <div slot="item-text">购物车</div>
        <div></div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="~assets/img/tab-bar/profile.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tab-bar/profile-alive.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  /*导入路径1*/
  // import TabBar from "../tab-bar/TabBar";
  // import TabBarItem from "../tab-bar/TabBarItem";
  /*导入路径2*/
  import TabBar from "@/components/common/tab-bar/TabBar";
  import TabBarItem from "@/components/common/tab-bar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>