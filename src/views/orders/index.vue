<template>
  <div>
    <bread-crumb>
      <span slot="slotA">订单管理</span>
      <span slot="slotB">订单列表</span>
    </bread-crumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </el-col>
      </el-row>

      <!-- 订单列表数据 -->
      <el-table :data="orderList" border stripe>
        <el-table-column type="index" label="#" />
        <el-table-column label="订单编号" prop="order_number" />
        <el-table-column label="订单价格" prop="order_price" />
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status == '1'" type="success">已付款</el-tag>
            <el-tag v-else type="danger">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send" />
        <el-table-column label="下单时间" prop="create_time">
          <template slot-scope="props">{{ props.row.create_time | dataFormat }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template>
            <el-tooltip content="修改地址" :enterable="false" placement="top">
              <el-button
                size="small"
                round
                type="primary"
                icon="el-icon-edit"
                @click="showEditBox"
              />
            </el-tooltip>
            <el-tooltip content="物流状态" :enterable="false" placement="top">
              <el-button
                size="small"
                round
                type="success"
                icon="el-icon-location"
                @click="showProgressBox"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页功能 -->
      <pagination
        :total="total"
        :queryInfo="queryInfo"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </el-card>

    <!-- 修改地址对话框 -->
    <el-dialog title="修改地址" :visible.sync="addressVisible" width="40%">
      <el-form
        :model="addressForm"
        :rules="addressFormRules"
        ref="addressFormRef"
        label-width="100px"
      >
        <el-form-item label="省市区县" prop="address1">
          <el-cascader
            :options="cityData"
            v-model="addressForm.address1"
            :props="{ expandTrigger: 'hover' }"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressVisible = false">取消</el-button>
        <el-button type="primary" @click="addressVisible = false">确定</el-button>
      </span>
    </el-dialog>

    <!-- 展示物流进度对话框 -->
    <el-dialog title="物流进度" :visible.sync="progressBoxVisible">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time"
        >
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from '@/components/common/breadCrumb'
import Pagination from '@/components/common/pagination'

import cityData from './citydata'
import progressInfo from './progressInfo.json'

import { getOrderList } from '@/api/order'

export default {
  name: 'Order',
  components: {
    BreadCrumb,
    Pagination
  },
  props: {},
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      // 订单数据
      orderList: [],
      // 控制修改地址对话框是否展示
      addressVisible: false,
      addressForm: {
        address1: [],
        address2: ''
      },
      addressFormRules: {
        address1: [{ required: true, message: '请选择省市区县', trigger: 'blur' }],
        address2: [{ required: true, message: '请填写详细地址', trigger: 'blur' }]
      },
      // 城市数据
      cityData,
      // 物流进度对话框的展示
      progressBoxVisible: false,
      // 物流信息
      progressInfo: progressInfo.data
    }
  },
  created() {
    this._getOrderList()
  },
  methods: {
    _getOrderList() {
      getOrderList(this.queryInfo).then(res => {
        const data = res.data
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: '获取订单列表失败',
            duration: 1500
          })
        }
        this.total = data.data.total
        this.orderList = data.data.goods
      })
    },

    // 修改按钮点击
    showEditBox() {
      this.addressVisible = true
    },

    // 展开进度对话框
    showProgressBox() {
      this.progressBoxVisible = true
    },

    // 对页码的操作
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this._getOrderList()
    },

    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this._getOrderList()
    }
  }
}
</script>

<style scoped lang="less">
.el-cascader {
  width: 100%;
}
</style>
