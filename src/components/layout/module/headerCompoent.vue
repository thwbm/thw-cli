// header
<template>
  <div class="header-compoent">
    <i :class="collapseIcon + ' is-collapse'" @click="setIsCollapse"></i>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="item in matched"
        :to="{ path: item.meta.path || item.path }"
        :key="item.fullPath"
        >{{ $t(item.meta.title) }}</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="right">
      <el-dropdown class="language" trigger="click" @command="handleLanguage">
        <span class="el-dropdown-link">
          {{ language }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in languageList"
              :key="item"
              :command="item"
              >{{ item }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button class="logout" @click="setLogout">退出</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { logout } from "@/api/login/index";

export default defineComponent({
  name: "headerCompoent",
  setup() {
    // 全局 this
    const internalInstance: any = getCurrentInstance();
    const _this = internalInstance.appContext.config.globalProperties;

    // router
    const route = useRoute();

    // 变量：data
    // 侧边栏展开收起按钮icon
    const collapseIcon = ref("el-icon-s-fold");
    // 面包屑
    const matched = ref();
    // 语言切换
    const language = ref(`${_this.$i18n.global.locale}`);
    const languageList = computed(() => _this.$i18n.global.availableLocales);

    // VUEX：store
    const store = useStore();
    const isCollapse = computed(() => store.getters["setting/isCollapse"]);
    const set_isCollapse = (val: any) =>
      store.commit("setting/set_isCollapse", val);

    // 方法：methods
    // 修改侧边栏展开收起
    const setIsCollapse = () => {
      collapseIcon.value = isCollapse.value
        ? "el-icon-s-fold"
        : "el-icon-s-unfold";
      set_isCollapse(!isCollapse.value);
    };
    // 语言切换回调
    const handleLanguage = (val: string) => {
      language.value = val;
      _this.$i18n.global.locale = val;
    };
    // 退出登录
    const setLogout = () => {
      logout();
    };

    // 监听：watch
    watch(
      route,
      (val: any) => {
        matched.value = val.matched;
      },
      { immediate: true, deep: true }
    );

    // 抛出
    return {
      collapseIcon,
      matched,
      language,
      languageList,
      setIsCollapse,
      handleLanguage,
      setLogout,
    };
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
  .right {
    line-height: 60px;
    & > * {
      margin-left: 20px;
    }
  }
}
</style>
