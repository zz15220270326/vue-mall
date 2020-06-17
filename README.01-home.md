4.1 首页开发
    1. 轮播图Swiper
      1. 设置网络请求
      network -> request.js  
      -> home.js 设置返回数据
      ->Home.vue import 实现生命周期函数created(),在created中接收result中赋值给banner和command
      2. 引入swiper组件(folder)到common中
      3. 在Home.vue中创建同级的文件夹childComponents管理Home中的组件,并在childComponents中创建HomeSwiper.vue
      4. 在HomeSwiper.vue中引入Swiper(folder)中的Swiper和SwiperItem
    2. 推荐栏Recommend
      1. 在Home-ChildComponents中创建HomeRecommend.vue
      2. 设置props获取Home.vue中recommend中的数据,并通过循环遍历展示数据
        HomeRecommend.vue:
        html:
          <div class="home-recommend">
            <div class="home-recommend-item" v-for="item in recommend">
              <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
              </a>
            </div>
          </div>
        js:
          props:{
            recommend:{
              type: Array,
              result() {
                return []
              }
            }
          }
        style:
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
        Home.vue引入注册挂载HomeRecommend.vue(定义props)
      3. HomeFeature(引入图片)
        1. 在Home-ChildComponents中创建HomeFeature.vue
        2. HomeFeature.vue：
        <div class="feature">
          <!-- Feature dev -->
          <a href="https://act.mogujie.com/zzlx67">
            <img src="~assets/img/home/recommend_bg.jpg" alt="">
          </a>
        </div>
        3. 在Home.vue中引用
        4. 主页数据请求
           1. 数据结构
        (一次请求data)
        let goods(pop, new, sell)
        goods: {
          'pop': {page: 0, list: {}}
          'new': {page: 0, list: {}}
          'sell': {page: 0, list: {}}
        }
           2. 数据请求
        1.在network - home.js中添加:
        export function getGoodsData(type, page) {
          return request({
            url:'/home/data',
            params: {
              type,
              page
            }
          });
        }
        2.Home.vue中:
        import {getGoodsData} from "network/home.js"
        在data中添加goods变量存放商品数据:
        goods:{
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        let page = this.goods[type].page + 1     //存放当前的页码数        
        getGoodsData(type,page)
          .then(result => {
            this.goods[type].list.push(...result.data.list)  //把当前请求到的商品list添加到goods的list中
            this.goods[type].page += 1  //请求完数据后的goods[type].page +1
          })
           3. 数据展示
        动态获取数据展示:
            在Home.vue中:
                data() {
                  return {
                    currenttype: 'pop'
                  }
                }
                computed: {
                  goodsShow() {
                    return this.goods[this.currentType].list
                  }
                }
                tab-control中定义事件tabClick
                methods: {
                  tabClick(index) {
                    switch(index) {
                      case 0:{
                        this.currentType = 'pop'
                        break
                      }
                      case 1:{
                        this.currentType = 'new'
                        break
                      }
                      case 2:{
                        this.currentType = 'sell'
                        break
                      }
                    }
                  }
                }
                在GoodLists组件中:
                <tab-control/ @tabClick="tabClick">
                <good-lists :goods=goodsShow></good-lists>
            在GoodLists组件中:
                <div class="goods">
                  <good-lists-item v-for="item in goods" :goods-item="item"/>
                </div>
                props:{
                  goods:{
                    type: Array,
                    default() {
                      return []
                    }
                  }
                }
            在GoodListsItem中:
                <div class="goods-item">
                  <img :src="goodsItem.show.img" alt="">
                  <div class="goods-info">
                    <p>{{goodsItem.title}}</p>
                    <span class="price">{{goodsItem.price}}</span>
                    <span class="collect">{{goodsItem.cfav}}</span>
                  </div>
                </div>
                props: {
                  goodsItem: {
                    type: Object,
                    default() {
                      return {}
                    }
                  }
                }
        4. Better-scroll滚动重构
            src -> components -> common -> scroll>Scroll.vue
            在Home.vue中引入Scroll.vue组件，并将滚动的部分放置到<scroll></scroll>
              Scroll.vue:
                import BScroll from 'better-scroll'
                 this.scroll = new BScroll(this.$refs.wrapper,{
                      })
              Home.vue:
                import Scroll from "components/common/scroll/Scroll"
                注册Scroll
                将滚动的部分放置到<scroll></scroll>
        5. BackTop组件的封装
          1.挂载
          注册组件: components-content -> folder"back-top"->BackTop.vue
                    add image&set style
          在Home.vue中使用: 注册 使用
          2.使用(点击回到顶部)
          在Scroll组件中绑定事件，然后将事件传出到Home.vue中实现回到顶部
          Home.vue:
          <scroll/ ref="scroll">
          @click="backTopClick"
          backTopClick() {
            this.$refs.scroll.scrollTo(0,0)
          }
        6. 上拉加载更多(上)
        7. 解决滚动bug
          问题: 数据没有请求完成，不能往下滚动
          // 检测滚动bug --scrollerHeight
          // console.log(this.scroll);
          原因: Better-scroll有多少区域可滚动，是根据放在Better-scroll中的content的子组件的高度所决定的(scrollerHeight)
                而刚开始scrollerHeight不包含图片的高度
          解决思路:
            1. 监听每一张图片是否加载完成，只要加载一张图片就执行一次refresh
                 监听图片:
                   1.原生js: document.querySelector('img').onload = function() {}
                   2.vue.js: @load="imgLoad" 实现imgLoad方法
          解决方案:
            1. 组件通信
            2. Vuex
            3. 事件总线 this.$bus.$emit('aaa')   el:this.$bus.$on('aaa')
              Vue.protoType.$bus = new vue()
         8. 防抖动函数(提高性能),减少对服务器的请求
           防抖函数: debounce / 节流函数: throttle (了解)
             防抖函数: debounce的执行过程:
               # 如果直接执行refresh，则页面或执行多次
               # 可以将refresh放进防抖函数: debounce中，生成一个新的函数
               代码实现:
                 methods: {
                   debounce(func, delay) {
                     let timer = null
                     return function(...args) {
                       if(timer) clearTimeout(timer)
                       timer = setTimeout(() => {
                         func.apply(this, args)
                       },delay)
                     }
                   }
                 }
                mounted: {
                  const refresh = this.debounce(this.$refs.scroll.refresh,500)
                  this.$bus.$on('itemImgLoad',() => {
                    refresh()
                  })
                }
         9. 上拉加载更多(后)
            1. 先定义一个props: pullUpLoad 类型为Boolean且默认返回值为false
              pullUpload: {
                type: Boolean,
                default: false
              },
              mounted() {
                pullUpLoad: this.pullUpLoad
              }  
              <scroll :pull-up-load="true"></scroll>    (父传子)
            2. 定义一个函数，将上拉加载更多的信息传递到Home.vue中
              Scroll.vue
              mounted() {
                if(this.pullUpLoad) {
                  this.scroll.on('pullingUP',() => {
                    this.$emit('loadMore')
                  })
                }
              },
              Home.vue:
              <scroll @loadMore="loadMore"></scroll>
              methods: {
                loadMore() {
                  this.getGoodsData(this.currentType)
                },
              }                            (子传父)
            3.完成下一次的加载
              Home.vue:
              methods: {
                getGoodsData() {
                  ...
                  //继续下一次的加载
                  this.$refs.scroll.finishPullUp()
                }
              } 
              Scroll.vue:
                finishPullUp() {
                  this.scroll.finishPullUp()
                }
         10. tab-control的"吸顶"效果
           1. 需要知道滚动到多少才有吸顶效果(tab-control - offsetTop)
              不能直接从mounted中获取offsetTop(图片可能还没加载出来)
              从HomeSwiper中img中加载完成(主要原因)
              加载完成后 发出事件 在Home.vue中获取到正确的值
              防止多次加载: 监听@load="loadConfirm"
           2. 监听滚动,动态改变tabControl的样式
             复制tabControl到nav-bar下面
             <nav-bar>...</nav-bar>   (把position: fixed;...属性去掉)
             <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="home-tab-control" v-show="ifTcFixed"></tab-control>
             <scroll>
               ...
               <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" class="home-tab-control"></tab-control>
             </scroll>
             .home-tab-control {
               position: relative;
               z-index: 9;
             }
             data() {
               return {
                 ...
                 ifTcFixed: false;
               }
             }
             methods: {
               heightDetect(height) {
                 //1. 判断backTop是否显示
                 this.isShowBackTop = (-height) > 800
                 //2. 决定tabControl是否吸顶
                 this.ifTcFixed = (-height) > this.tcOffsetTop
               },
             }
           11. Home: 保持原来的状态
             1. 让Home不能随意销毁 (keep-alive)
             2. 让Home保持原来的位置
               思路:
                 1.离开时,保存一个值homeHeight
                 2.进来时，将位置设值成原来的位置即可