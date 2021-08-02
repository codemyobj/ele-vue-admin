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
              <!-- 二级权限渲染 -->
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
                  <!-- 三级权限渲染 -->
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
              icon="el-icon-delet"
              @click="removeClick(scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="setClick(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- AddRole -->
    <add-role @addRoleInfo="addRoleSure" />
    <!-- EditRole -->
    <edit-role :editForm="editForm" @editRoleInfo="editRoleSure" />
    <!-- SetRole -->
    <set-role :rightsList="rightsList" @setRights="setRights" />
  </div>
</template>

<script>
import BreadCrumb from "@/components/common/breadCrumb";
import AddRole from "./children/AddRole.vue";
import EditRole from "./children/EditRole.vue";
import SetRole from "./children/SetRole.vue";

import {
  getRolesList,
  addRoleInfo,
  getRoleInfo,
  editRoleInfo,
  removeRoleInfo,
  setRoleList,
  setRoleSure,
} from "@/api/roles";
import { mapMutations } from "vuex";

export default {
  name: "Roles",
  components: {
    BreadCrumb,
    AddRole,
    EditRole,
    SetRole,
  },
  props: {},
  data() {
    return {
      roleList: [],
      editForm: {},
      rightsList: [],
      // 当前即将分配权限的角色id
      roleId: "",
      // 树节点默认选中的id节点数组
      activeKeys: [],
    };
  },
  created() {
    this._getRolesList();
  },
  methods: {
    ...mapMutations([
      "IsAddRoleDialogShow",
      "IsEditRoleDialogShow",
      "IsSetRoleDialogShow",
    ]),
    //点击添加角色
    addRole() {
      this.$store.commit("IsAddRoleDialogShow", true);
    },
    //确认添加角色
    addRoleSure(addForm) {
      addRoleInfo(addForm).then((res) => {
        const data = res.data;
        console.log(data);
        if (data.meta.status !== 201) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1000,
          });
        }
        this.$message.success({
          message: "添加角色成功!",
          duration: 1500,
        });
        this._getRolesList();
        this.$store.commit("IsAddRoleDialogShow", false);
      });
    },

    // 点击编辑
    editClick(roleInfo) {
      getRoleInfo(roleInfo.id).then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1000,
          });
        }
        this.editForm = data.data;
        this.$store.commit("IsEditRoleDialogShow", true);
      });
    },
    //确认编辑
    editRoleSure(editInfo) {
      console.log(editInfo);
      editRoleInfo(editInfo).then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1000,
          });
        }

        this.$message.success({
          message: "编辑角色信息成功!",
          duration: 1500,
        });
        this.$store.commit("IsEditRoleDialogShow", false);
        this._getRolesList();
      });
    },

    //点击删除
    async removeClick(roleInfo) {
      const result = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((reason) => reason);

      if (result === "cancel") {
        return this.$message({
          message: "已取消删除",
          duration: 1500,
        });
      }
      //确认删除
      removeRoleInfo(roleInfo.id).then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1500,
          });
        }

        this.$message.success({
          message: "删除角色成功",
          duration: 1500,
        });
        this._getRolesList();
      });
    },

    //点击分配权限
    setClick(roles) {
      this.roleId = roles.id;
      setRoleList().then((res) => {
        const data = res.data;
        //获取失败
        if (data.meta.status !== 200) {
          return this.$message({
            message: data.meta.msg,
            duration: 1500,
          });
        }
        this.rightsList = data.data;
      });
      this.getActiveKeys(roles, this.activeKeys);
      this.$store.commit("IsSetRoleDialogShow", true);
    },

    // 通过递归 获取所有三级权限的id 并保存到数组中
    getActiveKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => {
        this.getActiveKeys(item, arr);
      });
    },

    //确认分配权限
    setRights(idStr) {
      setRoleSure(this.roleId, idStr).then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1000,
          });
        }

        this.$message.success({
          message: "分配权限成功",
          duration: 1500,
        });
      });
      this._getRolesList();
      this.$store.commit("IsSetRoleDialogShow", false);
    },

    //获取角色列表
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
