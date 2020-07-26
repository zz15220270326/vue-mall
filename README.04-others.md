1. 移动端解决300s延迟(fastClick):
   安装: npm install fastclick --save / npm install fastclick -S
   使用: main.js:
          import fastClick from "fastClick"
          fastClick.attach(document.body)
2. 图片懒加载
   安装: npm install vue-lazyload --save / npm install vue-lazyload -S
   使用: main.js:
          import VueLazyLoad from "vue-lazyload"
          Vue.use(VueLazyLoad, {
            loading: require('./assets/img/common/placeHolder.png')
          })
   当遇到需要懒加载的图片时，只需要将":src"改成"v-lazy"即可
3. px2vw-css单位转化插件
   安装: npm install postcss-px-to-viewport --save-dev / npm install postcss-px-to-viewport -D
   使用: 在postcss.config.js中配置:
   "postcss-px-to-viewport": {
     viewportWidth: 375,    // 视口宽度
     viewportHeight: 667,   // 视口高度
     unitPrecision: 5,      // 指定转发为px的小数位数
     viewportUnit: 'vw',    // 转化的视口单位
     selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要更换的类(如tab-bar、或nav-bar等等)
     minPixelValue: 1,      // 小于或等于1px不转换视窗单位
     mediaQuery: false      //  允许在媒体查询中转换px
   }
4. nginx反向代理服务器:
   1. nginx官网：nginx.org
      下载：stable version,根据操作系统下载解压即可
      使用: 点击"nginx.exe"即可启动nginx服务器
   2. 打包项目: npm run build
      1.1. 将打包后的dist内的所有文件cv到nginx的html中
      1.2. 直接将dist复制到nginx的文件夹中,然后修改nginx.conf:
            将默认路径"html"改成"dist"
      2. 在chrome中输入"localhost"即可
   3. nginx在远程linux服务器上的部署
