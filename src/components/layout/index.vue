<template>
  <el-container id="layout">
    <el-aside id="aside" :style="`width:${isCollapse ? 65 : 300}px`">
      <el-scrollbar>
        <menuComponent />
      </el-scrollbar>
    </el-aside>
    <el-container id="content">
      <el-header id="content-header">
        <headerCompoent />
        <menuKeepAlive />
      </el-header>
      <el-scrollbar id="content-main">
        <el-main id="el-main">
          <router-view v-slot="{ Component }">
            <keep-alive :include="include" :exclude="exclude">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-scrollbar>
    </el-container>
    <el-backtop target="#content-main .el-scrollbar__wrap"></el-backtop>
  </el-container>
</template>

<script lang="ts">
import menuComponent from "./module/menuComponent.vue";
import headerCompoent from "./module/headerCompoent.vue";
import menuKeepAlive from "./module/menuKeepAlive.vue";
import { defineComponent, ref, reactive, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { menuComponent, headerCompoent, menuKeepAlive },
  setup() {
    // VUEX：store
    const store = useStore();
    const isCollapse = computed(() => store.getters["setting/isCollapse"]);
    const menuKA = computed(() => {
      return store.getters["menuKA/menuKA"].map((item: any) => item.name);
    });

    // 变量：data
    //  keepalive 白名单
    const include = reactive(menuKA);
    // keepalive 黑名单
    const exclude = ref([]);

    // 抛出
    return { isCollapse, include, exclude };
  },
});
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>
