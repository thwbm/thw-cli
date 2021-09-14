# 主要文件的作用

> .vscode vscode：的配置 setting（主要针对项目）

> node_modules：项目依赖

> public：静态文件
>
> > index.html：项目主页面

> src：项目主代码
>
> > sada

> .browserslistrc：定义最低浏览器版本

> .editorconfig：格式化（配合 vscode 插件：EditorConfig for VS Code）

> .eslintrc.js：eslint 代码校验

> .gitignore：git 提交过滤文件

> babel.config.js：（babel）以编程方式创建配置，编译 node_modules（将 ES6 代码转为 ES5 代码）

> package-lock.json：

> package.json：

> postcss.config.js：配合 lib-flexible 作 rem 适配

> tsconfig.json：TypeScript 项目的根目录（指定待编译文件和定义编译选项）

> vue.config.js：webpack 配置，项目编译

# 代码格式

<template></template>

<script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "",
    props:{ },
    components:{ },
    setup() {
      // 全局 this
      const internalInstance: any = getCurrentInstance();
      const _this = internalInstance.appContext.config.globalProperties;

      // 当前setup的return = internalInstance.setupState
      const internalInstance: any = getCurrentInstance();

      // router
      const router = useRouter();

      // 表单校验规则
      // 变量：data

      // $ref

      // VUEX：store

      // 方法：methods

      // 监听：watch

      // 生命周期

      // 抛出
      return { };
    },
  });
</script>

<style lang="scss" scoped></style>
