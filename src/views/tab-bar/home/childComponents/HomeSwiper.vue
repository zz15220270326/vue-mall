<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banner" :key="index" >
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperLoad">
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
    data() {
      return {
        isLoad: false   //是否正在加载
      }
    },
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
    },
    methods: {
      swiperLoad() {
        // console.log('------')
        if (!this.isLoad) {
          this.$emit('swiperImgLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>