<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-input
        placeholder="请输入内容"
        @keyup.enter.native="getGoodsList"
        v-model="queryInfo.query"
        clearable
        @clear="getGoodsList"
      >
        <el-button slot="append" icon="el-icon-search" @click="getGoodsList" />
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="$router.push('/goods/add')"
        >添加商品</el-button
      >
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "addAndSearch",
  components: {},
  props: {
    queryInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    getGoodsList() {
      this.$emit("getGoodsList");
    },
  },
};
</script>

<style scoped lang='less'>
</style>
