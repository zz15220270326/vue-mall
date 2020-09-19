<template>
  <div class="goods">
    <good-lists-item v-for="(item, index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodListsItem from "./GoodListsItem";

  export default {
    name: "GoodLists",
    components:{
      GoodListsItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>
