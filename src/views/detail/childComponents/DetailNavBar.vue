<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backHome" class="backHome">
        <img src="~assets/img/common/back.svg" alt=""/>
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="titleItem"
             :class="{isActive: currentIndex === index}"
             @click="titleClick(index)">{{item}}</div>
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
      }
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
</style>