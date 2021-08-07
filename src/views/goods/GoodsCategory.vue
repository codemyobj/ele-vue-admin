<template>
  <div>
    <bread-crumb>
      <span slot="slotA">商品管理</span>
      <span slot="slotB">商品分类</span>
    </bread-crumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加分类 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addCateClick">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <tree-table
        :data="cateList"
        :columns="columns"
        show-index
        index-text="#"
        :show-row-hover="false"
        :selection-type="false"
        :expand-type="false"
        border
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i v-if="scope.row.cat_deleted === false" class="el-icon-success" />
          <i v-else class="el-icon-error" />
        </template>

        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag effect="dark" v-if="scope.row.cat_level === 0" type="primary">一级</el-tag>
          <el-tag effect="dark" v-else-if="scope.row.cat_level === 1" type="success">二级</el-tag>
          <el-tag effect="dark" v-else type="warning">三级</el-tag>
        </template>

        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showEditDialog(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="removeCateById(scope.row)"
            >删除</el-button
          >
        </template>
      </tree-table>

      <!-- 分页 -->
      <pagination
        :queryInfo="queryInfo"
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </el-card>

    <!-- 添加分类 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="40%">
      <!-- 添加分类的表单 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRuler"
        label-width="100px"
        class="demo-ruleForm"
        ref="addFormRef"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name" />
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            placeholder="默认添加至一级分类"
            change-on-select
            v-model="seletedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChange"
            clearable
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addCate">确定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑分类对话框 -->
    <el-dialog title="编辑分类对话框" :visible.sync="editDialogVisible" width="40%">
      <el-form
        :model="editForm"
        :rules="addCateFormRuler"
        ref="editRef"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editForm.cat_name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button @click="editFormConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from '@/components/common/breadCrumb'
import Pagination from '@/components/common/pagination'

import { addCateFormRuler } from './FormRuler'

import {
  getDetailCateList,
  getParentCateList,
  sureAddCate,
  showCateEditInfo,
  sureEditFormInfo,
  removeCateList
} from '@/api/goods'

export default {
  name: 'GoodsCategory',
  components: {
    BreadCrumb,
    Pagination
  },
  props: {},
  data() {
    return {
      // 商品分类的数据列表默认为空
      cateList: [],
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品总数
      total: 0,
      // 为table指定列的定义
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // 表示当前列定义为模板列
          type: 'template',
          // 定义模板名称
          template: 'isok'
        },
        {
          label: '级别',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt',
          width: '200px'
        }
      ],
      // 父级分类的数据列表
      parentCateList: [],
      // 添加分类对话框
      addCateDialogVisible: false,
      // 添加分类绑定的表单数据
      addCateForm: {
        // 分类的名称
        cat_name: '',
        // 父级分类的id
        cat_pid: 0,
        // 分类的等级 默认是一级分类
        cat_level: 0
      },
      // 表单规则
      addCateFormRuler,
      // 级联选择器中选择的id值
      seletedKeys: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id', //真实选中的是什么
        label: 'cat_name', //看到的是什么
        children: 'children' //父子嵌套的属性
      },
      // 编辑对话框的展示
      editDialogVisible: false,
      // 保存编辑状态下的数据
      editForm: {}
    }
  },
  created() {
    this._getDetailCateList()
  },
  methods: {
    // 获取商品分类数据
    _getDetailCateList() {
      getDetailCateList(this.queryInfo).then(res => {
        const data = res.data
        if (data.meta.status !== 200) {
          return this.$message.error('获取商品分类数据失败：' + data.meta.msg)
        }
        this.cateList = data.data.result
        this.total = data.data.total
      })
    },

    // 获取Fiji分类的数据列表
    _getParentCateList() {
      getParentCateList().then(res => {
        const data = res.data
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            druation: 1000
          })
        }
        this.parentCateList = data.data
      })
    },

    // 点击添加分类
    addCateClick() {
      // 先获取腹肌分类的数据列表 再展示对话框
      this._getParentCateList()
      this.addCateDialogVisible = true
    },

    // 添加分类
    addCate() {
      this.$refs.addFormRef.validate(async (valid, field) => {
        if (!valid) {
          let arr = Object.keys(field)
          return this.$message.error({
            message: field[arr[0]][0].message,
            druation: 1500
          })
        }
        sureAddCate(this.addCateForm).then(res => {
          const data = res.data
          // 添加分类失败
          if (data.meta.status !== 201) {
            return this.$message.error({
              message: data.meta.msg,
              druation: 1500
            })
          }

          this.$message.success('添加分类成功')
          this._getDetailCateList()
          this.addCateDialogVisible = false
        })
      })
    },

    // 添加对话框内的级联选择器发生改变触发
    parentCateChange() {
      if (this.seletedKeys.length > 0) {
        // 拿到选中项目最子集的id
        this.addCateForm.cat_id = this.seletedKeys[this.seletedKeys.length - 1]
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.seletedKeys.length
      } else {
        this.addCateForm.cat_id = 0
        this.addCateForm.cat_level = 0
      }
    },

    // 点击编辑按钮
    showEditDialog(cateInfo) {
      showCateEditInfo(cateInfo.cat_id).then(res => {
        const data = res.data
        // 根据id获取数据失败
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            druation: 1500
          })
        }
        this.editForm = data.data
      })
      this.editDialogVisible = true
    },

    // 确定编辑按钮
    editFormConfirm() {
      sureEditFormInfo(this.editForm.cat_id, this.editForm.cat_name).then(res => {
        const data = res.data
        // 根据id获取数据失败
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            druation: 1500
          })
        }
        this.$message.success({
          message: '编辑成功~',
          druation: 1500
        })
        this._getDetailCateList()
        this.editDialogVisible = false
      })
    },

    // 通过id删除分类
    async removeCateById(cateInfo) {
      let result = await this.$confirm(
        `此操作将永久删除 <span style="color:red;font-weight:bold;">${cateInfo.cat_name} </span>分类, 是否继续?`,
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }
      ).catch(reason => reason)

      // 取消删除
      if (result === 'cancel') {
        return this.$message.info({
          message: '已取消删除!',
          druation: 1500
        })
      }
      removeCateList(cateInfo.cat_id).then(res => {
        const data = res.data
        // 删除失败
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            druation: 1500
          })
        }
        this.$message.success({
          message: '删除成功!',
          druation: 1000
        })
        this._getDetailCateList()
      })
    },

    // 处理页码
    handleSizeChange(newSize) {
      this.queryInfo.pagenum = newSize
      this._getDetailCateList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagesize = newPage
      this._getDetailCateList()
    }
  }
}
</script>

<style scoped lang="less">
.el-icon-success {
  color: green;
  font-size: 22px;
}
.el-icon-error {
  color: red;
  font-size: 22px;
}
.zk-table {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
.zk-table__cell-inner {
  font-size: 14px;
}
</style>
