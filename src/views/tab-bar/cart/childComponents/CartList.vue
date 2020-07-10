<template>
  <div class="cartList">
    <!-- 列表-->
    <scroll class="content" ref="scroll">
      <!--<div v-for="item in cartList">{{item}}</div>-->
      <cart-list-item v-for="(item, index) in cartList" :product="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  // import mapGetters
  import { mapGetters } from 'vuex'
  // import Scroll
  import Scroll from "components/common/scroll/Scroll";
  // import item
  import cartListItem from "./cartListItem";
  export default {
    name: "CartList",
    components: {
      Scroll,
      cartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      // console.log('cart activated');
      // this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cartList {
    height: 100vh;

  }
  .content {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
  /*.cartList {*/
  /*  height: calc(100% - 44px - 49px);*/
  /*}*/
  /*.content {*/
  /*  overflow: hidden;*/
  /*  height: 100%;*/
  /*}*/
</style>