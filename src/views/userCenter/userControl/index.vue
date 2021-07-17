// 用户中心-用户管理
<template>
  <div class="userControl">
    <!-- 报表 -->
    <newTable
      ref="newTable"
      :tableHerder="UserList"
      :getTableData="getUserList"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance } from "vue";
import { getUserList } from "@/api/userCenter/userControl/index";
import newTable from "@/components/newTable.vue";
import { getUserListFun } from "./property";

export default defineComponent({
  name: "login",
  components: { newTable },
  setup() {
    // 当前setup的return = internalInstance.setupState
    const internalInstance: any = getCurrentInstance();

    // data
    let UserList = getUserListFun(internalInstance);

    // $ref
    const newTable = ref();

    //  方法：methods
    const aa = () => {
      newTable.value.handleCurrentChange(1);
    };

    // 抛出
    return { UserList, newTable, getUserList, aa };
  },
});
</script>

<style lang="scss" scope>
</style>
