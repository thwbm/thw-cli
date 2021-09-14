<template>
  <el-dialog title="提示" v-model="dialogObj" width="30%">
    <span>这是一段信息</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handle(false)">取 消</el-button>
        <el-button type="primary" @click="handle(false)">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  emits: ["update:isOpen"],
  setup(props, context) {
    const dialogObj = ref();
    watch(
      () => props.isOpen,
      () => {
        dialogObj.value = props.isOpen;
      },
      { immediate: true, deep: true }
    );

    function handle(val: any) {
      context.emit("update:isOpen", val);
    }

    return { dialogObj, handle };
  },
});
</script>
