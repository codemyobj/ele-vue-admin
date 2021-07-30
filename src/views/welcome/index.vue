<template>
  <div class="welcome">
    <div id="github">
      <github-corner></github-corner>
    </div>
    <!-- 四个卡片 -->
    <home-cards :card-data="cardData" @changeLine="changeLine" />

    <!-- 折线图 -->
    <el-card id="line">
      <div ref="lineRef" style="height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import GithubCorner from "@/components/common/githubConner";
import HomeCards from "./children/HomeCards.vue";

import { cardData, lineData } from "./wData";
require("@/assets/lib/theme/macarons"); // echarts theme

export default {
  name: "Welcome",
  components: {
    GithubCorner,
    HomeCards,
  },
  data() {
    return {
      // 折线图实例
      chartInstance: null,
      // 折线图数据
      lineData,
      activeLine: 0,
      // 四个card的数据
      cardData,
      // axios实例对象
      axiosInstance: null,
      // 折线图信息
      lineInfo: null,
      // 用于设置鼠标悬停在card上的高亮
      // 高亮的背景色
      // 高亮的字体色
      fontColor: {},
    };
  },
  destroyed() {
    this.chartInstance.dispose();
  },
  async created() {
    this.getCityInfo().then(
      (res) => {
        this.getData(res);
      },
      (err) => {
        this.getData(err);
      }
    );

    this.axiosInstance = axios.create({
      // baseURL: 'http://localhost:8997',
      // 使用服务器地址
      baseURL: "http://120.53.120.229:8997",
    });
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化图表
      this.initChart();
    });
  },
  methods: {
    // 初始化图表的方法
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.lineRef, "macarons");
      let currentData = this.lineData[this.activeLine];
      // 初始化图表的配置项
      const initOption = {
        title: {
          text: currentData.title,
          textStyle: {
            fontSize: "28",
          },
        },
        legend: {
          left: "center",
          top: "5%",
          // data: ['真实访问量', '预估访问量'],
          data: currentData.legendData,
        },
        grid: {
          top: "20%",
          left: "0%",
          right: "2%",
          bottom: "0%",
          // 把x轴和y轴纳入 grid
          containLabel: true,
        },
        // 工具提示
        tooltip: {
          // 当鼠标移入坐标轴的显示提示
          trigger: "axis",
          // 鼠标放上去十字交叉指示器
          axisPointer: {
            type: "cross",
          },
        },
        xAxis: {
          type: "category",
          // data: xDataArr,
          data: currentData.xData,
          // 紧挨边缘
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: currentData.legendData[0],
            smooth: true,
            type: "line",
            animationDuration: 2800,
            data: currentData.realData,
            animationEasing: "quadraticOut",
            markPoint: {
              // 最大最小值的相关配置
              label: {
                show: true,
                formatter: "{c}" + currentData.icon,
              },
              data: [
                {
                  type: "max",
                  name: "最大值",
                },
                {
                  type: "min",
                  name: "最小值",
                },
              ],

              animationDuration: 2800,
              animationEasing: "quadraticOut",
            },
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
          },
          {
            name: currentData.legendData[1],
            smooth: true,
            type: "line",
            animationDuration: 2800,
            data: currentData.guessData,
            animationEasing: "cubicInOut",
            markPoint: {
              // 最大最小值的相关配置
              label: {
                show: true,
                formatter: "{c}" + currentData.icon,
              },
              data: [
                {
                  type: "max",
                  name: "最大值",
                },
                {
                  type: "min",
                  name: "最小值",
                },
              ],
              animationDuration: 2800,
              animationEasing: "quadraticOut",
            },
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2,
                },
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);
      // this.updateChart()
    },
    // 获取用户所在城市信息
    async getCityInfo() {
      //实例化城市查询类
      var citysearch = new AMap.CitySearch();
      //自动获取用户IP，返回当前城市
      return new Promise((resolve, reject) => {
        citysearch.getLocalCity(async function (status, result) {
          if (status === "complete" && result.info === "OK") {
            if (result && result.city) {
              resolve(result.city);
            }
          }
          reject("未知");
        });
      });
    },
    // 把用户城市信息发送给服务器并 获取总访问量和今日访问量
    async getData(city) {
      const { data: res } = await this.axiosInstance.get(
        "/?methods=userInfo&city=" + city
      );
      this.lineInfo = res;
      // this.cardData[0].data = this.lineInfo.totalPv + '次'
      // this.cardData[1].data = this.lineInfo.todayPv + '次'
      this.cardData[0].data = 4018153 + "次";
      this.cardData[1].data = 21524 + "次";
    },
    // 改变图表显示的数据
    changeLine(index) {
      this.activeLine = index;
      this.chartInstance.dispose();
      this.initChart();
    },
  },
};
</script>

<style lang="less" scope>
#github {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
}
.welcome {
  margin-top: 10px;
  padding: 0 10px;
  #line {
    margin-top: 10px;
  }
}
</style>
