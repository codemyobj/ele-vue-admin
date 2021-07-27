<template>
  <div>
    <span
      :class="['scrrenfull-svg', isFullscreen ? 'icon-shrink' : 'icon-enlarge']"
      @click="isEnlarge"
    ></span>
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "fullScreen",
  components: {},
  props: {},
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    isEnlarge() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "your browser can not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
    }
  }
};
</script>

<style scoped lang="less">
.scrrenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  margin-left: 15px;
}
</style>
