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

// storage
import StoragePlugin from "vue-web-storage";

// cookie
import jsCookie from "js-cookie";

const app = createApp(App);
// 全局配置 this.$
app.config.globalProperties.$t = t;
app.config.globalProperties.$cookie = jsCookie;

useElementPlus(app);
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
