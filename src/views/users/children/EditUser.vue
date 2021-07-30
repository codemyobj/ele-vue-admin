<template>
  <el-dialog
    title="修改用户信息"
    width="40%"
    :visible.sync="editDialogVisible"
    @close="editDialogClose"
  >
    <el-form :model="editForm" ref="editFormRef" label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogCancel">取消</el-button>
      <el-button type="primary" @click="editUserInfo">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "EditUser",
  components: {},
  props: {
    editForm: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    editDialogVisible: {
      get() {
        return this.$store.state.editDialogVisible;
      },
      set(val) {
        this.$store.commit("IsEditDialogShow", val);
      },
    },
  },
  methods: {
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid, field) => {
        if (!valid) {
          let arr = Object.keys(field);
          return this.$message.error({
            message: field[arr[0]][0].message,
            duration: 1500,
          });
        }
        this.$emit("editUserInfo", this.editForm);
      });
    },
    editDialogCancel() {
      this.$store.commit("IsEditDialogShow", false);
    },
    editDialogClose() {
      this.$store.commit("IsEditDialogShow", false);
    },
  },
};
</script>

<style scoped lang='less'>
</style>
