import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission";

// element-plus 按需加载
// import { useElementPlus } from "./elementPlus";
// useElementPlus(app);

import ElementPlus from "element-plus";
import "./styles/element-variables.scss";
const option = { size: "small", zIndex: 3000 };

// 配置国际化
import { i18n, t } from "@/i18n";

// 适配rem
import "@/lib-flexible/flexible.js";

// storage
import StoragePlugin from "vue-web-storage";

// cookie
import jsCookie from "js-cookie";

const app = createApp(App);
// 全局配置 this.$
app.config.globalProperties.$i18n = i18n;
app.config.globalProperties.$t = t;
app.config.globalProperties.$cookie = jsCookie;

app.use(ElementPlus, option);
app.use(i18n);
app.use(router);
app.use(store);
app.use(StoragePlugin, {
  prefix: "thw_", // default `app_`
  drivers: ["session", "local"], // default 'local'
});
app.mount("#app");

// this
export default app.config.globalProperties;
