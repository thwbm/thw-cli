<template>
  <div class="menu-keep-alive">
    <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "menuKeepAlive",
  setup() {
    // 变量：data
    const tags = ref([
      { name: "标签一", type: "" },
      { name: "标签二", type: "success" },
      { name: "标签三", type: "info" },
      { name: "标签四", type: "warning" },
      { name: "标签五", type: "danger" },
    ]);

    // 抛出
    return { tags };
  },
});
</script>

<style scoped>
</style>
