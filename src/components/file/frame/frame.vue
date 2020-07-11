<style lang="scss" scoped>
.frame {
  position: fixed;
  top: 0%;
  right: 0%;
  height: 100vh;
  width: 50vw;
  background-color: rgba(1, 1, 1, 0.5);
  .con {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 2em 2em 3em 2em;
    width: 30em;
    background: #fff;
    transform: translate(-50%, -50%);
    .close {
      position: absolute;
      top: 0.2em;
      right: 0.2em;
      height: 2em;
      width: 2em;
      z-index: 1;
      text-align: center;
      line-height: 2em;
      cursor: pointer;
    }
    .title {
      display: block;
      padding: 0 0 0 1em;
      width: 7em;
      text-align: left;
      font-size: 25px;
      line-height: 1.5em;
      border-bottom: 2px solid #999;
    }
    .dataCon {
      margin: 2em 0 1em 0;
      div {
        margin: 0.5em 0;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        span {
          display: block;
          width: 5em;
          height: 2.5em;
          line-height: 3em;
          text-align: left;
        }
        input {
          width: 25em;
          height: 2.5em;
          line-height: 2em;
          border: none;
          outline: none;
          text-align: center;
          border-bottom: 1px solid #000;
        }
      }
    }
    .buttonCon {
      button {
        margin: 0.5em 0;
      }
    }
    .change {
      position: absolute;
      right: 1em;
      bottom: 0.5em;
      span {
      }
    }
  }
  .con:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-width: 0 4em 4em 0;
    border-style: solid;
    border-color: transparent #ccc;
  }
}
</style>
<template>
  <div class="frame" v-show="frameContrl.ifShow">
    <div class="con">
      <div class="close" @click="frameContrl.ifShow=false">
        <Icon size="30" type="md-close" />
      </div>
      <div class="title">
        <span v-show="frameContrl.model == 0">新建文件</span>
        <span v-show="frameContrl.model == 1">新建子目录</span>
        <span v-show="frameContrl.model == 2">编辑文件</span>
      </div>
      <div class="dataCon">
        <!-- 新建文件 -->
        <div class="newFile" v-show="frameContrl.model == 0">
          <span class="item">文件名</span>
          <input type="text" v-model="fileName" placeholder="请输入文件名" />
          <span class="item">文件内容</span>
          <input type="text" v-model="fileStr" placeholder="请输入文件内容" />
          <span class="item">文件权限</span>
          <RadioGroup v-model="power">
            <Radio label="1">只读</Radio>
            <Radio label="2">只写</Radio>
            <Radio label="3">可读可写</Radio>
          </RadioGroup>
        </div>
        <!-- 新建子目录 -->
        <div class="newDir" v-show="frameContrl.model == 1">
          <span class="item">目录名</span>
          <input type="text" v-model="dirName" placeholder="请输入目录名" />
        </div>
        <!-- 编辑文件 （读文件）-->
        <div class="eidt" v-show="frameContrl.model == 2">
          <span class="item">文件名</span>
          <input type="text" v-model="fileName" placeholder="请输入文件名" />
          <span class="item">文件内容</span>
          <input type="text" v-model="fileStr" placeholder="请输入文件内容" />
        </div>
      </div>
      <div class="buttonCon">
        <!-- 确定 新建文件/新建目录 -->
        <Button long v-show="frameContrl.model != 2" type="primary" @click="sure">确定</Button>
        <!-- 修改 文件 -->
        <Button
          long
          v-show="frameContrl.model == 2 && frameContrl.file && frameContrl.file.power!=1"
          type="success"
          @click="edit"
        >修改</Button>
      </div>
      <!-- 切换 新建文件/新建目录  -->
      <div class="change" v-show="frameContrl.model != 2">
        <span>切换到</span>
        <span style="padding-right: 0.5em">{{model?'新建子目录':'新建文件'}}</span>
        <i-switch
          v-model="model"
          true-color="#13ce66"
          false-color="#13ce66"
          @on-change="changeModel"
        />
      </div>
    </div>
  </div>
