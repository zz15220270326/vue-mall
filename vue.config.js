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
  }
}
