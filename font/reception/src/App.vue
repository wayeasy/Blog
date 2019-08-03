<template>
  <div id="app">
    <!-- <Layout></Layout> -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import Layout from '@/views/Layout.vue'
export default {
  components: {
    Layout
  }
}
</script>

<style lang="less">
html, body {
  // height: 100%;
  // overflow: auto;
  padding: 0;
  margin: 0;
  position: relative;
  background: url('../public/b1.jpg') no-repeat  fixed ;
  background-position: center center;
  z-index: 4;
}
#app {
  // height: 100%;
}
</style>
