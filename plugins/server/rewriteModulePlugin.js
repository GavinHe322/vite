const { readBody } = require('./utils')
const { parse } = require('es-module-lexer')
const MargicString = require('magic-string')

function rewriteImports(content) {
  imports = parse(content)[0]
  magicString = new MargicString(content)
  if (imports.length) {
    imports.forEach((item) => {
      const { s, e } = item
      let id = content.substring(s, e)
      const reg = /^[^\/\.]/
      if (reg.test(id)) {
        id = `/@modules/${id}`
        magicString.overwrite(s, e, id)
      }
    })
  }
  return magicString.toString()
}

module.exports = function({ app, root }) {
  app.use(async (ctx, next) => {
    await next()

    if (ctx.body && ctx.response.is('js')) {
      const content = await readBody(ctx.body)
      ctx.body = rewriteImports(content)
    }
  })
}
