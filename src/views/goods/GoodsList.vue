<template>
  <div>
    <bread-crumb>
      <span slot="slotA">商品管理</span>
      <span slot="slotB">商品列表</span>
    </bread-crumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索 -->
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="$router.push('/goods/add')"
            >添加商品</el-button
          >
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="goodsList" border stripe style="width: 100%">
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称 :">
                <span>{{ scope.row.goods_name }}</span>
              </el-form-item>
              <el-form-item label="价格 :">
                <span>{{ scope.row.goods_price + ".00" }}</span>
              </el-form-item>
              <el-form-item label="库存 :">
                <span>{{ scope.row.goods_number }}</span>
              </el-form-item>
              <el-form-item label="重量 :">
                <span>{{ scope.row.goods_weight }}</span>
              </el-form-item>
              <el-form-item label="商品状态 :">
                <span v-if="scope.row.goods_state === 0">未审核</span>
                <span v-else>已审核</span>
              </el-form-item>
              <el-form-item label="添加时间 :">
                <span>{{ scope.row.add_time }}</span>
              </el-form-item>
              <el-form-item label="更新时间 :">
                <span>{{ scope.row.upd_time }}</span>
              </el-form-item>
              <el-form-item label="是否为热销品 :">
                <i
                  style="color: green; font-size: 18px"
                  class="el-icon-success"
                  v-if="scope.row.is_promote"
                />
                <i
                  style="color: red; font-size: 18px"
                  class="el-icon-error"
                  v-else
                />
              </el-form-item>
              <el-form-item label="热销品数量 :">
                <span>{{ scope.row.hot_number }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" />
        <el-table-column label="商品名称" prop="goods_name" />
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
          width="105px"
        />
        <el-table-column
          label="商品重量(克)"
          prop="goods_weight"
          width="105px"
        />
        <el-table-column label="创建时间" prop="add_time" width="165px">
          <template v-slot="scope">{{ scope.row.add_time }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180px">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editClick(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
import EditDialog from "./listChildren/editDialog.vue";

import { getGoodsList, getEditGoods, editGoodsSubmit } from "../../api/goods";

import { mapMutations } from "vuex";

export default {
  name: "GoodsList",
  components: {
    BreadCrumb,
    Pagination,
    EditDialog,
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

    //处理页码
    handleSizeChange() {},
    handleCurrentChange() {},
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
