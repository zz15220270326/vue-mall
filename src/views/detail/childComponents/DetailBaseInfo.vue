<template>
  <div class="baseInfo" v-if="Object.keys(goods).length !== 0">
    <div class="titleInfo">{{goods.title}}</div>
    <div class="price">
      <span class="newPrice">{{goods.newPrice}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="otherInfo">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="serviceInfo">
      <span v-for="index in goods.services.length-1" :key="index" class="serviceInfoItem">
        <img :src="goods.services[index-1].icon" >
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props:{
      goods:{
        type: Object,
        default() {
          return {}
        },
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>

<style scoped>
  .baseInfo {
    margin-top: 15px;
    padding:0 8px;
    color: #999;
    border-bottom: 5px solid rgba(0,0,0,0.1);
  }
  .titleInfo {
    color: #222;
  }
  .price {
    margin-top: 10px;
  }
  .price .newPrice{
    font-size: 24px;
    color: orange;
    margin-left: 10px;
  }
  .price .oldPrice{
    font-size: 13px;
    margin-left: 15px;
    text-decoration: line-through;
  }
  .price .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: orangeRed;
    border-radius: 8px;
    margin-left: 15px;
    position: relative;
    top: -8px;
  }
  .otherInfo {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.2);
    justify-content: space-between;
  }
  .serviceInfo {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }
  .serviceInfoItem img {
    width: 15px;
    height: 15px;
    position: relative;
    top: 2px;
  }
  .serviceInfoItem span {
    font-size: 12px;
    color: #333;
  }

</style>