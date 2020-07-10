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
import FAT_util from './utils/FAT'
import dir_util from './utils/dir'
export default {
  mounted() {
    FAT_util.initFAT();
    dir_util.initRoot();
  }
}
</script>
