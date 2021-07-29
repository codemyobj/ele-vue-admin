<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><slot name="slotA">商品管理</slot></el-breadcrumb-item>
    <el-breadcrumb-item> <slot name="slotB">添加商品</slot></el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "breadCrumb",
  components: {},
  props: {},
  data() {
    return {};
  },
};
</script>

<style scoped lang="less"></style>
