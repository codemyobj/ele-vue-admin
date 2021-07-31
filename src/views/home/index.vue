<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
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
            <el-dropdown-item @click.native="toggleRouter"
              >Welcome</el-dropdown-item
            >
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

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏菜单 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 切换按钮 -->
        <div class="toggle-button" @click="toggleClick">
          {{ isCollapse ? "&rArr;" : "&lArr;" }}
        </div>

        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          background-color="#333744"
          ref="elMenuRef"
          text-color="#fff"
          active-text-color="#409eff"
          :router="true"
          :unique-opened="true"
          :default-active="$route.path"
        >
          <el-menu-item index="/welcome">
            <i class="iconfont icon-home3" />
            <span slot="title">Welcome</span>
          </el-menu-item>

          <!-- 一级菜单 -->
          <el-submenu
            id="custom"
            v-for="item in menuList"
            :key="item.id"
            :index="item.id + ''"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]" />
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <template slot="title">
                <i class="el-icon-menu" />
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/dataview">
            <i class="iconfont icon-baobiao" />
            <span slot="title">数据视图</span>
            <i class="el-submenu__icon-arrow icon-share" />
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 页面内容展示区域 -->
      <el-main>
        <!-- 二级子路由 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import FullScreen from "@/components/common/fullScreen";

import { getMenuList } from "@/api/menu";

export default {
  name: "Home",
  components: {
    FullScreen,
  },
  props: {},
  data() {
    return {
      isCollapse: false,
      menuList: [],
      //需要关闭的左侧菜单id
      menusId: [],
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao", //数据统计模块的icon
      },
    };
  },
  created() {
    this._getMenuList();
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        this.activePath = val.path;
        this.menusId.forEach((i) => {
          this.$refs.elMenuRef.closeMenu(i + "");
        });
      },
      //深度观察监听
      deep: true,
    },
  },
  methods: {
    _getMenuList() {
      getMenuList().then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message({
            message: res.meta.msg,
            duration: 1000,
          });
        }
        this.menuList = data.data;
        //过滤掉数据统计模块
        this.menuList = this.menuList.filter((item) => {
          //吧每个菜单的id保存到一个数组中，切换的时候要用的
          this.menusId.push(item.id);
          return item.authName != "数据统计";
        });
      });
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    toggleClick() {
      this.isCollapse = !this.isCollapse;
    },
    toggleRouter() {
      this.$router.push("/welcome");
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
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
      margin-right: 20px;
    }
  }
}

.el-aside {
  background-color: #333744;
}
.el-main {
  position: relataive;
  background-color: #eaedf1;
  overflow-y: scroll;
  height: 93.5vh;
}
.toggle-button {
  background-color: #4a5064;
  color: #fff;
  font-size: 22px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.1em;
  cursor: pointer;
  user-select: none;
}
.el-menu {
  border-right: none;
}
.iconfont {
  margin-right: 10px;
  font-size: 15px;
}
</style>
