<template>
  <el-row :gutter="20">
    <el-col :span="7">
      <el-input
        placeholder="请输入内容"
        v-model="queryInfo.query"
        clearable
        @clear="getUserList"
        @keyup.native.enter="getUserList"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getUserList"
        ></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="addClick">添加用户</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "SearchAndAdd",
  components: {},
  props: {
    queryInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["IsAddDialogShow"]),
    addClick() {
      this.$store.commit("IsAddDialogShow", true);
    },
    getUserList() {
      this.$emit("searchUserList");
    },
  },
};
</script>

<style scoped lang='less'>
</style>
