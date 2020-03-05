<template>
  <div>
    第一步 <input type="checkbox" v-model="agree">阅读并理解用户协议
  </div>
</template>

<script>
  export default {
    name: 'third',
    data() {
      return {
        agree: true
      }
    },
    watch: {
      agree(val) {
        this.$emit('disagree', val);
      }
    },
    mounted() {
    }
  }
</script>

<style>
</style>
