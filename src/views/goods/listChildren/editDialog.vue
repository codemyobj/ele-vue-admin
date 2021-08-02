<template>
  <el-dialog
    title="编辑商品信息"
    width="40%"
    :visible.sync="editGoodsDialogVisible"
    @close="editDialogClose"
  >
    <el-form
      :model="editForm"
      :rules="formRules"
      ref="editFormRef"
      label-width="100px"
    >
      <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="editForm.goods_name" />
      </el-form-item>
      <el-form-item label="商品价格" prop="goods_price">
        <el-input v-model="editForm.goods_price" />
      </el-form-item>
      <el-form-item label="库存" prop="goods_number">
        <el-input v-model="editForm.goods_number" />
      </el-form-item>
      <el-form-item label="商品重量" prop="goods_weight">
        <el-input v-model="editForm.goods_weight" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogClose">取消</el-button>
      <el-button @click="editGoodsInfo">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { formRules } from "../FormRuler";

export default {
  name: "editDialog",
  components: {},
  props: {
    editForm: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formRules,
    };
  },
  computed: {
    ...mapGetters(["editGoodsDialogVisible"]),
    editGoodsDialogVisible: {
      get() {
        return this.$store.state.editGoodsDialogVisible;
      },
      set(bol) {
        this.$store.commit("IseditGoodsDialogShow", bol);
      },
    },
  },
  methods: {
    ...mapMutations(["IseditGoodsDialogShow"]),
    editDialogClose() {
      this.$store.commit("IseditGoodsDialogShow", false);
    },
    editGoodsInfo() {
      this.$refs.editFormRef.validate(async (valid, options) => {
        // 表单验证未通过
        if (!valid) {
          let arr = Object.keys(options);
          return this.$message.error({
            message: options[arr[0]][0].message,
            duration: 1500,
          });
        }
        this.$emit("editGoodsSure", this.editForm);
      });
    },
  },
};
</script>

<style scoped lang='less'>
</style>
