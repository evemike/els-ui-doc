<template>
  <div class="els-page">
    <Home />
  </div>
</template>

<script lang="ts">
export default {
  name:"ElsPage"
}
</script>

<script lang="ts" setup>
import Home from "./home.vue"
</script>

<style scoped lang="scss">
.els-page {
  width:100%;
  height:100%;
  overflow: hidden;
}
</style>