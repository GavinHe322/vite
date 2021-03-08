var MagicString = require('magic-string')

var s = new MagicString('problems = 99')

s.overwrite(0, 8, 'answer') // answer = 99
console.log(s.toString())

s.overwrite(11, 13, '42') // answer = 42
console.log(s.toString())

s.prepend('var').append(';') // var answer = 42;
console.log(s.toString())

var map = s.generateMap({
  source: 'source.js',
  file: 'converted.js.map',
  includeContent: true
})

require('fs').writeFileSync('coverted.js', s.toString())
require('fs').writeFileSync('converted.js.map', map.toString())
