<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view/>
    </keep-alive>
    <main-tab-bar>
      <div slot="center">我的购物</div>
    </main-tab-bar>
  </div>
</template>

<script>
  //引入主要的外部组件
  import MainTabBar from "components/content/main-tab-bar/MainTabBar";



  export default {
    name: 'App',
    components: {
      MainTabBar,
    },

  }

</script>

<style>
  @import './assets/css/base.css';
</style>
