<template>
<!--  ref一般绑定给子组件  -->
  <!--ref绑定在组件中,this.$refs.组件名 获取到的是一个组件对象-->
  <!--ref绑定在普通元素中,this.$refs.元素名 获取到的是一个元素对象-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default() {
          return 0
          //return 1
        }
      },
      pullUpLoad: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return{
        scroll: null,
        
      }
    },
    mounted() {
      // 创建scroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 监听滚动的位置(竖直方向)
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',(position) => {
          // console.log(position.y);
          this.$emit('heightDetect',position.y)
        })
      }
      // 监听Scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          // console.log('滚动到底部');
          this.$emit('loadMore')
        })
      }

    },
    methods: {
      scrollTo(x, y, time = 500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
        //逻辑与&&: 判断是否可以执行后面的操作
      },
      refresh() {
        // console.log('图片加载完成!');
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollHeight() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
