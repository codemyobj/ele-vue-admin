<template>
  <el-dialog
    title="分配权限"
    :visible.sync="setRoleDialogVisible"
    width="40%"
    :close="setRoleDialogClose"
  >
    <el-tree
      ref="treeRef"
      show-checkbox
      highlight-current
      :data="rightsList"
      node-key="id"
      :default-expand-all="true"
      :props="treeProps"
      :default-checked-keys="activeKeys"
    />
    <span slot="footer" class="dialog-footer">
      <el-button @click="setRoleDialogClose">取消</el-button>
      <el-button type="primary" @click="setRights">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "SetRole",
  components: {},
  props: {
    activeKeys: {
      type: Array,
      default: () => [],
    },
    rightsList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // 树形控件的属性绑定对象
      treeProps: {
        label: "authName",
        children: "children",
      },
    };
  },
  computed: {
    ...mapGetters(["setRoleDialogVisible"]),
    setRoleDialogVisible: {
      get() {
        return this.$store.state.setRoleDialogVisible;
      },
      set(bol) {
        this.$store.commit("IsSetRoleDialogShow", bol);
      },
    },
  },
  methods: {
    ...mapMutations(["IsSetRoleDialogShow"]),
    setRoleDialogClose() {
      this.$store.commit("IsSetRoleDialogShow", false);
    },
    //确认分配
    setRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(), //返回目前被选中的节点并组成数组
        ...this.$refs.treeRef.getHalfCheckedKeys(), //返回目前半选中的节点的key组成数组
      ];
      //指定一个字符串来分割数组的每个元素，返回分割后的字符串
      const idStr = keys.join(",");
      this.$emit("setRights", idStr);
    },
  },
};
</script>

<style scoped lang='less'>
</style>
