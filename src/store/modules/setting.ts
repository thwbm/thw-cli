// 全局可设置项
import _this from "@/main";

const state = {
  /**
   * isCollapse 侧边菜单展开收起，默认展开
   */
  isCollapse: false,
};

const mutations = {
  set_isCollapse: (state: any, isCollapse: any) => {
    state.isCollapse = isCollapse;
  },
};

const actions = {};

const getters = {
  isCollapse: (state: any) => state.isCollapse,
};

export default {
  namespaced: true, // 用于解决不同模块的命名冲突问题
  state,
  mutations,
  actions,
  getters,
};
