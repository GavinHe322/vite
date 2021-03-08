const { parse } = require('@vue/compiler-sfc')
const str = `
  <template>
    {{ msg }}

    <About />
  </template>

  <script>
  import { ref } from 'vue'
  import About from './About.vue'

  export default {
    components: {
      About
    },
    setup() {
      const msg = ref('hello')

      return {
        msg
      }
    }
  }
  </script>
`

const transformCode = parse(str)

console.log(transformCode.descriptor.template.content)
