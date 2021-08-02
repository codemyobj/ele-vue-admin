<template>
  <div>
    <bread-crumb>
      <span slot="slotA">商品管理</span>
      <span slot="slotB">商品列表</span>
    </bread-crumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索区域 -->
      <add-and-search :queryInfo="queryInfo" @getGoodsList="_getGoodsList" />

      <!-- table表格区域 -->
      <table-list :goodsList="goodsList" />

      <!-- 页码区域 -->
      <pagination
        :queryInfo="queryInfo"
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </el-card>

    <!-- EditDialog -->
    <edit-dialog :editForm="editForm" @editGoodsSure="editGoodsSure" />
  </div>
</template>

<script>
import BreadCrumb from "@/components/common/breadCrumb";
import Pagination from "@/components/common/pagination";
import AddAndSearch from "./listChildren/addAndSearch.vue";
import EditDialog from "./listChildren/editDialog.vue";
import tableList from "./listChildren/tableList.vue";

import {
  getGoodsList,
  getEditGoods,
  editGoodsSubmit,
  removeGoods,
} from "@/api/goods";

import { mapMutations } from "vuex";

export default {
  name: "GoodsList",
  components: {
    BreadCrumb,
    Pagination,
    EditDialog,
    AddAndSearch,
    tableList,
  },
  props: {},
  data() {
    return {
      //商品列表
      goodsList: [],
      //查询参数
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      total: 0,
      editForm: {},
    };
  },
  created() {
    this._getGoodsList();
  },
  methods: {
    ...mapMutations(["IseditGoodsDialogShow"]),
    _getGoodsList() {
      getGoodsList(this.queryInfo).then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1500,
          });
        }
        this.goodsList = data.data.goods;
        this.total = data.data.total;
      });
    },

    // 点击编辑
    editClick(goodsInfo) {
      console.log(goodsInfo.goods_id);
      getEditGoods(goodsInfo.goods_id).then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1500,
          });
        }
        this.editForm = data.data;
      });
      this.$store.commit("IseditGoodsDialogShow", true);
    },

    //确认编辑
    editGoodsSure(editForm) {
      editGoodsSubmit(editForm.goods_id, editForm).then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1500,
          });
        }
        this.$message.success({
          message: "编辑商品成功",
          duration: 1000,
        });
        this._getGoodsList();
        this.$store.commit("IseditGoodsDialogShow", false);
      });
    },

    // 点击删除
    async removeClick(goodsInfo) {
      const result = await this.$confirm(
        `此操作将永久删除 <strong style="color:red;">${goodsInfo.goods_name}</strong>, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning",
        }
      ).catch((reason) => reason);

      // 取消删除
      if (result === "cancel") {
        return this.$message.info({
          message: "已取消删除",
          duration: 1500,
        });
      }

      // 确定删除
      removeGoods(goodsInfo.goods_id).then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1000,
          });
        }
        this.$message.success({
          message: "删除成功!",
          duration: 1500,
        });
        this._getGoodsList();
      });
    },

    //处理页码
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this._getGoodsList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this._getGoodsList();
    },
  },
};
</script>

<style scoped lang='less'>
.demo-table-expand {
  font-size: 0;
  label {
    width: 120px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 80%;
  }
}
</style>
