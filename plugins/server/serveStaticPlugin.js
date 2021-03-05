const KoaStatic = require('koa-static')
const { resolve } = require('path')

module.exports = (context) => {
  const { root, app } = context
  app.use(KoaStatic(root))
  app.use(KoaStatic(resolve(root, 'public')))
}
