<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent, getCurrentInstance, computed } from "vue";
import { ElConfigProvider } from "element-plus";

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    // 全局 this
    const internalInstance = getCurrentInstance();
    const _this = internalInstance.appContext.config.globalProperties;

    // 变量：data
    const locale = computed(() => {
      return _this.$i18n.global.messages[_this.$i18n.global.locale].el;
    });

    return {
      locale,
    };
  },
});
</script>
