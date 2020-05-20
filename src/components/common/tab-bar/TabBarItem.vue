<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle" >
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path: String,
      activeColor:{
        type: String,
        default:'skyblue'
      }
    },
    computed:{
      //判断当前活跃的路由
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    methods: {
      itemClick() {
        this.$router.push(this.path)
        //replace push
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;/*移动端开发规范*/
    font-size:12px;
    margin-top: 3px;
    vertical-align: middle;
  }
  .tab-bar-item img {
    width: 20px;
    height: 20px;
  }
  .active {
    color: skyblue;
  }
</style>