</template>


<script>
import dir_utils from "../../../utils/dir";
export default {
  name: "newFile",
  props: {
    frameContrl: Object
  },
  components: {},
  data() {
    return {
      fileName: "",
      fileStr: "",
      power: "1",
      dirName: "",
      model: false
    };
  },
  methods: {
    initData() {
      // 初始化数据
      if (this.frameContrl.model == 0) {
        // 新建文件夹
        this.fileName = "";
        this.fileStr = "";
        this.dirName = "";
        this.power = "1";
        this.model = true;
        console.log(this.power);
      } else if (this.frameContrl.model == 1) {
        // 新建子目录
        this.dirName = "";
        this.model = false;
      } else if (this.frameContrl.model == 2) {
        // 编辑文件
        this.fileName = this.frameContrl.file.fileName;
        if (this.frameContrl.file.power == 2) {
          // 文件 只写
          this.fileStr = "";
        } else {
          // 文件 可读/可读可写
          this.fileStr = dir_utils.readFile(this.frameContrl.file);
        }
      }
    },
    changeModel(status) {
      if (status) {
        this.frameContrl.model = 0;
      } else {
        this.frameContrl.model = 1;
      }
    },
    sure() {
      if (this.frameContrl.model == 0) {
        // 新建文件
        this.$Modal.confirm({
          title: `你确定新建文件 ${this.fileName} 吗`,
          onOk: () => {
            let fileName = this.fileName.replace(/\s+/g, "");
            let fileStr = this.fileStr.replace(/\s+/g, "");
            let result = dir_utils.newFile(fileName, fileStr, this.power);
            if (result == 0) {
              this.$Message.warning("文件名不能为空");
            } else if (result == 1) {
              this.$Message.warning("文件字符串不能为空");
            } else if (result == 2) {
              this.$Message.warning("该文件名已存在");
            } else if (result == 3) {
              this.$Message.warning("FAT剩余空间不足够");
            } else if (result == 4) {
              this.$Message.info("新建成功");
              this.frameContrl.ifShow = false; // 关窗口
            }
          },
          onCancel: () => {
            this.$Message.info("取消成功");
            this.frameContrl.ifShow = false; // 关窗口
          }
        });
      } else if (this.frameContrl.model == 1) {
        // 新建子目录
        this.$Modal.confirm({
          title: `你确定新建目录 ${this.dirName} 吗`,
          onOk: () => {
            let dirName = this.dirName.replace(/\s+/g, "");
            let result = dir_utils.newSubDir(dirName);
            if (result == 0) {
              this.$Message.warning("目录名为空");
            } else if (result == 1) {
              this.$Message.warning("该子目录名已存在");
            } else if (result == 2) {
              this.$Message.info("新建成功");
              this.frameContrl.ifShow = false; // 关窗口
            }
          },
          onCancel: () => {
            this.$Message.info("取消成功");
            this.frameContrl.ifShow = false; // 关窗口
          }
        });
      }
    },
    edit() {
      // 编辑文件
      this.$Modal.confirm({
        title: `你确定修改这个文件吗`,
        onOk: () => {
          let result = dir_utils.changeFile(
            this.frameContrl.file,
            this.fileName,
            this.fileStr
          );
          if (result == 0) {
            this.$Message.warning("文件名不能为空");
          } else if (result == 1) {
            this.$Message.warning("文件字符串不能为空");
          } else if (result == 2) {
            this.$Message.warning("FAT剩余空间不足够");
          } else if (result == 3) {
            this.$Message.info("修改成功");
            this.frameContrl.ifShow = false; // 关窗口
          }
        },
        onCancel: () => {
          this.$Message.info("取消成功");
          this.frameContrl.ifShow = false; // 关窗口
        }
      });
    }
  },
  computed: {},
  mounted() {}
};
</script> 