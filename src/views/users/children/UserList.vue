<template>
  <el-table :data="userList" border stripe>
    <el-table-column type="index" label="#" />
    <el-table-column label="用户名" prop="username" />
    <el-table-column label="邮箱" prop="email" />
    <el-table-column label="电话" prop="mobile" />
    <el-table-column label="角色" prop="role_name" />
    <el-table-column label="状态">
      <template v-slot="scope">
        <!-- scope.row 能接收到这一行的数据 -->
        <el-switch
          v-model="scope.row.mg_state"
          @change="userStateChange(scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180px">
      <template v-slot="scope">
        <!-- 编辑 -->
        <el-button
          size="mini"
          round
          type="primary"
          icon="el-icon-edit"
          @click="editClick"
        />
        <!-- 删除 -->
        <el-button size="mini" round type="danger" icon="el-icon-delete" />
        <!-- 分配权限 -->
        <el-tooltip
          effect="dark"
          content="分配角色"
          :enterable="false"
          placement="top"
        >
          <el-button
            size="mini"
            round
            type="warning"
            icon="el-icon-setting"
            @click="setClick"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "UserList",
  components: {},
  props: {
    userList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    userStateChange(userInfo) {
      console.log(userInfo);
      this.$emit("userStateChange", userInfo);
    },
    editClick() {
      this.$emit("editClick");
    },
    setClick() {
      this.$emit("setClick");
    },
  },
};
</script>

<style scoped lang='less'>
</style>
