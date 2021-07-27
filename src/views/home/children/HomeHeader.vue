<template>
  <div class="home-container">
    <el-header>
      <div>
        <img src="@/assets/images/logo.svg" alt="" />
        <span>优客购电商后台管理系统</span>
        <span id="version">Version: 1.3.0</span>
      </div>
      <div>
        <div id="user-name">欢迎您：admin</div>
        <full-screen />
        <el-dropdown trigger="click">
          <span class="el-dropdown-link d-flex">
            <img id="user-avatar" src="@/assets/images/avatar.gif" alt="" />
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Welcome</el-dropdown-item>
            <a
              target="_blank"
              href="https://github.com/codemyobj/ele-vue-admin"
            >
              <el-dropdown-item>Github</el-dropdown-item>
            </a>

            <el-dropdown-item divided @click.native="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>

<script>
import FullScreen from "@/components/common/fullScreen";

export default {
  name: "HomeHeader",
  components: {
    FullScreen
  },
  props: {},
  data() {
    return {};
  },
  methods: {
    //退出按钮
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
  width: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    span {
      margin-left: 20px;
    }
    #version {
      font-weight: 400;
      font-size: 16px;
      margin-left: 20px;
    }
    img {
      width: 55px;
      height: 55px;
      border-radius: 50%;
    }
  }
}
</style>
