import service from "@/api/http";

// 获取用户列表
const getUserList = (params: any, url = "/getUserList") => {
  return service.get(url, { params: params });
};

export { getUserList };
