const Koa = require('koa')
const serveStaticPlugin = require('./plugins/server/serveStaticPlugin')
const rewriteModulePlugin = require('./plugins/server/rewriteModulePlugin')
const moduleResolvePlugin = require('./plugins/server/moduleResolvePlugin')
const vueServePlugin = require('./plugins/server/vueServePlugin')
const injectPlugin = require('./plugins/server/injectPlugin')

module.exports = function createServer() {
  const app = new Koa()
  const root = process.cwd()

  const context = {
    app,
    root
  }

  const plugins = [
    // 注入需要的代码
    injectPlugin,
    // 重写模块路径 'vue' => '/@modules/vue
    rewriteModulePlugin,
    // 解析 .vue 文件
    vueServePlugin,
    // 导入模块
    moduleResolvePlugin,
    // 配置静态资源
    serveStaticPlugin
  ]

  plugins.forEach(plugin => plugin(context))

  return app
}
