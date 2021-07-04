import axios from "axios";
import qs from "qs";
import _this from "@/main";

// 初始配置
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // 通过环境变量设置默认的接口 url 前缀
  // timeout: 1000, // 请求超时时间，超时中断
  // withCredentials: true, // 跨域请求是否需要使用凭证
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    // "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
  },
});

service.defaults.withCredentials = true; //允许跨域携带cookie信息

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // 根据请求头以及请求方式判断是否需要进行序列化
    if (
      config.headers["Content-Type"] === "application/x-www-form-urlencoded" &&
      config.method.toLocaleLowerCase() === "post"
    ) {
      config.data = qs.stringify(config.data);
    }

    //可以设置要发送的token

    return config;
  },
  (error: any) => {
    // 抛出错误
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res: any) => {
    if (res.status === 200) {
      const { code, msg } = res.data;
      if (code === 400) {
        _this.$localStorage.clear();
        if (msg) {
          _this.$notify.info({
            title: "消息",
            message: msg,
          });
        }
      }

      if (code === 201) {
        _this.$notify.success({
          title: "成功",
          message: msg,
        });
      } else if (code === 202) {
        _this.$notify.warning({
          title: "警告",
          message: msg,
        });
      } else if (code === 203) {
        _this.$notify.info({
          title: "消息",
          message: msg,
        });
      } else if (code === 204) {
        _this.$notify.error({
          title: "错误",
          message: msg,
        });
      } else if (code === 205) {
        _this.$message.success(msg);
      } else if (code === 206) {
        _this.$message.warning(msg);
      } else if (code === 207) {
        _this.$message.info(msg);
      } else if (code === 208) {
        _this.$message.error(msg);
      }
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res);
    }
  },
  (error: any) => {
    // 抛出错误
    return Promise.reject(error);
  }
);

// 抛出
export default service;
