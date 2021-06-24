<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="from"
    >
      <el-form-item label="账号" prop="user">
        <el-input v-model.trim="ruleForm.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model.trim="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "login",
  setup() {
    // 表单校验规则
    const validateUser = (rule: any, value: string, callback: any) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    const validatePass = (rule: any, value: string, callback: any) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validateCode = (rule: any, value: string, callback: any) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };

    // 变量：data
    const form = ref();
    const ruleForm = ref({
      user: "",
      password: "",
      code: "",
    });
    const rules = {
      user: [{ validator: validateUser, trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }],
    };

    // 方法：methods
    const submitForm = (val: any) => {
      form.value.validate((valid: any) => {
        console.log("ruleForm :>> ", ruleForm);
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log("object :>> ", val);
    };
    const resetForm = (val: any) => {
      console.log("object :>> ", val);
    };

    return { form, ruleForm, rules, submitForm, resetForm };
  },
});
</script>

<style lang="scss" scope>
.login {
  width: 100%;
  height: 100vh;
  background: $color;
  .from {
    background: #ffffff;
    padding: 40px;
    width: 600px;
    height: 400px;
    margin: auto;
  }
}
</style>
