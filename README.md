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
  
  3.vue.config.js和editorconfig.js(很重要的文件，项目书写规范--便于维护)
  
  4.将项目进行模块划分: tab-bar -> 路由映射关系

4.项目细分结构开发(首页、分类、购物车、我的)
  首页: 
    1.轮播图
      1.设置网络请求
      network -> request.js  
      -> home.js 设置返回数据 
      ->Home.vue import 实现生命周期函数created(),在created中接收result中赋值给banner和command
      2.引入swiper组件(folder)到common中
      3.在Home.vue中创建同级的文件夹childComponents管理Home中的组件,并在childComponents中创建HomeSwiper.vue
      4.在HomeSwiper.vue中引入Swiper(folder)中的Swiper和SwiperItem
      
