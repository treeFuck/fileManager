<style lang="scss" scoped>
.file {
  position: absolute;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100vh;
  background: #fff;
  text-align: center;
  overflow-y: auto;
  .title {
    font-size: 2em;
    text-align: center;
  }
  .con {
    margin: 1em auto 0 auto;
    max-height: 90vh;
    width: 50em;
    overflow: auto;
    .top {
      font-size: 18px;
      line-height: 2em;
      .back {
        position: relative;
        width: 20%;
        color: #fff;
        text-align: left;
        text-indent: 0.2em;
        display: inline-block;
        background-color: #999;
        cursor: pointer;
      }
      .back:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        border-width: 2em 1em 0 0;
        border-style: solid;
        border-color: transparent #ccc;
      }
      .nowDir {
        position: relative;
        width: 70%;
        text-align: left;
        display: inline-block;
        text-indent: 0.5em;
        background-color: #ccc;
      }
      .nowDir:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        border-width: 2em 1em 0 0;
        border-style: solid;
        border-color: transparent #999;
      }
      .new {
        width: 10%;
        color: #fff;
        text-align: center;
        display: inline-block;
        background-color: #999;
        cursor: pointer;
      }
    }
    .itemCon {
      margin-top: 1em;
      .subDir,
      .fileItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 2em;
        font-size: 1.2em;
        line-height: 2em;
        .left {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          max-width: 40%;
          .name {
            font-weight: bold;
            padding: 0 0.3em;
            cursor: pointer;
          }
          .power {
            color: #999;
            padding: 0 0.3em;
          }
        }
        .middle {
          min-width: 25em;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          div {
            padding: 0 0.5em;
          }
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
<template>
  <div class="file">
    <frame ref="frame" :frameContrl="frameContrl" />
    <div class="title">文件操作</div>
    <div class="con">
      <div class="top">
        <div class="back" @click="toParentDir()">
          <Icon type="ios-undo" />
          <span>返回上一级</span>
        </div>
        <div class="nowDir">
          <Icon type="ios-folder-open" />
          <span>: {{nowDir.absolutePath}}</span>
        </div>
        <div class="new" @click="newItem()">
          <span>新建</span>
          <Icon type="md-add" />
        </div>
      </div>
      <div class="itemCon">
        <div class="subDir" v-for="(item, index1) in nowDir.dirArr" :key="index1">
          <div class="left">
            <Icon size="25" type="ios-folder-open" />
            <span class="name" @click="toSubDir(index1)">{{item.dirName}}</span>
          </div>
          <div class="right">
            <Icon
              size="25"
              style="cursor: pointer"
              color="#ff4949"
              type="md-close-circle"
              @click="delSubDir(item)"
            />
          </div>
        </div>
        <div class="fileItem" v-for="(item, index2) in nowDir.fileArr" :key="index2+100">
          <div class="left">
            <Icon size="25" type="ios-document" />
            <span class="name" @click="editFile(item)">{{item.fileName}}</span>
          </div>
          <div class="middle">
            <div>长度：{{item.length}}</div>
            <div>首地址：{{item.firstStack}}</div>
            <div>
              权限：
              <span v-show="item.power==1">(只读)</span>
              <span v-show="item.power==2">(只写)</span>
              <span v-show="item.power==3">(可读可写)</span>
            </div>
          </div>
          <div class="right">
            <Icon
              size="25"
              style="cursor: pointer"
              color="#ff4949"
              type="md-close-circle"
              @click="delFile(item)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dir_util from "../../utils/dir";
import frame from "../file/frame/frame";
export default {
  name: "file",
  components: {
    frame
  },
  data() {
    return {
      frameContrl: {
        model: 2, // 0->新建文件， 1->新建子目录， 2->编辑文件
        ifShow: false,
        file: null
      }
    };
  },
  methods: {
    // 返回上一级
    toParentDir() {
      dir_util.toParentDir();
    },
    // 跳到下一级
    toSubDir(childIndex) {
      dir_util.toSubDir(childIndex);
    },
    // 新建（子目录/目录项）
    newItem() {
      this.frameContrl.model = 0;
      this.frameContrl.file = null;
      this.$refs.frame.initData(); // 初始化数据
      this.frameContrl.ifShow = true; // 开窗口
    },
    // 删除子目录
    delSubDir(subDir) {
      this.$Modal.confirm({
        title: `你确定删除目录 ${subDir.dirName} 吗`,
        onOk: () => {
          dir_util.delSubDir(subDir);
          this.$Message.info("删除成功");
          this.frameContrl.ifShow = false; // 关窗口
        },
        onCancel: () => {
          this.$Message.info("取消成功");
          this.frameContrl.ifShow = false; // 关窗口
        }
      });
    },
    // 编辑文件
    editFile(file) {
      this.frameContrl.model = 2;
      this.frameContrl.file = file;
      this.$refs.frame.initData(); // 初始化数据
      this.frameContrl.ifShow = true; // 开窗口
    },
    // 删除文件
    delFile(delFile) {
      this.$Modal.confirm({
        title: `你确定删除文件 ${delFile.fileName} 吗`,
        onOk: () => {
          dir_util.delFile(delFile);
          this.$Message.info("删除成功");
          this.frameContrl.ifShow = false; // 关窗口
        },
        onCancel: () => {
          this.$Message.info("取消成功");
          this.frameContrl.ifShow = false; // 关窗口
        }
      });
    }
  },
  computed: {
    nowDir() {
      return this.$store.state.nowDir;
    }
  },
  mounted() {}
};
</script>