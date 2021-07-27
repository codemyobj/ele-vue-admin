<template>
  <el-container>
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
        :default-active="activePath"
      >
        <el-menu-item>
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
  </el-container>
</template>

<script>
export default {
  name: "HomeAside",
  components: {},
  props: {
    isCollapse: {
      type: Boolean,
      default() {
        return false;
      }
    },
    activePath: {
      type: String,
      default() {
        return "";
      }
    },
    menuList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao" //数据统计模块的icon
      }
    };
  },
  methods: {
    toggleClick() {
      this.$emit("toggleClick");
    }
  }
};
</script>

<style scoped lang="less">
.el-aside {
  background-color: #333744;
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
