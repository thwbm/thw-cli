<template>
  <template v-for="item in routes" :key="item.path">
    <el-submenu v-if="item.children" :index="item.meta.path || item.name">
      <template #title>
        <i :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <menu-item :routes="item.children" />
    </el-submenu>
    <el-menu-item v-else-if="!item.meta.isNoMenu" :index="item.meta.path">
      <template #title>
        <i :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "menuItem",
  props: {
    routes: { type: Array },
  },
  setup(props) {
    return {};
  },
});
</script>
