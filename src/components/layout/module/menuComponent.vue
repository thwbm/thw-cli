<template>
  <el-menu
    :default-active="routePath"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    unique-opened
    router
    :collapse-transition="false"
  >
    <menuItem :routes="routes" />
  </el-menu>
</template>

<script lang="ts">
import menuItem from "./menuItem.vue";
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "menuComponent",
  components: { menuItem },
  setup() {
    // router
    const route = useRoute();
    const router = useRouter();

    // 变量：data
    // 路由集合
    const { routes } = reactive(router.options);
    // 当前路由
    const routePath = ref();

    // VUEX：store
    const store = useStore();
    const isCollapse = computed(() => store.getters["setting/isCollapse"]);

    // 监听：watch
    watch(
      route,
      (val: any) => {
        routePath.value = val.meta.path;
      },
      { immediate: true, deep: true }
    );

    // 抛出
    return { routes, routePath, isCollapse };
  },
});
</script>
