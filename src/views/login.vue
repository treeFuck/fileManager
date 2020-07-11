<style lang="scss"  scoped>
@font-face {
  font-family: "one";
  src: url(../assets/test.otf);
}
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-width: 1080px;
  overflow: hidden;
  background-image: url(../assets/bg.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-color: #80d1fc;
  .con {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 38em;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 28px;
    .title {
      color: #31aefd;
      height: 2.5em;
      font-size: 50px;
      line-height: 3em;
      text-align: center;
      font-family: "one";
      span {
        display: inline-block;
        width: 3em;
        text-align: center;
      }
    }
    .username,
    .password {
      position: relative;
      margin: 20px auto;
      width: 75%;
      height: 4.5em;
      overflow: hidden;
      border-radius: 40px;
      background: #91d8fc;
      img {
        position: absolute;
        left: 1.5em;
        top: 50%;
        width: 2em;
        transform: translateY(-50%);
      }
      input {
        position: absolute;
        right: 5%;
        width: 80%;
        color: #fff;
        height: 3em;
        font-size: 1.5em;
        border: none;
        outline: none;
        background-color: #91d8fc;
      }
    }
    .sure {
      margin: 40px auto;
      width: 75%;
      height: 2em;
      color: #fff;
      line-height: 2em;
      font-size: 2.25em;
      text-align: center;
      overflow: hidden;
      cursor: pointer;
      font-weight: lighter;
      border-radius: 40px;
      background-color: #31aefd;
      letter-spacing: 0.2em;
      svg {
        margin-top: 0.2em;
        height: 1.5em;
        width: 2em;
      }
    }
    .sure:hover {
      font-weight: normal;
    }
  }
}
</style>
<template>
  <div class="login">
    <div class="con">
      <div class="title">
        <span>登</span>
        <span>陆</span>
      </div>
      <div class="username">
        <img src="../assets/username.png" />
        <input
          name="username"
          type="text"
          v-model="username"
          autocomplete="off"
          placeholder="测试账号：user"
        />
      </div>
      <div class="password">
        <img src="../assets/password.png" />
        <input
          name="password"
          type="password"
          v-model="password"
          autocomplete="new-password"
          placeholder="测试账号：1234"
        />
      </div>
      <div class="sure">
        <span v-show="!clickSure" @click="sure">登陆</span>
        <span v-show="clickSure">
          <svg>
            <path
              fill="#fff"
              d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
          <div class="load-msg">加载中,请稍后....</div>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      clickSure: false
    };
  },
  methods: {
    sure() {
      this.clickSure = true;
      setTimeout(() => {
        this.clickSure = false;
        if (this.username == "user" && this.password == "1234") {
          this.$router.replace({ name: "index" });
        } else {
          this.$Modal.warning({
            title: "账号或密码错误"
          });
        }
      }, 800);
    }
  }
};
</script>