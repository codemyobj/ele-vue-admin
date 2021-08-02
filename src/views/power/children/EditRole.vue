<template>
  <el-dialog
    title="编辑角色"
    @close="editRoleDialogClose"
    :visible.sync="editRoleDialogVisible"
    width="40%"
  >
    <el-form
      ref="editFormRef"
      :model="editForm"
      :rules="FormRules"
      label-width="80px"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="editForm.roleName" />
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="editForm.roleDesc" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editRoleDialogClose">取消</el-button>
      <el-button type="primary" @click="editRoleInfo">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { FormRules } from "../addFormRuler";

export default {
  name: "EditRole",
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
    return {
      FormRules,
    };
  },
  computed: {
    ...mapGetters(["editRoleDialogVisible"]),
    editRoleDialogVisible: {
      get() {
        return this.$store.state.editRoleDialogVisible;
      },
      set(val) {
        this.$store.commit("IsEditRoleDialogShow", val);
      },
    },
  },
  methods: {
    ...mapMutations(["IsEditRoleDialogShow"]),
    editRoleDialogClose() {
      this.$store.commit("IsEditRoleDialogShow", false);
    },
    editRoleInfo() {
      this.$refs.editFormRef.validate(async (valid, field) => {
        if (!valid) {
          let arr = Object.keys(field);
          return this.$message.error({
            message: field[arr[0]][0].message,
            duration: 1500,
          });
        }
        this.$emit("editRoleInfo", this.editForm);
      });
    },
  },
};
</script>

<style scoped lang='less'>
</style>
