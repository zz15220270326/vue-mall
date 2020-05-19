<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banner" :key="item">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  //引入组件
  import {Swiper,SwiperItem} from "components/common/swiper"

  export default {
    name: "HomeSwiper",
    props: {
      banner: {
        type: Array,
        default() {
          return []
        }   //默认类型为函数,返回空的Array
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .el-carousel-item img{
    height:100%;
    width:100%;
    overflow: hidden;
    background-size:cover;
  }
</style>