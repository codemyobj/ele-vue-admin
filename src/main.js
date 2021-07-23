import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import echarts from "echarts";
import "./plugins/element";

// 导入全局样式表
import "./assets/css/global.css";
//导入字体图标
import "./assets/fonts/iconfont.css";

//导入已配置好的依赖 axios
import "./network/request";

// 导入树形组件
import TreeTable from "vue-table-with-tree-grid";
Vue.component("tree-table", TreeTable);

// 导入富文本编辑器
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.snow.css";
Vue.use(VueQuillEditor);

// 把echarts挂在到Vue原型上，以便在全局访问
Vue.prototype.$echarts = echarts;
import "./assets/lib/theme/chalk";
import "./assets/lib/theme/vintage";
import "./assets/lib/theme/westeros";

import "./filter/getDate";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
