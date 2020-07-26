module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,    // 视口宽度
      viewportHeight: 667,   // 视口高度
      unitPrecision: 5,      // 指定转发为px的小数位数
      viewportUnit: 'vw',    // 转化的视口单位
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要更换的类(如tab-bar、或nav-bar等等)
      minPixelValue: 1,      // 小于或等于1px不转换视窗单位
      mediaQuery: false      //  允许在媒体查询中转换px
    }
  }
}
