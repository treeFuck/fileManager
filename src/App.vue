<style>
* {
  padding: 0;
  margin: 0;
}
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import FAT from './utils/FAT'
export default {
  mounted() {
    FAT.initFAT()
  }
}
</script>
