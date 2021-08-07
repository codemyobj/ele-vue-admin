<template>
  <div>
    <bread-crumb>
      <span slot="slotA">商品管理</span>
      <span slot="slotB">商品参数</span>
    </bread-crumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数!"
        type="info"
        effect="dark"
        show-icon
        :closable="false"
      />

      <!-- 选择商品分类 -->
      <el-row class="mt-5">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            v-model="selectedCateKeys"
            :options="cateList"
            :props="cateProps"
            @change="handleChange"
          />
        </el-col>
      </el-row>

      <!-- tabs页签区域 -->
      <!-- v-model 指定默认选中和保存当前选中的是谁 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button
            size="small"
            type="primary"
            :disabled="isBtnDisabled"
            @click="addDialogVisible = true"
            >添加参数</el-button
          >
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template v-slot="scope">
                <!-- 循环渲染tag标签 -->
                <el-tag
                  class="el-tag-params"
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  @close="handleClose(scope.row, index)"
                >
                  {{ item }}
                </el-tag>

                <!-- 创建输入tag标签 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  size="small"
                  ref="saveTagInput"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                />
                <el-button v-else class="button-new-tag" size="small" @click="addTag(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index" label="#" />
            <el-table-column label="属性名称" prop="attr_name" />
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  size="small"
                  round
                  type="primary"
                  icon="el-icon-edit"
                  @click="showEditDialog(scope.row.attr_id)"
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  round
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeParams(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态属性表格 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button
            size="small"
            type="primary"
            :disabled="isBtnDisabled"
            @click="addDialogVisible = true"
            >添加属性</el-button
          >
          <el-table :data="onlyTableData" border stripe>
            <el-table-column type="expand">
              <template v-slot="scope">
                <el-tag
                  class="el-tag-params"
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                >
                  {{ item }}
                </el-tag>

                <!-- 创建输入tag标签 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                />
                <el-button v-else class="button-new-tag" size="small" @click="addTag(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index" label="#" />
            <el-table-column label="属性名称" prop="attr_name" />
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  size="small"
                  round
                  type="primary"
                  icon="el-icon-edit"
                  @click="showEditDialog(scope.row.attr_id)"
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  round
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeParams(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数对话框 -->
    <el-dialog :title="'添加' + titleText" :visible.sync="addDialogVisible" width="40%">
      <el-form :model="addForm" :rules="editAndAddRules" ref="addFormRef" label-width="80px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button @click="addParams">确定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑参数对话框 -->
    <el-dialog :title="'修改' + titleText" :visible.sync="editDialogVisible" width="40%">
      <el-form :rules="editAndAddRules" :model="editForm" ref="editFormRef" label-width="80px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button @click="editParams">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from '@/components/common/breadCrumb'

import {
  getCateList,
  getParamsData,
  saveAttrVals,
  getEditInfo,
  sureAddParams,
  removeParams,
  sureEditParams
} from '@/api/goods'

import { editAndAddRules } from './FormRuler'

export default {
  name: 'GoodsParams',
  components: {
    BreadCrumb
  },
  props: {},
  data() {
    return {
      cateList: [],
      // 级联选择器双向绑定到的数组
      selectedCateKeys: [],
      // 级联选择器配置对象
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id', //指定真实选中的值
        label: 'cat_name', //指定看见的值
        children: 'children' //父子节点的嵌套属性
      },
      //被激活的页签的名称
      activeName: 'many',
      // 动态数据
      manyTableData: [],
      // 静态数据
      onlyTableData: [],
      // 添加参数对话框
      addDialogVisible: false,
      // 控制是否显示编辑对话框
      editDialogVisible: false,
      // 修改对话框表单数据
      editForm: {},
      // 表单验证
      editAndAddRules,
      // 添加参数数据对象
      addForm: {}
    }
  },
  created() {
    this._getCateList()
  },
  computed: {
    // 当前选中的三级分类id
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      }
      return null
    },
    // 根据级联选择框是否选中三级分类返回true | false 用于控制button按钮是否禁用
    isBtnDisabled() {
      if (this.selectedCateKeys.length === 3) {
        return false
      }
      return true
    },
    // 动态计算对话框的标题文本
    titleText() {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态参数'
    }
  },
  methods: {
    // 获取商品分类数据
    _getCateList() {
      getCateList().then(res => {
        const data = res.data
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1500
          })
        }
        this.cateList = data.data
      })
    },

    // 获取参数列表数据
    _getParamsData() {
      getParamsData(this.cateId, this.activeName).then(res => {
        const data = res.data
        if (data.meta.status !== 200) {
          this.$message.error({
            message: data.meta.msg,
            duration: 1500
          })
        }
        data.data.forEach(item => {
          if (item.attr_vals) {
            item.attr_vals = item.attr_vals.split(',')
            // 新增一个属性 控制文本框的(New Tag)显示和隐藏
            item.inputVisible = true
            // 文本框中输入的值
            item.inputValue = ''
          } else {
            // 新增一个属性 控制文本框的(New Tag)显示和隐藏
            item.inputVisible = false
            // 文本框中输入的值
            item.inputValue = ''
            item.attr_vals = []
          }
        })
        if (this.activeName === 'many') {
          this.manyTableData = data.data
        } else {
          this.onlyTableData = data.data
        }
      })
    },

    // 将对attr_vals的操作保存到数据库
    _saveAttrVals(rowInfo) {
      const info = {
        attr_name: rowInfo.attr_name,
        attr_sel: rowInfo.attr_sel,
        attr_vals: rowInfo.attr_vals.join(',')
      }
      saveAttrVals(this.cateId, rowInfo.attr_id, info).then(res => {
        const data = res.data
        if (data.meta.status !== 200) {
          return this.$notify({
            title: '失败',
            message: '更新数据失败!',
            type: 'error',
            duration: 1500
          })
        }

        this.$notify({
          title: '成功',
          message: '更新数据成功!',
          type: 'success',
          duration: 1500
        })
      })
    },

    //级联选择框选中项变化会触发该函数
    handleChange() {
      //  判断选中的不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        this.$message.warning('只能设置三级分类')
        this.selectedCateKeys = []
        this.onlyTableData = []
        this.manyTableData = []
        this.selectedCateKeys = []
        return
      }
      this._getParamsData()
    },

    // 点击tab响应函数
    handleTabClick() {
      //没有选择分裂
      if (this.selectedCateKeys.length === 0) {
        this.$message.warning('请选择商品分类')
        return (this.selectedCateKeys = [])
      }
      // console.log(this.manyTableData);
      this._getParamsData()
    },

    //点击tag标签删除对应属性
    async handleClose(rowInfo, index) {
      const result = await this.$confirm(
        `此操作将永久删除该 <strong style="color:red;">${rowInfo.attr_vals[index]}</strong> 属性, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }
      ).catch(reason => reason)

      // 取消删除
      if (result === 'cancel') {
        return this.$notify.info({
          title: '取消',
          message: '已取消删除',
          duration: 1500
        })
      }

      rowInfo.attr_vals.splice(index, 1)
      // 将操作后的数据保存到数据库
      this._saveAttrVals(rowInfo)
    },

    // 文本框失去焦点或者按下回车都会触发该函数
    handleInputConfirm(rowInfo) {
      if (rowInfo.inputValue.trim().length === 0) {
        rowInfo.inputValue = ''
        rowInfo.inputVisible = false
        return
      }

      rowInfo.attr_vals.push(rowInfo.inputValue.trim())
      rowInfo.inputValue = ''
      rowInfo.inputVisible = false

      // 发起网络请求保存数据
      this._saveAttrVals(rowInfo)
    },

    // 添加标签
    addTag(rowInfo) {
      rowInfo.inputVisible = true
      // 让文本框自动获得焦点
      // $nextTick 就是当页面上元素被重新渲染之后才会执行回调内的函数代码
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    // 点击编辑 展示修改参数对话框
    showEditDialog(attr_id) {
      getEditInfo(this.cateId, attr_id, this.activeName).then(res => {
        const data = res.data
        // 查询失败
        if (data.meta.status !== 200) {
          this.$message.error({
            message: data.meta.msg,
            duration: 1500
          })
        }
        this.editForm = data.data
      })
      this.editDialogVisible = true
    },

    // 删除参数
    async removeParams(attrInfo) {
      const result = await this.$confirm(
        `此操作将永久删除 <strong style="color:red;">${attrInfo.attr_name}</strong> 参数, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true, //开启html支持
          type: 'warning'
        }
      ).catch(reason => reason)

      // 取消删除
      if (result === 'cancel') {
        return this.$message({
          message: '以取消删除!',
          duration: 1500
        })
      }
      removeParams(this.cateId, attrInfo.attr_id).then(res => {
        const data = res.data
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1500
          })
        }
        this.$message.success({
          message: '删除成功',
          duration: 1500
        })
        this._getParamsData()
      })
    },

    // 确定添加的参数
    addParams() {
      this.$refs.addFormRef.validate(async (valid, option) => {
        // 未通过表单验证
        if (!valid) {
          let arr = Object.keys(options)
          return this.$message.error({
            message: options[arr[0]][0].message,
            duration: 1500
          })
        }

        const info = {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName
        }
        sureAddParams(this.cateId, info).then(res => {
          const data = res.data
          if (data.meta.status !== 201) {
            return this.$message.error({
              message: data.meta.msg,
              duration: 1500
            })
          }

          this.$message.success({
            message: '添加参数成功'
          })
          this._getParamsData()
          this.addDialogVisible = false
        })
      })
    },

    // 确定编辑的参数
    editParams() {
      this.$refs.editFormRef.validate(async (valid, options) => {
        // 未通过表单验证
        if (!valid) {
          let arr = Object.keys(options)
          return this.$message.error({
            message: options[arr[0]][0].message,
            duration: 1500
          })
        }
        const info = {
          attr_name: this.editForm.attr_name,
          attr_sel: this.activeName
        }
        sureEditParams(this.cateId, this.editForm.attr_id, info).then(res => {
          const data = res.data
          // 修改参数失败
          if (data.meta.status !== 200) {
            return this.$message.error({
              message: data.meta.msg,
              duration: 1500
            })
          }
          this.$message.success({
            message: '修改参数成功!',
            duration: 1500
          })
          this._getParamsData()
          this.editDialogVisible = false
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.mt-5 {
  margin: 15px 0;
}
.el-tag-params {
  margin-right: 15px;
}

.input-new-tag {
  width: 120px;
}
</style>
