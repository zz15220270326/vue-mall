<template>
    <swiper class="detailSwiper">
      <swiper-item v-for="item in topImages" :key="item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
  //导入组件
  /*import SwiperItem from "components/common/swiper/SwiperItem";
  import Swiper from "components/common/swiper/Swiper";*/
  import {Swiper, SwiperItem} from "components/common/swiper"

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {}
    },
    props:{
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .detailSwiper {
    /*height: 400px;*/
    overflow: auto;
  }

</style>