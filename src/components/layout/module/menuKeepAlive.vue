<template>
  <div class="menu-keep-alive">
    <el-button class="left" icon="el-icon-caret-left"></el-button>
    <el-button-group class="right">
      <el-button icon="el-icon-caret-right"></el-button>
      <el-button icon="el-icon-refresh-right"></el-button>
      <el-dropdown>
        <el-button icon="el-icon-arrow-down"></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-button-group>
    <div class="tag-content">
      <div class="tag-content-ul">
        <el-tag
          class="pointer"
          v-for="(tag, index) in menuKA"
          :key="tag.name"
          :closable="!!index"
          :type="tag.checked ? '' : 'info'"
          @click="onChecked(tag)"
          @close="onClose(tag)"
        >
          {{ $t ? $t(tag.title) : "-" }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "menuKeepAlive",
  setup() {
    // router
    const route = useRoute();
    const router = useRouter();

    // VUEX：store
    const store = useStore();
    const menuKA = computed(() => store.getters["menuKA/menuKA"]);
    const set_menuKA = (val: any) => store.commit("menuKA/set_menuKA", val);
    const set_menuKA_del = (val: any) =>
      store.commit("menuKA/set_menuKA_del", val);

    // 方法：methods
    // 点击tag方法
    const onChecked = (val: any) => {
      router.push({ name: val.name });
    };
    // 点击删除tag方法
    const onClose = (val: any) => {
      set_menuKA_del(val);
    };

    // 监听：watch
    watch(
      route,
      (val: any) => {
        const keepAliveObj = {
          name: val.name,
          title: val.meta.title,
          path: val.meta.path,
          checked: true,
        };
        set_menuKA(keepAliveObj);
      },
      { immediate: true, deep: true }
    );

    // 生命周期
    onMounted(() => {
      console.log(
        document
          .getElementsByClassName("tag-content-ul")[0]
          .getBoundingClientRect(),
        document
          .getElementsByClassName("tag-content")[0]
          .getBoundingClientRect()
      );
    });

    // 抛出
    return { menuKA, onChecked, onClose };
  },
});
</script>

<style lang="scss" scoped>
.menu-keep-alive {
  .tag-content {
    overflow: hidden;
    .tag-content-ul {
      display: table;
      white-space: nowrap;
      .el-tag {
        margin: 4px 2px;
      }
    }
  }
  .el-button-group > .el-dropdown > .el-button {
    border-left-color: inherit;
  }
}
</style>
