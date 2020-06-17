import {debounce} from "./utils";
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