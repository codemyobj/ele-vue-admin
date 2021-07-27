<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <home-header class="header" />

    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏菜单 -->
      <home-aside
        class="aside"
        :is-collapse="isCollapse"
        :menuList="menuList"
        @toggleClick="toggleClick"
        @activePath="activePath"
      />
      <!-- 内容主体区域 -->
      <el-main>
        <!-- 二级子路由 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeHeader from "./children/HomeHeader.vue";
import HomeAside from "./children/HomeAside.vue";

import { getMenuList } from "@/api/menu";

export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeAside
  },
  props: {},
  data() {
    return {
      isCollapse: false,
      menuList: [],
      //需要关闭的左侧菜单id
      menusId: [],
      activePath: "/welcome"
    };
  },
  created() {
    this._getMenuList();
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        this.activePath = val.path;
        this.menusId.forEach(i => {
          this.$refs.elMenuRef.closeMneu(item + "");
        });
      },
      //深度观察监听
      deep: true
    }
  },
  methods: {
    _getMenuList() {
      getMenuList().then(res => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message({
            message: res.meta.msg,
            duration: 1000
          });
        }
        this.menuList = data.data;
        console.log(this.menuList);
        //过滤掉数据统计模块
        this.menuList = this.menuList.filter(item => {
          //吧每个菜单的id保存到一个数组中，切换的时候要用的
          this.menusId.push(item.id);
          return item.authName != "数据统计";
        });
      });
    },
    toggleClick() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
  position: relative;
  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .aside {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
  }
}
</style>
