<template>
  <el-dialog
    title="添加角色"
    :visible.sync="addRoleDialogVisible"
    @close="addRoleDialogClose"
    width="40%"
  >
    <el-form
      label-width="80px"
      :model="addForm"
      :rules="FormRules"
      ref="addFormRef"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="addForm.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addRoleDialogClose">取消</el-button>
      <el-button type="primary" @click="addRoleInfo">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { FormRules } from "../addFormRuler";

export default {
  name: "AddRole",
  components: {},
  props: {},
  data() {
    return {
      // 保存添加角色时的信息
      addForm: {
        roleName: "",
        roleDesc: "",
      },
      FormRules,
    };
  },
  computed: {
    ...mapGetters(["addRoleDialogVisible"]),
    addRoleDialogVisible: {
      get() {
        return this.$store.state.addRoleDialogVisible;
      },
      set(bol) {
        this.$store.commit("IsAddRoleDialogShow", bol);
      },
    },
  },
  methods: {
    ...mapMutations(["IsAddRoleDialogShow"]),
    addRoleDialogClose() {
      this.$store.commit("IsAddRoleDialogShow", false);
    },
    addRoleInfo() {
      this.$refs.addFormRef.validate(async (valid, field) => {
        if (!valid) {
          let arr = Object.keys(field);
          return this.$message.error({
            message: field[arr[0]][0].message,
            duration: 1500,
          });
        }
      });
      this.$emit("addRoleInfo", this.addForm);
    },
  },
};
</script>

<style scoped lang='less'>
</style>
