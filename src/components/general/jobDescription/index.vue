<template>
  <div class="block">
    <span class="demonstration">默认不区分颜色</span>
    <el-rate v-model="count"></el-rate>
    {{ a }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
export default defineComponent({
  name: "HelloWorld",
  setup() {
    const count = ref(0);

    const a = computed(() => {
      return count.value * 3;
    });
    return { count, a };
  },
});
</script>

<style lang="scss">
.block {
  color: $color;
}
</style>
