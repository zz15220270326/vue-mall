<template>
  <div class="goods-item">
    <img v-lazy="showImage" alt="" @load="imageLoad" @click="itemClick">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodListsItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img  // 前后顺序
      }
    },
    methods: {
      imageLoad() {
        // console.log('imgLoad');
        // console.log(this.$bus);
        // 1. 使用路由
        /*if (this.$route.path.indexOf('/home')) {
          this.$bus.$emit('itemImgLoad')
        }
        else if(this.$route.path.indexOf('/detail')) {
          this.$bus.$emit('itemImgLoad')
        }*/
        this.$bus.$emit('itemImgLoad')

      },
      itemClick() {
        console.log('跳转到详情页面');
        /*this.$router.push("/detail/" + this.goodsItem.iid)*/
        this.$router.push({
          path: '/detail',
          query: {
            iid: this.goodsItem.iid
          }
        })
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  /*子爵父相*/

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
      /* 伪元素放置图片 */
  }
</style>