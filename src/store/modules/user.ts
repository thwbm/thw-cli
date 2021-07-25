// 用户信息
import { getUser } from "@/api/login/index";
import { decrypt } from "@/utils/crypto";
import _this from "@/main";
import { size } from "lodash-es";

const state = {
  user: {},
};

const mutations = {
  set_user: (state: any, user: any) => {
    state.user = user;
  },
};

const actions = {
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
  user: (state: any) => state.user,
};

export default {
  namespaced: true, // 用于解决不同模块的命名冲突问题
  state,
  mutations,
  actions,
  getters,
};
