<template>
  <div>
    <!-- 面包屑导航 -->
    <breadCrumb>
      <span slot="slotA">用户管理</span>
      <span slot="slotB">用户列表</span>
    </breadCrumb>
    <!-- 面包屑导航 -->

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索和添加 -->
      <search-and-add :queryInfo="queryInfo" @searchUserList="getUserList" />
      <!-- 用户列表区域 -->
      <user-list
        :user-list="userList"
        @userStateChange="changeUserState"
        @editClick="editClick"
        @setClick="setClick"
        @removeClick="removeClick"
      />
      <!-- 分页区域 -->
      <pagination
        :total="total"
        :queryInfo="queryInfo"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
      <!-- 添加用户对话框 -->
      <add-user @addUser="addUser" />

      <!-- 修改用户对话框 -->
      <edit-user :editForm="editForm" @editUserInfo="editUserInfo" />

      <!-- 分配角色 -->
      <set-roles
        :userInfo="userInfo"
        :roleList="roleList"
        @saveRoleInfo="saveRoleInfo"
      />
    </el-card>
    <!-- 卡片视图区域 -->
  </div>
</template>

<script>
import SearchAndAdd from "./children/SearchAndAdd";
import UserList from "./children/UserList.vue";
import AddUser from "./children/AddUser.vue";
import EditUser from "./children/EditUser.vue";
import SetRoles from "./children/SetRoles.vue";
import BreadCrumb from "@/components/common/breadCrumb";
import Pagination from "@/components/common/pagination";

//网络请求方法
import {
  getUserList,
  userStateChange,
  addUserList,
  editUserData,
  userInfoChange,
  getUserRole,
  saveUserRole,
  removeUser,
} from "@/api/user";

//vuex修改
import { mapMutations } from "vuex";

export default {
  name: "User",
  components: {
    BreadCrumb,
    SearchAndAdd,
    UserList,
    AddUser,
    EditUser,
    SetRoles,
    Pagination,
  },
  props: {},
  data() {
    return {
      queryInfo: {
        query: "", //查询参数
        pagenum: 1, //当前页码
        pagesize: 10, //每页显示多少条数据
      },
      //用户列表
      userList: [],
      //列表总数
      total: 0,
      //查询到的用户信息对象
      editForm: {},
      // 需要分配权限的用户信息
      userInfo: {},
      // 权限列表
      roleList: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //获取修改方法
    ...mapMutations(["IsAddDialogShow", "IsEditDialogShow", "IsSetDialogShow"]),
    getUserList() {
      getUserList(this.queryInfo).then((res) => {
        const data = res.data;
        // 获取失败
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1000,
          });
        }
        this.userList = data.data.users;
        this.total = data.data.total;
      });
    },
    //改变状态
    changeUserState(userInfo) {
      userStateChange(userInfo).then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state;
          return this.$message.error({
            message: data.meta.msg,
            duration: 1000,
          });
        }
        this.$message.success({
          message: "更新状态成功!",
          duration: 1000,
        });
      });
    },
    //添加用户
    addUser(addForm) {
      addUserList(addForm).then((res) => {
        const data = res.data;
        //创建用户失败
        if (data.meta.status !== 201) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1500,
          });
        }
        this.$notify({
          type: "success",
          title: "添加成功",
          message: `注意当您添加成功后：<br/>
                        1.需要开启该用户 <br/>
                        2.请为该用户分配角色(默认角色无效)`,
          dangerouslyUseHTMLString: true,
          duration: 0,
        });
        this.$store.commit("IsAddDialogShow", false);
        this.getUserList();
      });
    },
    // 修改用户信息
    editClick(id) {
      this.$store.commit("IsEditDialogShow", true);
      editUserData(id).then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1000,
          });
        }
        this.editForm = data.data;
      });
    },
    // 确认修改按钮
    editUserInfo(editForm) {
      const putInfo = {
        email: editForm.email,
        mobile: editForm.mobile,
      };
      userInfoChange(editForm.id, putInfo).then((res) => {
        const data = res.data;
        console.log(data);
        if (data.meta.status !== 200) {
          return this.message({
            message: data.meta.msg,
            duration: 1000,
          });
        }
        this.$message.success({
          message: "修改用户数据成功",
          duration: 1500,
        });
        this.$store.commit("IsEditDialogShow", false);
        this.getUserList();
      });
    },
    //删除用户
    async removeClick(id) {
      const result = await this.$confirm(
        "此操作将永久删除用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "下次再说",
          type: "warning",
        }
      ).catch((err) => err);
      // 取消删除
      if (result == "cancel") {
        return this.$message.info({
          message: "已取消删除",
          duration: 1500,
        });
      }
      //确定删除
      removeUser(id).then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: field[arr[0]][0].message,
            duration: 1500,
          });
        }
        this.$message.success({
          message: "删除成功!",
          duration: 1500,
        });
        this.getUserList();
      });
    },
    //分配用户角色
    setClick(userInfo) {
      this.$store.commit("IsSetDialogShow", true);
      getUserRole().then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1500,
          });
        }
        this.roleList = data.data;
      });
      this.$store.commit("IsSetDialogShow", true);
      this.userInfo = userInfo;
    },
    //保存分配的用户角色
    saveRoleInfo(id, rid) {
      saveUserRole(id, rid).then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1500,
          });
        }
        this.$message.success({
          message: "更新角色成功",
          duration: 1500,
        });
        this.getUserList();
        this.$store.commit("IsSetDialogShow", false);
      });
    },

    //处理页码的更新
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
  },
};
</script>

<style scoped lang='less'>
</style>
