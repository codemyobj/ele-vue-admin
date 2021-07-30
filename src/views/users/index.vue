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
      <search-and-add
        :queryInfo="queryInfo"
        @addClick="addClick"
        @getUserList="getUserList"
      />
      <!-- 用户列表区域 -->
      <user-list
        :user-list="userList"
        @userStateChange="changeUserState"
        @editClick="editClick"
        @setClick="setClick"
      />
      <!-- 分页区域 -->
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        layout="total,sizes,prev,pager,next,jumper"
      />
      <!-- 添加用户对话框 -->
      <add-user @addUser="addUser" />

      <!-- 修改用户对话框 -->
      <edit-user
        :editDialogVisible="editDialogVisible"
        :editForm="editForm"
        @editUserInfo="editUserInfo"
        @editDialogClick="editDialogClick"
      />

      <!-- 分配权限 -->
      <el-dialog title="分配权限" width="40%" :visible.sync="setDialogVisible">
        <div>
          <p>当前的用户:</p>
          <p>当前的角色:</p>
          <p>
            分配新角色
            <el-select placeholder="请选择">
              <el-option />
            </el-select>
          </p>
        </div>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary">确定</el-button>
        </span>
      </el-dialog>
    </el-card>
    <!-- 卡片视图区域 -->
  </div>
</template>

<script>
import BreadCrumb from "@/components/common/breadCrumb";
import SearchAndAdd from "./children/SearchAndAdd";
import UserList from "./children/UserList.vue";
import AddUser from "./children/AddUser.vue";
import EditUser from "./children/EditUser.vue";

import {
  getUserList,
  userStateChange,
  addUserList,
  editUserData,
  userInfoChange,
} from "@/api/user";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "User",
  components: {
    BreadCrumb,
    SearchAndAdd,
    UserList,
    AddUser,
    EditUser,
  },
  props: {},
  data() {
    return {
      queryInfo: {
        query: "", //查询参数
        pagenum: 1, //当前页码
        pagesize: 10, //每页显示多少条数据
      },
      userList: [],
      //添加用户表单验证规则
      editDialogVisible: false,
      //查询到的用户信息对象
      editForm: {},
      setDialogVisible: false,
    };
  },
  created() {
    this.getUserList();
  },
  computed: {
    ...mapGetters(["addDialogVisible"]),
  },
  methods: {
    ...mapMutations(["IsAddDialogShow"]),
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
      });
    },
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
    //打开添加用户
    addClick() {
      this.addDialogVisible = !this.addDialogVisible;
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
    // 修改按钮
    editClick(id) {
      this.editDialogVisible = !this.editDialogVisible;
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
    //取消修改
    editDialogClick() {
      this.editDialogVisible = !this.editDialogVisible;
    },
    // 确认修改
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
        this.editDialogVisible = !this.editDialogVisible;
        this.getUserList();
      });
    },
    setClick() {
      this.setDialogVisible = true;
    },
  },
};
</script>

<style scoped lang='less'>
</style>
