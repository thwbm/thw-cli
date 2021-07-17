import service from "@/api/http";

// 注册
const register = (params: any, url = "/register") => {
  return service.post(url, params);
};

// 登录
const login = (params: any, url = "/login") => {
  return service.post(url, params);
};

// 用户是否登录
const getLogin = (url = "/getLogin") => {
  return service.get(url);
};

// 退出登录
const logout = (url = "/logout") => {
  return service.post(url);
};

// 获取用户信息
const getUser = (url = "/getUser") => {
  return service.get(url);
};

export { register, login, getLogin, logout, getUser };
