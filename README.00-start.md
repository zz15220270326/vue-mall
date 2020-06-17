1. 提交代码到github中(拷贝)
   1. copy Project's code (no .git&&node_modules)
   2. 拷贝GitHub工程ID  （Clone or download） -----ProjectURL
   3. git clone ProjectURL   ------GitFolder
   4. paste 1. to GitFolder
   5. git add .
      git commit -m ""
      git push
2. 提交代码到github中(git同步)
   在脚手架3目录下输入
          git remote add origin https://github.com/zz15220270326/vue-mall.git
          git push -u origin master
3. 当有一个新的项目时：
  1. 划分目录结构

  2. 引用了两个css文件

  3. vue.config.js(设置别名便捷路径和网路地址)和editorconfig.js(很重要的文件，项目书写规范--便于维护)

  4. 将项目进行模块划分: tab-bar -> 路由映射关系

4.项目细分结构开发(首页、分类、购物车、我的)
