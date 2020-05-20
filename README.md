1. 提交代码到github中(拷贝)
   1. copy Project's code (no .git&&node_modules)
   2. 拷贝GitHub工程ID  （Clone or download） -----ProjectURL
   3. git clone ProjectURL   ------GitFolder
   4. paste 1. to GitFolder
   5. git add
      git commit -m ""
      git push
2. 提交代码到github中(git同步)
   在脚手架3目录下输入
          git remote add origin https://github.com/zz15220270326/vue-mall.git
          git push -u origin master
3. 当有一个新的项目时：
  1. 划分目录结构
  
  2. 引用了两个css文件
  
  3. vue.config.js和editorconfig.js(很重要的文件，项目书写规范--便于维护)
  
  4. 将项目进行模块划分: tab-bar -> 路由映射关系

4.项目细分结构开发(首页、分类、购物车、我的)
  首页: 
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
      
