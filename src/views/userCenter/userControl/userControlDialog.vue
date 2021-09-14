// 编辑模态框
<template>
  <new-dialog v-model:dialogVisible="dialogVisible" :width="'600px'">
    <template v-slot:title>编辑</template>

    <template v-slot:default>
      <el-form
        :model="ruleForm"
        :rules="rules"
        status-icon
        ref="refForm"
        label-width="80px"
        class="form"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="ruleForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="ruleForm.idcard"></el-input>
        </el-form-item>
      </el-form>
    </template>

    <template v-slot:footer>
      <el-button @click="setDialogVisible(false)">取 消</el-button>
      <el-button type="primary" @click="submitForm"> 提 交 </el-button>
    </template>
  </new-dialog>
</template>

<script lang="ts">
import newDialog from "@/components/newDialog.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "userControlDialog",
  components: { newDialog },
  setup() {
    // 变量：data
    let dialogVisible = ref(false);
    const ruleForm = ref({
      phone: "",
      email: "",
      username: "",
      name: "",
      sex: "",
      idcard: "",
    });
    const rules = {};

    // $ref
    const refForm = ref();

    //  方法：methods
    // 修改 Dialog 显隐状态
    const setDialogVisible = (val: boolean) => {
      dialogVisible.value = val;
    };
    // 提交
    const submitForm = () => {
      console.log("object :>> ", ruleForm.value);
    };

    // 抛出
    return {
      dialogVisible,
      ruleForm,
      rules,
      refForm,
      setDialogVisible,
      submitForm,
    };
  },
});
</script>
