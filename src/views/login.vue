<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_container" v-show="showLogin">
        <div class="manage_trip">
          <p>Elm后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"
              ><span>dsa</span></el-input
            >
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('loginForm')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <div class="info">
          <p class="tip">温习提示:</p>
          <p class="tip">未登陆过的新用户，自动注册</p>
          <p class="tip">注册过的用户可凭账号密码登录</p>
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  props: {},
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rule: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      showLogin: false
    };
  },
  mounted() {
    this.showLogin = true;
    if (!this.adminInfo.id) {
    }
  },
  methods: {
    submitForm() {}
  }
};
</script>

<style scoped lang="less">
@import "../styles/mixin.less";
.login_page {
  background-color: #324057;
  .manage_trip {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p {
      font-size: 34px;
      color: #fff;
    }
  }
  .form_container {
    .wh(320px, 210px);
    .ctp(320px, 210px);
    padding: 25px 25px 30px 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn {
      width: 100%;
      font-size: 16px;
    }
  }
  .info {
    margin-bottom: 20px;
    .tip {
      font-size: 12px;
      color: red;
    }
  }
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
