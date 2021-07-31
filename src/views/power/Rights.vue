<template>
  <div>
    <breadCrumb>
      <span slot="slotA">权限管理</span>
      <span slot="slotB">权限列表</span>
    </breadCrumb>

    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" label="#" />
        <el-table-column prop="authName" label="权限名称" />
        <el-table-column prop="path" label="路径" />
        <el-table-column label="权限等级">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag v-else-if="scope.row.level === '1'" type="success"
              >二级</el-tag
            >
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/common/breadCrumb";
import { getRolesList } from "@/api/rights";

export default {
  name: "Rights",
  components: {
    BreadCrumb,
  },
  props: {},
  data() {
    return {
      rightsList: [],
    };
  },
  created() {
    this._getRolesList();
  },
  methods: {
    _getRolesList() {
      getRolesList().then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error({
            message: data.meta.msg,
            duration: 1000,
          });
        }
        this.rightsList = data.data;
      });
    },
  },
};
</script>

<style scoped lang='less'>
</style>
