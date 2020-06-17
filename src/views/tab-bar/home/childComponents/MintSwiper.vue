<template>
  <div>
    <mt-swipe :auto="0" >
      <mt-swipe-item v-for="item in banner" >
        <a :href="item.link" class="swiper-item">
          <img :src="item.image" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>

  export default {
    name: "MintSwiper",
    props: {
      banner: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .swiper-item {
    position: absolute;
  }
  .swiper-item img {
    width: 100%;
  }
</style>