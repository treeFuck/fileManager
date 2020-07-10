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
import FAT_util from '../utils/FAT'
import file_util from '../utils/file'
import FATform from '../components/FAT'
export default {
  name: 'index',
  components: {
    FATform
  },
  mounted() {
    let file1 = file_util.newFile('测试文件1', '测试文件1', 1)
    let file2 = file_util.newFile('测试文件2', '测试文件2', 1)
    let file3 = file_util.newFile('测试文件3', '测试文件31', 1)
    console.log(file3)
    console.log(file_util.readFile(file1))
    setTimeout(() => {
      // console.log(file_util.delFile(file3));
      // file3 = file_util.changeFile(file3, '啦啦', 'cnim');
      // console.log(file3)
      // console.log(file_util.readFile(file3))
    }, 2000);
    
    // let num1 = FAT_util.writeStack('1');
    // let num2 = FAT_util.writeStack('c cdsdadas');
    // let num3 = FAT_util.writeStack('我牛逼');
    // let num4 = FAT_util.writeStack('王树干个傻逼的货');
    // console.log('num1', num1)
    // console.log('num4', num4)
    // // console.log(FAT_util.readStack(num1));
    // setTimeout(() => {
    //   console.log(FAT_util.changeStack(num2, '9'))
    // }, 2000);
  }
}
</script>
