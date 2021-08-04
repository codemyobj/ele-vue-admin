<template>
  <div>
    <bread-crumb>
      <span slot="slotA">商品管理</span>
      <span slot="slotB">添加商品</span>
    </bread-crumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-alert
        title="添加商品信息"
        :closable="false"
        type="info"
        center
        show-icon
      />
      <!-- 进度条 -->
      <el-steps
        :active="activeIndex * 1"
        finish-status="success"
        process-status="process"
      >
        <el-step title="基本信息" icon="el-icon-edit" />
        <el-step title="商品参数" icon="el-icon-document" />
        <el-step title="商品属性" icon="el-icon-document-copy" />
        <el-step title="商品图片" icon="el-icon-picture" />
        <el-step title="商品内容" icon="el-icon-reading" />
        <el-step title="完成" icon="el-icon-circle-check" />
      </el-steps>

      <!-- tab栏区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-tabs
          tab-position="left"
          v-model="activeIndex"
          @tab-click="tabClicked"
        >
          <el-tab-pane name="0" label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name" />
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number" />
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number" />
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number" />
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                clearable
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="cateProps"
                @change="handleChange"
              />
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane name="1" label="商品参数">
            <el-form-item
              :label="item.attr_name"
              v-for="item in manyTableData"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="title"
                  border
                  v-for="(title, index) in item.attr_vals"
                  :key="index"
                />
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane name="2" label="商品属性">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyTableData"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals" />
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane name="3" label="商品图片">
            <el-upload
              list-type="picture-card"
              :headers="headerObj"
              :action="uploadUrl"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>

          <el-tab-pane name="4" label="商品内容" v-model="activeIndex">
            <quill-editor></quill-editor>
            <el-button type="primary" class="btnAdd">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/common/breadCrumb";

import { addFormRules } from "./FormRuler";

import { getCateList, getManyTableData, getOnlyTableData } from "@/api/goods";

export default {
  name: "AddGoods",
  components: {
    BreadCrumb,
  },
  props: {},
  data() {
    return {
      // 步骤条默认选中项
      activeIndex: "0",
      // 用于保存添加的商品信息
      addForm: {
        goods_name: "",
        goods_price: null,
        goods_weight: null,
        goods_number: null,
        // 商品所属的分类数组
        goods_cat: [],
        //图片数组
        pics: [],
        //商品的详情描述
        goods_introduce: "",
        attrs: [],
      },
      addFormRules,
      // 商品分类列表
      cateList: [],
      //级联选择器的配置选项
      cateProps: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      // 动态参数列表数据
      manyTableData: [],
      // 静态属性列表数据
      onlyTableData: [],
      //图片上传的请求头
      headerObj: {
        Authorization: window.sessionStorage.getItem("token"),
      },
      uploadUrl: "http://120.53.120.229:8888/api/private/v1/upload",
    };
  },
  created() {
    this._getCateList();
    console.log(this.addForm);
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2];
      } else {
        return null;
      }
    },
  },
  methods: {
    _getCateList() {
      getCateList().then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1000,
          });
        }

        this.cateList = data.data;
      });
    },
    _getManyTableData() {
      getManyTableData(this.cateId, "many").then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error("获取动态参数失败" + data.meta.msg);
        }
        console.log(data);
        data.data.forEach((item) => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(",");
        });

        this.manyTableData = data.data;
      });
    },
    _getOnlyTableData() {
      getOnlyTableData(this.cateId, "only").then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: "获取静态属性失败" + data.meta.msg,
            duration: 1500,
          });
        }

        this.onlyTableData = data.data;
      });
    },
    tabClicked() {
      if (this.activeIndex === "1") {
        this._getManyTableData();
      } else if (this.activeIndex === "2") {
        this._getOnlyTableData();
      }
    },
    handleChange() {
      console.log(this.addForm.goods_cat);
    },
  },
};
</script>

<style scoped lang='less'>
</style>
