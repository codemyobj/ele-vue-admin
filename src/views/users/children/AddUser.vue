<template>
  <el-dialog
    title="添加用户"
    @close="addDialogClose"
    :visible.sync="addDialogVisible"
    width="40%"
  >
    <el-form
      ref="addFormRef"
      label-width="70px"
      :model="addForm"
      :rules="addRules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="username">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="username">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="username">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addUser">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addRules } from "../FormRules";

export default {
  name: "AddUser",
  components: {},
  props: {
    addDialogVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      addForm: {
        username: "",
        password: null,
        email: "",
        mobile: null,
      },
      addRules,
    };
  },
  methods: {
    addDialogClose() {
      //重置表单
      this.addForm = {
        username: "",
        password: null,
        email: "",
        mobile: null,
      };
    },
    addUser() {
      this.$refs.addFormRef.validate(async (valid, field) => {
        // 有未校验通过的字段
        if (!valid) {
          let arr = Object.keys(field);
          return this.$message.error({
            message: field[arr[0][0].message],
            duration: 1500,
          });
        }
        this.$emit("addUser", this.addForm);
      });
    },
  },
};
</script>

<style scoped lang='less'>
</style>
