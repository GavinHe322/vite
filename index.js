const Koa = require('koa')
const serveStaticPlugin = require('./plugins/server/serveStaticPlugin')

module.exports = function createServer() {
  const app = new Koa()
  const root = process.cwd()

  const context = {
    app,
    root
  }

  const plugins = [
    // 配置静态资源
    serveStaticPlugin
  ]

  plugins.forEach(plugin => plugin(context))

  return app
}