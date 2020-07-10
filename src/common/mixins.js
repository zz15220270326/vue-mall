import {debounce} from "./utils";

import BackTop from "components/content/back-top/BackTop";

export const itemListener = {
  data() {
    return {
      detailItemListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,500)

    this.detailItemListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad',this.detailItemListener)
    console.log("混入！");
  }
}

export const backTopMixIns = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }
}