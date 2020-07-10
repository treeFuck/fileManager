<style lang="scss" scoped>
.FAT {
  width: 50vw;
  height: 100vh;
  background: #eee;
  text-align: center;
  overflow-y: auto;
  .title {
    font-size: 2em;
    text-align: center;
  }
  .switchCon {
    display: flex;
    justify-content: center;
    .model,
    .showIndex {
      margin: 0 2em;
      span {
        padding: 0 1em;
      }
    }
  }
  .form {
    display: inline-block;
    position: relative;
    padding: 2em 0 0 2em;
    font-size: 2em;
    .top {
      position: absolute;
      top: 0;
      left: 2em;
      display: flex;
      justify-content: center;
      span {
        display: inline-block;
        margin: 0.1em;
        width: 2em;
        height: 2em;
        text-align: center;
        line-height: 2em;
      }
    }
    .left {
      position: absolute;
      top: 2em;
      left: 0;
      width: 2em;
      span {
        display: inline-block;
        margin: 0.1em;
        width: 2em;
        height: 2em;
        text-align: center;
        line-height: 2em;
      }
    }
    .hang {
      display: flex;
      justify-content: center;
      .line {
        position: relative;
        display: inline-block;
        margin: 0.1em;
        
        width: 2em;
        height: 2em;
        text-align: center;
        line-height: 2em;
        overflow: hidden;
        border-radius: 2px;
        border: 1px solid #000;
        font-weight: bold;
        .stackIndex {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          height: 50%;
          width: 50%;
          font-size: 0.7em;
          line-height: 1em;
          color: rgba(1, 1, 1, 0.15);
          font-weight: bold;
          text-align: left;
        }
        .nextStack {
          position: absolute;
          z-index: 1;
          bottom: 0;
          right: 0em;
          height: 50%;
          width: 50%;
          font-size: 0.7em;
          line-height: 2em;
          color: #000;
          font-weight: bold;
          text-align: right;
        }
      }
      .line:after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        border-width: 0 0 1em 1em;
        border-style: solid;
        border-color: transparent transparent rgba(1, 1, 1, 0.2);
      }
    }
  }
}
</style>
<template>
  <div class="FAT">
    <div class="title">FAT-位示图</div>
    <div class="switchCon">
      <div class="model">
        <span v-show="model">字符存储图</span>
        <span v-show="!model">位示图</span>
        <i-switch v-model="model" true-color="#13ce66" false-color="#ff4949" />
      </div>
      <div class="showIndex">
        <span v-show="showIndex">显示下标</span>
        <span v-show="!showIndex">隐藏下标</span>
        <i-switch v-model="showIndex" true-color="#13ce66" false-color="#ff4949" />
      </div>
    </div>
    <div class="form">
      <div class="hang" v-for="(item1, index1) in FATArr" :key="index1">
        <span
          class="line"
          v-for="(item2, index2) in item1"
          :key="index2"
          :style="{background:item2.char?'#fff':'#aaa'}"
        >
          <div class="stackIndex" v-show="showIndex">{{index1*10+index2}}</div>
          <span class="data">
            <span v-show="model">{{item2.char?item2.char:' '}}</span>
            <span v-show="!model">{{item2.char?'1':'0'}}</span>
          </span>
          <div class="nextStack">{{item2.nextIndex | isNull}}</div>
        </span>
      </div>
      <div class="top">
        <span v-for="y in FATLen_y" :key="y">{{y-1}}</span>
      </div>
      <div class="left">
        <span v-for="x in FATLen_x" :key="x">{{x-1}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FAT",
  data() {
    return {
      model: 0, // 0->位示图，1->字符存储图,
      showIndex: false // 是否显示下标
    };
  },
  components: {},
  computed: {
    FATArr() {
      return this.$store.state.FAT;
    },
    FATLen_x() {
      return this.$store.state.FATLen_x;
    },
    FATLen_y() {
      return this.$store.state.FATLen_y;
    }
  },
  filters: {
    isNull: function(value) {
      if (value) {
        return value;
      } else if (typeof value == "number") {
        return 0;
      } else {
        return -1;
      }
    }
  },
  mounted() {}
};
</script>