// 通用模态框组件
<template>
  <el-dialog
    v-model="dialogObj"
    :width="width"
    :fullscreen="fullscreen"
    :modal="modal"
    :lock-scroll="lockScroll"
    :custom-class="customClass"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :before-close="beforeClose"
    :center="center"
    :destroy-on-close="destroyOnClose"
    @open="open"
    @close="close"
  >
    <template #title>
      <span class="el-dialog__title">
        <slot name="title"></slot>
      </span>
    </template>
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <slot name="footer"></slot>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive } from "vue";

export default defineComponent({
  name: "newDialog",
  props: {
    /**
     * dialogVisible 是否显示 Dialog
     * width 宽度
     * fullscreen	是否为全屏
     * modal 是否需要遮罩层
     * lock-scroll	是否在 Dialog 出现时将 body 滚动锁定
     * custom-class	自定义类名
     * close-on-click-modal	是否可以通过点击 modal 关闭 Dialog
     * close-on-press-escape	是否可以通过按下 ESC 关闭 Dialog
     * show-close	是否显示关闭按钮
     * center	是否对头部和底部采用居中布局
     * destroy-on-close	关闭时销毁 Dialog 中的元素
     */
    dialogVisible: Boolean,
    width: {
      type: String,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    center: {
      type: Boolean,
      default: false,
    },
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:dialogVisible"],
  setup(props, context) {
    // 变量：data
    // 是否显示
    const dialogObj = ref();

    // 方法：methods
    // 修改 Dialog 显隐状态
    const setDialogVisible = (val: boolean) => {
      context.emit("update:dialogVisible", val);
    };
    // 打开的回调
    const open = () => {
      console.log("open :>> ", "打开的回调");
    };
    // before-close	关闭前的回调，会暂停 Dialog 的关闭
    const beforeClose = () => {
      console.log("beforeClose :>> ", "关闭之前，关闭按钮的回调");
      setDialogVisible(false);
    };
    // 关闭的回调
    const close = () => {
      console.log("close :>> ", "关闭的回调");
    };

    // 监听：watch
    watch(
      () => props.dialogVisible,
      () => {
        dialogObj.value = props.dialogVisible;
      },
      { immediate: true, deep: true }
    );

    // 抛出
    return { dialogObj, setDialogVisible, open, beforeClose, close };
  },
});
</script>

<style lang="scss" scoped>
</style>
