<template>
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
    <el-table-column label="商品价格(元)" prop="goods_price" width="105px" />
    <el-table-column label="商品重量(克)" prop="goods_weight" width="105px" />
    <el-table-column label="创建时间" prop="add_time" width="165px">
      <template v-slot="scope">{{ scope.row.add_time | dataFormat }}</template>
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
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="removeClick(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "tableList",
  components: {},
  props: {
    goodsList: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    editClick() {
      this.$emit("editClick");
    },
    removeClick() {
      this.$emit("removeClick");
    },
  },
};
</script>

<style scoped lang='less'>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 80%;
}
</style>
