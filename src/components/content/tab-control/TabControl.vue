<template>
  <div class="tab-control ignore">
    <div
      v-for="(item, index) in titles"
      :key="item"
      class="tab-control-item"
      :class="{active:index === currentIndex}"
      @click="tabItemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles:{
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods:{
      tabItemClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
  .active {
    color: var(--color-high-text);
  }
</style>

<!--<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: #fff;
  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    border-bottom: 2px solid var(&#45;&#45;color-tint);
    color: var(&#45;&#45;color-high-text);
  }

</style>-->

