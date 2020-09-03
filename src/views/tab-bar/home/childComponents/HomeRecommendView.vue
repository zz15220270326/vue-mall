<template>
  <div class="home-recommend">
    <div class="home-recommend-item" v-for="item in recommend">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props: {
      recommend: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .home-recommend{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
    font-size: 12px;
  }

  .home-recommend-item{
    flex: 1;
  }

  .home-recommend-item img{
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    border-radius: 100%;

  }
</style>
