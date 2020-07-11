<style lang="scss" scoped>
.index{
  .logout {
    position: fixed;
    bottom: 2em;
    right: 2em;
    height: 6em;
    width: 6em;
    background: #D24D57;
    font-weight: bold;
    line-height: 6em;
    text-align: center;
    color: #fff;
    box-shadow: 0 0 5px 0 #999;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
<template>
  <div class="index">
    <left></left>
    <right></right>
    <div class="logout" @click="logout">退出登录</div>
  </div>
</template>

<script>
import dir_util from '../utils/dir'
import left from '../components/FAT/FAT'
import right from '../components/file/file'
export default {
  name: 'index',
  components: {
    left,
    right
  },
  methods: {
    logout() {
      this.$router.replace({ name: "login" });
    }
  },
  mounted() {
    
  }
}
</script>
