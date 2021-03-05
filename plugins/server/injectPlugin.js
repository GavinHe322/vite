const { readBody } = require('./utils')

module.exports = function ({ root, app}) {
  const inject = `
    <script>
      window.process = {
        env: {
          NODE_ENV: 'development'
        }
      }
    </script>
  `

  app.use(async (ctx, next) => {
    await next()

    if (ctx.response.is('html')) {
      let html = await readBody(ctx.body)
      ctx.body = html.replace(/<head>/, `$&${inject}`)
    }
  })
}
