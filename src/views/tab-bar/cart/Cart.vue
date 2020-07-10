<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!--商品列表-->
    <cart-list></cart-list>
    <!--底部计算工具栏-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  // 导入组件
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComponents/CartList";
  import CartBottomBar from "./childComponents/CartBottomBar";
  // 导入数据
  //..
  // 从Vuex中导入mapGetters    辅助函数    将store中的getters映射到局部的计算属性中
  import { mapGetters } from "vuex"

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // 1.
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }
      // 两种语法    数组语法    对象语法
      // ...mapGetters(['cartLength', 'cartList'])    // .....cartLength
      ...mapGetters({
        length: 'cartLength'
      })
    },
    activated() {

    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 500;
  }
</style>
