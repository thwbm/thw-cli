<template>
  <div class="block">
    <el-button type="primary" @click="open">主要按钮</el-button>
    <index-Dialog v-model:isOpen="isOpen" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import indexDialog from "./indexDialog.vue";
export default defineComponent({
  name: "HelloWorld",
  components: { indexDialog },
  setup() {
    const isOpen = ref(false);

    function open() {
      isOpen.value = true;
    }

    return { isOpen, open };
  },
});
</script>

<style lang="scss">
.block {
  color: $color;
}
</style>
