const Koa = require('koa')
const serveStaticPlugin = require('./plugins/server/serveStaticPlugin')
const rewriteModulePlugin = require('./plugins/server/rewriteModulePlugin')
const moduleResolvePlugin = require('./plugins/server/moduleResolvePlugin')

module.exports = function createServer() {
  const app = new Koa()
  const root = process.cwd()

  const context = {
    app,
    root
  }

  const plugins = [
    // 重写模块路径 'vue' => '/@modules/vue
    rewriteModulePlugin,
    // 导入模块
    moduleResolvePlugin,
    // 配置静态资源
    serveStaticPlugin,
  ]

  plugins.forEach(plugin => plugin(context))

  return app
}
