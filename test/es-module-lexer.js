const { init, parse } = require('es-module-lexer')

;(async () => {
  // either await init, or call parse asynchronously
  // this is necessary for the Web Assembly boot
  await init

  const [imports, exports] = parse(`import a from 'a.js' export var p = 5;`)
  importss = parse(`import a from 'a.js' export var p = 5`)[0]
  console.log(imports, exports, 'imports exports')
  console.log()
  console.log(importss, 'sss')
})()
