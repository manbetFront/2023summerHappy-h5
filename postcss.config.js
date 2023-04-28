//vw适配方案参考： https://www.jianshu.com/p/f056a21d7e33
// npm i postcss-import postcss-url postcss-aspect-ratio-mini postcss-write-svg postcss-cssnext postcss-px-to-viewport postcss-viewport-units cssnano cssnano-preset-advanced -D
module.exports = {
  "plugins": {
    "postcss-import": {},//postcss-import主要功有是解决@import引入路径问题。使用这个插件，可以让你很轻易的使用本地文件、node_modules文件
    "postcss-url": {},//该插件主要用来处理文件，比如图片文件、字体文件等引用路径的处理。在Vue项目中， vue-loader 已具有类似的功能
    // "autoprefixer": {},
    "postcss-aspect-ratio-mini": {},//主要用来处理元素容器宽高比。在实际使用的时候，具有一个默认的结构。
    "postcss-write-svg": {//该插件主要用来处理移动端1px的解决方案。该插件主要使用的是border-image和background来做1px的相关处理。
      utf8: false
    },
    "postcss-cssnext": {},//处理css新特性兼容
    "postcss-px-to-viewport": {//主要用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位，也是vw适配方案的核心插件之一
      viewportWidth: 828, // 容器宽度，也可以看作设计图的宽度
      viewportHeight: 1334, // 容器高度，可以不配置
      unitPrecision: 3, // px转换为vw后保留的小数位
      viewportUnit: 'vw', // px需要转换成的单位，使用vw
      selectorBlackList: ['.ignore', '.hairlines'], // 不需要转换为其他单位的的class类
      exclude: /(\/|\\)(node_modules)(\/|\\)/,//排除编译第三方插件样式，需要避免px转vw
      minPixelValue: 1, // 小于等于1px不转换
      mediaQuery: false // 是否允许在媒体查询中使用px
    },
    "postcss-viewport-units": {},//插件主要是给CSS的属性添加content的属性，配合viewport-units-buggyfill库给vw、vh、vmin和vmax做适配的操作。
    "cssnano": {//主要用来压缩和清理CSS代码。在Webpack中，cssnano和 css-loader捆绑在一起，所以不需要自己加载它
      "cssnano-preset-advanced": {
        zindex: false,
        autoprefixer: false
      },
      /** 把autoprefixer和postcss-zindex禁掉了。前者是有重复调用，后者只要启用了，z-index的值就会重置为1,因此需要禁用。 **/
    }
  }
}