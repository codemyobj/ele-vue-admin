<template>
  <el-dialog
    title="分配角色"
    width="40%"
    :visible.sync="setDialogVisible"
    @close="setRoleDialogClose"
  >
    <div>
      <p>当前的用户: {{ userInfo.username }}</p>
      <p>当前的角色: {{ userInfo.role_name }}</p>
      <p>
        分配新角色
        <el-select v-model="selectedRoleId" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          />
        </el-select>
      </p>
    </div>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="setRoleDialogClose">取消</el-button>
      <el-button type="primary" @click="saveRoleInfo">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "SetRoles",
  computed: {
    setDialogVisible: {
      get() {
        return this.$store.state.setDialogVisible;
      },
      set(val) {
        this.$store.commit("IsSetDialogShow", val);
      },
    },
  },
  props: {
    userInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    roleList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // 已选择的角色id值
      selectedRoleId: "",
    };
  },
  methods: {
    ...mapMutations(["IsSetDialogShow"]),
    setRoleDialogClose() {
      this.$store.commit("IsSetDialogShow", false);
      this.selectedRoleId = "";
      // this.userInfo = {};
    },
    saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.info({
          message: "请选择要分配的角色",
          duration: 1500,
        });
      }
      this.$emit("saveRoleInfo", this.userInfo.id, this.selectedRoleId);
    },
  },
};
</script>

<style scoped lang='less'>
</style>
