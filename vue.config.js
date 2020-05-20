module.exports = {
  configureWebpack: {
    resolve:{
      extensions:[],
      alias:{
        //@:src
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        //不引用router、store了: 只需一次引用
        //this.$router this.$store
      }
    }
  },
  //configureWebpack: {},
  devServer: {
    //host: '0.0.0.0',
    //port: 8080,
    //查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
    proxy: null, // string | Object
    public: '0.0.0.0:8080',
    disableHostCheck: true,
    before(app){}
  }
}
