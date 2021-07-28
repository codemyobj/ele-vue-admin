<template>
  <el-row :gutter="12">
    <el-col :span="6" v-for="(item, index) in cardData" :key="index">
      <el-card
        shadow="always"
        @mouseenter.native="change(item.color, index)"
        @mouseleave.native="currentIndex = null"
        @click.native="changeLine(index)"
      >
        <div class="left" :style="[currentIndex == index ? bgColor : '']">
          <span
            :class="['iconfont', , item.icon]"
            :style="{ color: currentIndex == index ? '#FFF' : item.color }"
          />
        </div>
        <div class="right">
          <div class="title">{{ item.title }}</div>
          <div class="data">{{ item.data }}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "HomeCards",
  components: {},
  props: {
    cardData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      // 用于设置鼠标悬停在card上的高亮
      currentIndex: null,
      //高亮的背景色
      bgColor: {}
    };
  },
  methods: {
    change(color, index) {
      this.currentIndex = index;
      this.bgColor = {
        backgroundColor: color
      };
    },
    changeLine(index) {
      this.$emit('changeLine',index)
    }
  }
};
</script>

<style scoped lang="less">
.el-row {
  /deep/ .el-card__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .iconfont {
      font-size: 48px;
    }
    div.left {
      padding: 10px;
      border-radius: 5px;
    }
    div.right {
      height: 68px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      font-weight: 700;
    }
  }
  .el-card__body:hover {
    cursor: pointer;
  }
}
</style>
