<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-size="queryInfo.pagesize"
    :page-sizes="[5, 10, 15, 20]"
    layout="total,sizes,prev,pager,next,jumper"
    :total="total"
  />
</template>

<script>
export default {
  name: "pagination",
  components: {},
  props: {
    queryInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleSizeChange(newSize) {
      this.$emit("handleSizeChange", newSize);
    },
    handleCurrentChange(newPage) {
      this.$emit("handleCurrentChange", newPage);
    },
  },
};
</script>

<style scoped lang='less'>
</style>
