<template>
  {{ msg }}
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const msg = ref('hello')

    return {
      msg
    }
  }
}
</script>
