<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="tab">
      <div class="tab-div1"></div>
      <div class="tab-div2">
        <tab-control :titles="['流行','新款','精选']"></tab-control>
      </div>
    </div>
  </div>
</template>

<script>
  // import components
  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tab-control/TabControl";

  export default {
    name: "Category",
    components: {
      NavBar,
      TabControl
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .tab {
    /*width: 100vw;*/
    display: flex;
  }
  .tab .tab-div1 {
    width: 25%;
    background-color: #fff;
  }
  .tab .tab-div2 {
    width: 75%;
  }
</style>