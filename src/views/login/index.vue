// 登陆注册
<template>
  <div class="login register">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="refForm"
      label-width="80px"
      class="from"
    >
      <el-form-item class="header" prop="radio">
        <el-radio-group v-model="ruleForm.radio">
          <el-radio-button
            v-for="item in radioList"
            :key="item.label"
            :label="item.label"
          >
            {{ item.value }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <div class="content">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.trim="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkpass"
          v-if="ruleForm.radio === 2"
        >
          <el-input
            type="checkpass"
            v-model.trim="ruleForm.checkpass"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item class="footer">
        <el-button type="primary" @click="submitForm">确认</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  computed,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { register, login } from "@/api/login/index";
import { encrypt } from "@/utils/crypto";
import { useStore } from "vuex";

export default defineComponent({
  name: "login",
  setup() {
    // this
    const internalInstance: any = getCurrentInstance();
    let _this = internalInstance.appContext.config.globalProperties;

    // 表单校验规则
    const validateUser = (rule: any, value: string, callback: any) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
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
    const validateCheckPass = (rule: any, value: string, callback: any) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== ruleForm.value.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    // 变量：data
    const refForm = ref();
    const ruleForm = ref({
      radio: 1,
      phone: "",
      password: "",
      checkpass: "",
    });
    const rules = {
      phone: [{ validator: validateUser, trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }],
      checkpass: [{ validator: validateCheckPass, trigger: "blur" }],
    };
    const radioList = [
      { label: 1, value: "登录" },
      { label: 2, value: "注册" },
    ];

    // VUEX：store
    const store = useStore();
    const user = computed(() => store.getters["user/user"]);

    const router = useRouter();

    // 方法：methods
    // 确认
    const submitForm = () => {
      refForm.value.validate((valid: any) => {
        if (valid) {
          const { radio, phone, password } = ruleForm.value;
          const params = {
            phone: encrypt(phone),
            password: encrypt(password, true),
          };
          switch (radio) {
            case 1:
              login(params).then(({ code, msg }: any) => {
                if (code === 201) {
                  store.dispatch("user/getUser"); // 获取用户信息
                  router.push({ name: "general" });
                } else if (code === 200 && msg) {
                  _this
                    .$confirm(msg, "提示", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning",
                    })
                    .then(() => {
                      ruleForm.value.radio = 2;
                      resetForm();
                    });
                }
              });
              break;
            case 2:
              register(params);
              break;
          }
        }
      });
    };
    // 重置
    const resetForm = () => {
      const { radio } = ruleForm.value;
      refForm.value.resetFields();
      ruleForm.value.radio = radio;
    };

    // 抛出
    return {
      refForm,
      ruleForm,
      rules,
      radioList,
      user,
      submitForm,
      resetForm,
    };
  },
});
</script>

<style lang="scss" scope>
.login {
  width: 100%;
  height: 100vh;
  background: $color;
  display: flex;
  align-items: center;
  justify-content: center;
  .from {
    padding: 30px;
    width: 500px;
    height: 300px;
    background: #ffffff80;
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
    text-align: center;
    .el-form-item,
    .content {
      width: 100%;
    }
    .footer {
      margin: 0;
    }
    .header,
    .footer {
      .el-form-item__content {
        margin: 0 !important;
      }
    }
  }
}
</style>
