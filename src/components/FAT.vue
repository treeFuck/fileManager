<style lang="scss" scoped>
.FAT {
  .form {
      margin: 100px auto;
      height: 20em;
      width: 20em;
      .hang {
          width: 20em;
          height: 2em;
          span {
              display: inline-block;
              width: 2em;
              height: 2em;
              text-align: center;
              line-height: 2em;
              overflow: hidden;
          }
      }
  }
}
</style>
<template>
  <div class="FAT">
    <div class="top"></div>
    <div class="left"></div>
    <div class="form">
        <div class="hang" v-for="(item1, index1) in FATArr" :key="index1">
            <span class="lie" v-for="(item2, index2) in item1" :key="index2">
                {{item2.char?item2.char:'0'}}
            </span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FAT",
  components: {},
  computed: {
    FATArr() {
      return this.$store.state.FAT;
    }
  },
  mounted() {}
};
</script>