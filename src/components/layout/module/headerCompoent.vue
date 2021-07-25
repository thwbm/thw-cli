<template>
  <div class="header-compoent">
    <el-button @click="aa">ss</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "headerCompoent",
  setup() {
    // VUEX：store
    const store = useStore();
    const isCollapse = computed(() => store.getters["setting/isCollapse"]);
    const set_isCollapse = (val: any) =>
      store.commit("setting/set_isCollapse", val);

    // 方法：methods
    const aa = () => {
      set_isCollapse(!isCollapse.value);
    };

    // 抛出
    return { aa };
  },
});
</script>

<style lang="scss" scoped>
</style>
