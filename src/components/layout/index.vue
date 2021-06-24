<template>
  <el-container id="layout">
    <el-aside id="aside">
      <menuComponent />
    </el-aside>
    <el-container>
      <el-header> header </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import menuComponent from "./module/menuComponent.vue";
import elementResizeDetectorMaker from "element-resize-detector";
export default defineComponent({
  components: { menuComponent },
  setup() {
    return {};
  },
  mounted() {
    this.$i18n.locale = "zh-cn";
    console.log(
      "object :>> ",
      this.$i18n.locale,
      this.$t("aside.general.title")
    );
    // 监听历史菜单可视区域宽度
    let erd = elementResizeDetectorMaker();
    erd.listenTo(document.getElementById("aside"), (el: any) => {
      console.log("el :>> ", el.offsetWidth);
    });
  },
});
</script>

<style lang="scss" scope>
@import "module/index.scss";

#aside {
  width: 300px !important;
}
</style>
