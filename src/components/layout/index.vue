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
      </el-header>
      <el-scrollbar id="content-main">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-scrollbar>
    </el-container>
    <el-backtop target="#content-main .el-scrollbar__wrap"></el-backtop>
  </el-container>
</template>

<script lang="ts">
import menuComponent from "./module/menuComponent.vue";
import headerCompoent from "./module/headerCompoent.vue";
import { defineComponent, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  components: { menuComponent, headerCompoent },
  setup() {
    // VUEX：store
    const store = useStore();
    const isCollapse = computed(() => store.getters["setting/isCollapse"]);

    // 生命周期
    // onMounted(() => {
    //   window.onresize = (val: any) => {
    //     console.log("object :>> ", val, 1);
    //   };
    // });
    return { isCollapse };
  },
  mounted() {
    this.$i18n.locale = "zh-cn";
    // console.log(
    //   "object :>> ",
    //   this.$i18n.locale,
    //   this.$t("aside.general.title")
    // );
  },
});
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>
