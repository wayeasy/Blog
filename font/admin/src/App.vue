<template>
  <div id="app">
    <!-- <layout></layout> -->
    <router-view></router-view>
  </div>
</template>
<script>
import Layout from "@/views/Layout.vue";
export default {
  name: 'index',
  components: {
    Layout
  }
}
</script>

<style lang="less">
html, body, #app {
  height: 100%;
}
</style>
