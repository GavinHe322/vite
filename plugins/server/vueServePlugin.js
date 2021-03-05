const path = require('path')
const { readFile } = require('fs').promises
const defaultExportRE = /((?:^|\n|;)\s*)export default/

function getCompilerPath(root) {
  const compilerPkgPath = path.join(root, 'node_modules', '@vue/compiler-sfc/package.json')
  const compilerPkg = require(compilerPkgPath)
  return path.join(path.dirname(compilerPkgPath), compilerPkg.main)
}

module.exports = function({ app, root }) {
  app.use(async (ctx, next) => {
    const filepath = path.join(root, ctx.path)
    if (!ctx.path.endsWith('.vue')) {
      return next()
    }

    // 处理文件内容
    const content = await readFile(filepath, 'utf8')

    const { parse, compileTemplate } = require(getCompilerPath(root))

    console.log(root, compileTemplate)
    
    const { descriptor } = parse(content)

    if (!ctx.query.type) {
      let code = ''

      if (descriptor.script) {
        let content = descriptor.script.content
        
        let replaced = content.replace(defaultExportRE, '$1const _script = ')
        code += replaced
      }
      if (descriptor.template) {
        const templateRequest = ctx.path + '?type=template'
        code += `\nimport { render as _render } from ${JSON.stringify(templateRequest)}`
        code += `\n_script.render = _render`
      }
      ctx.type = 'js'
      code += `\nexport default _script`
      ctx.body = code
    }
    if (ctx.query.type === 'template') {
      ctx.type = 'js'
      let content = descriptor.template.content
      const { code } = compileTemplate({ source: content })
      ctx.body = code
    }
  })
}
