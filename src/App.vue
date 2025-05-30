<template>
    <HelloWorld></HelloWorld>
</template>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>

<script>
import HelloWorld from '@/views/HomeView.vue'

export default {
  components: {
    HelloWorld
  }
}
</script>
