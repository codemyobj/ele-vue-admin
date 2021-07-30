import axios from "axios";

// 导入Nprogress对应的js和css
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const url = `http://www.ysqorz.top:8888/api/private/v1/`;

let config = {
  baseURL: url,
  timeout: 50000
};

const request = axios.create(config);


request.interceptors.request.use(req => {
  // 添加进度条
  NProgress.start();

  // 添加请求头时携带token
  req.headers.Authorization = window.sessionStorage.getItem("token");
  return req;
});

request.interceptors.response.use(res => {
  //隐藏进度条
  NProgress.done();
  return res;
});

window.request = request;
