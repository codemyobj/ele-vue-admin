import Vue from "vue";
import axios from "axios";

const url = `http://120.53.120.229:8888/api/private/v1/`;

let config = {
  baseURL: url,
  timeout: 5000
};

const request = axios.create(config);

request.interceptors.request.use(req => {
  // 添加请求头时携带token

  return req;
});

request.interceptors.response.use(res => {
  return res;
});

window.request = request;
