<template>
  <div>
    <breadCrumb>
      <span slot="slotA">权限管理</span>
      <span slot="slotB">角色列表</span>
    </breadCrumb>

    <el-card>
      <!-- 添加角色 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRole">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="roleList" border stripe>
        <!-- 设置为展开列 -->
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="i1"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag>{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right" />
              </el-col>
              <el-col :span="19">
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="i2"
                >
                  <el-col :span="6">
                    <el-tag type="success">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right" />
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="(item3, i3) in item2.children"
                      :key="i3"
                      type="warning"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column width="300px" label="操作">
          <template>
            <el-button size="mini" type="primary" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delet"
              >删除</el-button
            >
            <el-button size="mini" type="warning" icon="el-icon-setting"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/common/breadCrumb";
import { getRolesList } from "@/api/roles";

export default {
  name: "Roles",
  components: {
    BreadCrumb,
  },
  props: {},
  data() {
    return {
      roleList: [],
    };
  },
  created() {
    this._getRolesList();
  },
  methods: {
    addRole() {},
    _getRolesList() {
      getRolesList().then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1000,
          });
        }
        this.roleList = data.data;
        console.log(this.roleList);
      });
    },
  },
};
</script>

<style scoped lang='less'>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
