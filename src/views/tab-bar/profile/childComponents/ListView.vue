<template>
  <div id="list-view">
    <div v-for="item in listData" :style="{backgroundColor: item.iconColor}" class="icon">
        <!--<svg :fill="item.iconColor">
          <use :xlink:href="item.icon"></use>
        </svg>-->
        <img :src="item.icon" alt="">
        <span class="info">{{item.info}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListView",
    props: {
      listData: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  #list-view {
    background-color: rgba(0, 0, 0, 0.2);
    font-size: 18px;
    color: #333;
  }

  #list-view .icon {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .icon img {
    margin: 2px 8px;
    width: 20px;
    height: 20px;
  }

  .item .info {
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }

  .item:last-of-type .info {
    border-bottom: none;
  }
</style>