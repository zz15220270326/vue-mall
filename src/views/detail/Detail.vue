<template>
  <div id="detail">
    <!--1. 顶部导航-->
    <detail-nav-bar class="detailNav"></detail-nav-bar>
    <!-- 2. 滚动区域 - BS -->
    <scroll class="content" ref="scroll">
      <!-- 3. 详情页轮播图 -->
      <detail-swiper :top-images="topImages" v-if="this.topImages.length > 0"></detail-swiper>
      <!-- 4. 详情页商品基本信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 5. 详情页店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 6. 详情页商品详细信息 -->
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <!-- 7. 详情页商品参数信息 -->
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <!-- 8. 详情页商品评论信息 -->
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <!-- 9. 详情页的推荐数据 -->
      <good-lists :goods="recommend"></good-lists>
    </scroll>


  </div>
</template>

<script>
  //导入组件相关内容
  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailParamInfo from "./childComponents/DetailParamInfo";
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";
  import GoodLists from "components/content/goods/GoodLists";

  //导入数据相关内容
  import {getDetail,getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListener} from "common/mixins";

  //引入滚动
  import Scroll from "components/common/scroll/Scroll";


  export default {
    name: "Detail.vue",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodLists,

      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        detailItemListener: null
      }
    },
    mixins:[itemListener],
    created() {
      // console.log(this.$route.params)
      //1. 保存iid
      /*this.iid = this.$route.params.iid*/
      this.iid = this.$route.query.iid
      //2. 根据详情页请求相应的数据
      getDetail(this.iid)
        .then((result) => {
          // 分离数据
          // console.log(result)
          // 1. 顶部数据: 1.轮播图
          // console.log(result.result.itemInfo.topImages);
          const data = result.result

          this.topImages = data.itemInfo.topImages;

          // 2. 获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          // 3. 创建店铺信息对象
          this.shop = new Shop(data.shopInfo)

          // 4. 保存商品的详情数据
          this.detailInfo = data.detailInfo
          // console.log(this.detailInfo);

          // 5. 商品参数信息的展示
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          //6. 获取评论信息的展示
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }

        }).catch((error) => {
            console.log(error);
      })
      getRecommend()
        .then(result => {
          // console.log(result);
          this.recommend = result.data.list;
        })
        .catch(error => {
          console.log(error);
        })
    },
    mounted() {

    },
    destroyed() {
      this.$bus.$off('itemImgLoad',this.detailItemListener)
    },
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detailNav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
