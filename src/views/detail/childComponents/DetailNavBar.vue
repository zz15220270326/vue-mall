<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backHome" class="backHome">
        <img src="~assets/img/common/back.svg" alt=""/>
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
          class="titleItem"
          :key="index"
          :class="{isActive: currentIndex === index}"
          @click="titleClick(index)"
        >
          {{item}}
        </div>
      </div>
      <div slot="right" class="to-cart" @click="toCart">
        <img src="~assets/img/detail/cart.png" alt="">
      </div>
    </nav-bar>
  </div>
</template>

<script>
  //导入组件
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0,
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index)
      },
      backHome() {
        this.$router.back()
      //  this.$router.go(-1)
      },
      toCart() {
        this.$router.push('/cart')
      },
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .titleItem {
    flex: 1;
    padding: 5px 5px;
  }
  .isActive {
    color: var(--color-high-text);
  }
  .backHome img {
    margin-top: 12px;
    width: 20px;
    height: 20px;
  }
  .to-cart img {
    margin-top: 12px;
    right: 10px;
    width: 25px;
    height: 25px;
  }
</style>