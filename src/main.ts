import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// element-plus 按需加载
import { useElementPlus } from "./elementPlus";
import "./styles/element-variables.scss";

// 配置国际化
import { i18n, t } from "@/i18n";

// 适配rem
import "@/lib-flexible/flexible.js";

const app = createApp(App);
app.config.globalProperties.$t = t; // 全局配置 this.$
useElementPlus(app);
app.use(i18n);
app.use(router);
app.use(store);
app.mount("#app");
