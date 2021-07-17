<template>
  <el-menu
    :default-active="routePath"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    unique-opened
    router
  >
    <menuItem :routes="routes" />
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import menuItem from "./menuItem.vue";

export default defineComponent({
  name: "menuComponent",
  components: { menuItem },
  setup() {
    // 路由集合
    const { routes } = useRouter().options;
    // 当前路由
    const routePath = useRoute().meta.path;
    // 菜单展开收起，默认展开
    const isCollapse = ref(false);

    return { routes, routePath, isCollapse };
  },
});
</script>
