<style lang="scss" scoped>
.index{
  
}
</style>
<template>
  <div class="index">
    <FATform></FATform>
  </div>
</template>

<script>
import FATutil from '../utils/FAT'
import FATform from '../components/FAT'
export default {
  name: 'index',
  components: {
    FATform
  },
  mounted() {
    let num1 = FATutil.writeStack('123');
    let num2 = FATutil.writeStack('c cd');
    let num3 = FATutil.writeStack('我牛逼');
    let num4 = FATutil.writeStack('王树干个傻逼的货');
    // console.log('num4', num4)
    // console.log(FATutil.readStack(num1));
    setTimeout(() => {
      console.log(FATutil.changeStack(num2, '9'))
    }, 2000);
    //console.log(this.$store.state.FAT)
  }
}
</script>
