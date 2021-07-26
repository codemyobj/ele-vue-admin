// 定义过滤器
import Vue from "vue";

Vue.filter("dataFormat", function(originVal) {
  const dt = new Date(originVal * 1000);

  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + "").padStart(2, "0");

  const hh = (dt.getHours() + "").padStart(2, "0");
  const mm = (dt.getMinutes() + "").padStart(2, "0");
  const ss = (dt.getMilliseconds() + "").padStart(2, "0");

  const DateStr = `${y} - ${m} - ${d} ${hh}:${mm}:${ss}`;

  return DateStr;
});
