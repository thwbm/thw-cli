// header
<template>
  <div class="header-compoent">
    <i :class="collapseIcon + ' is-collapse'" @click="setIsCollapse"></i>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="item in matched"
        :to="{ path: item.meta.path || item.path }"
        :key="item.fullPath"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>

    <el-button class="logout" @click="setLogout">退出</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { logout } from "@/api/login/index";

export default defineComponent({
  name: "headerCompoent",
  setup() {
    // 变量：data
    // 侧边栏展开收起按钮icon
    const collapseIcon = ref("el-icon-s-fold");
    // 面包屑
    const matched = ref();

    // VUEX：store
    const store = useStore();
    const isCollapse = computed(() => store.getters["setting/isCollapse"]);
    const set_isCollapse = (val: any) =>
      store.commit("setting/set_isCollapse", val);

    // 监听：watch
    watch(
      useRoute(),
      (val: any) => {
        matched.value = val.matched;
      },
      { immediate: true, deep: true }
    );

    // 方法：methods
    // 修改侧边栏展开收起
    const setIsCollapse = () => {
      collapseIcon.value = isCollapse.value
        ? "el-icon-s-fold"
        : "el-icon-s-unfold";
      set_isCollapse(!isCollapse.value);
    };
    // 退出登录
    const setLogout = () => {
      logout();
    };

    // 抛出
    return { collapseIcon, matched, setIsCollapse, setLogout };
  },
});
</script>

<style lang="scss" scoped>
.header-compoent {
  height: 60px;
  .is-collapse {
    font-size: 30px;
    line-height: 60px;
  }
  .el-breadcrumb {
    display: inline-block;
    vertical-align: top;
    line-height: 60px;
    margin-left: 20px;
  }
  .logout {
    float: right;
    margin-top: 14px;
  }
}
</style>
