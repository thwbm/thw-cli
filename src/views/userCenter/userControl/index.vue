// 用户中心-用户管理
<template>
  <div class="userControl">
    <!-- 报表 -->
    <newTable
      ref="newTable"
      :tableHerder="UserList"
      :getTableData="getUserList"
    />

    <!-- 编辑 -->
    <userControlDialog ref="userControlDialog" />
  </div>
</template>

<script lang="ts">
import newTable from "@/components/newTable.vue";
import userControlDialog from "./userControlDialog.vue";
import { defineComponent, ref, reactive, getCurrentInstance } from "vue";
import { getUserList } from "@/api/userCenter/userControl/index";
import { getUserListFun } from "./property";

export default defineComponent({
  name: "userControl",
  components: { newTable, userControlDialog },
  setup() {
    // 当前setup的return = internalInstance.setupState
    const internalInstance: any = getCurrentInstance();

    // 变量：data
    let UserList = getUserListFun(internalInstance);

    // $ref
    const newTable = ref();
    const userControlDialog = ref();

    //  方法：methods
    // 例子
    const aa = () => {
      newTable.value.handleCurrentChange(1);
    };
    // 编辑按钮
    const redact = () => {
      userControlDialog.value.setDialogVisible(true);
    };

    // 抛出
    return {
      UserList,
      newTable,
      userControlDialog,
      getUserList,
      aa,
      redact,
    };
  },
});
</script>

<style lang="scss" scope>
</style>
