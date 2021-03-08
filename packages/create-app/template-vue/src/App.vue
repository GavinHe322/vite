<template>
  {{ msg }}
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    let msg = ref('hello world')

    return {
      msg
    }
  }
}
</script>
