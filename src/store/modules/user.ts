// 用户信息
import { getLogin, getUser } from "@/api/login/index";
import { decrypt } from "@/utils/crypto";
import _this from "@/main";
import { size } from "lodash-es";

const state = {
  /**
   * login 是否在线
   * user 用户信息
   */
  login: "",
  user: {},
};

const mutations = {
  set_login: (state: any, login: any) => {
    state.login = login;
  },
  set_user: (state: any, user: any) => {
    state.user = user;
  },
};

const actions = {
  getLogin({ commit }: any) {
    return new Promise((resolve) => {
      getLogin().then((res: any) => {
        commit("set_login", res.data || false);
        resolve(res.data || false);
      });
    });
  },
  getUser({ commit }: any, updated: false) {
    // 请求用户信息==》判断是否（存在缓存时）更新缓存数据：updated=fales不更新
    // resolve reject
    return new Promise((resolve) => {
      if (size(_this.$localStorage.get("user")) && !updated) {
        const user = _this.$localStorage.get("user");
        user.phone = decrypt(user.phone);
        commit("set_user", user);
        resolve(user);
      } else {
        getUser().then(({ data }: any) => {
          _this.$localStorage.set("user", data);
          data.phone = decrypt(data.phone);
          commit("set_user", data);
          resolve(data);
        });
      }
    });
  },
};

const getters = {
  login: (state: any) => state.login,
  user: (state: any) => state.user,
};

export default {
  namespaced: true, // 用于解决不同模块的命名冲突问题
  state,
  mutations,
  actions,
  getters,
};
