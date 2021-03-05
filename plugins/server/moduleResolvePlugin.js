const path = require('path')
const moduleReg = /^\/@modules\//
const fs = require('fs').promises

function resolveVue(root) {
  const compilerPkgPath = path.join(root, 'node_modules', '@vue/compiler-sfc/package.json')
  const compilerPkg = require(compilerPkgPath)
  const compilerPath = path.join(path.dirname(compilerPkgPath), compilerPkg.main)

  // 用于解析其他模块路径
  const resolvePath = (name) => path.join(root, 'node_modules', `@vue/${name}/dist/${name}.esm-bundler.js`)
  const runtimeCorePath = resolvePath('runtime-core');
  const runtimeDomPath = resolvePath('runtime-dom');
  const reactivityPath = resolvePath('reactivity');
  const sharedPath = resolvePath('shared');

  return {
    compiler: compilerPath,
    '@vue/runtime-dom': runtimeDomPath,
    '@vue/runtime-core': runtimeCorePath,
    '@vue/reactivity': reactivityPath,
    '@vue/shared': sharedPath,
    vue: runtimeDomPath
  }
}

module.exports = function({ app, root}) {
  const vueResolved = resolveVue(root)
  app.use(async (ctx, next) => {
    if (!moduleReg.test(ctx.path)) {
      return next()
    }
    
    // 去掉 /@modules/，拿到相关模块
    const id = ctx.path.replace(moduleReg, '')
    ctx.type = 'js'
    const content = await fs.readFile(vueResolved[id], 'utf8')
    ctx.body = content
  })
}
