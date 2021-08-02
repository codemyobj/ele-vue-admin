<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-input placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary">添加商品</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "search",
  components: {},
  props: {},
  data() {
    return {};
  },
};
</script>

<style scoped lang='less'>
</style>
