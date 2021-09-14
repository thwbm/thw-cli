// keep-alive历史菜单
import _this from "@/main";
import { size } from "lodash-es";

const state = {
  /**
   * menuKA 历史菜单
   */
  menuKA: [],
};

const mutations = {
  set_menuKA: (state: any, keepAliveObj: any) => {
    const arr = state.menuKA;
    const index = arr.findIndex((item: any) => item.name === keepAliveObj.name);
    arr.forEach((item: any) => (item.checked = false));
    if (index !== -1) {
      keepAliveObj.checked = true;
      arr[index] = keepAliveObj;
    } else {
      arr.push(keepAliveObj);
    }
    state.menuKA = arr;
  },
  set_menuKA_del: (state: any, keepAliveObj: any) => {
    const arr = state.menuKA;
    const index = arr.findIndex((item: any) => item.name === keepAliveObj.name);
    if (index < size(arr) - 1) {
      arr[index + 1].checked = true;
      _this.$router.push({ name: arr[index + 1].name });
    } else {
      arr[index - 1].checked = true;
      _this.$router.push({ name: arr[index - 1].name });
    }
    state.menuKA = arr.filter((item: any) => item.name !== keepAliveObj.name);
  },
};

const actions = {};

const getters = {
  menuKA: (state: any) => state.menuKA,
};

export default {
  namespaced: true, // 用于解决不同模块的命名冲突问题
  state,
  mutations,
  actions,
  getters,
};
