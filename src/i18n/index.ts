import { createI18n } from "vue-i18n";
import enLocale from "element-plus/lib/locale/lang/en";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";

// 自定义配置
import en from "@/i18n/en";
import zhCn from "@/i18n/zh-cn";

const messages = {
  [enLocale.name]: {
    el: enLocale,
    ...en,
  },
  [zhLocale.name]: {
    el: zhLocale,
    ...zhCn,
  },
};

const i18n = createI18n({
  locale: zhLocale.name,
  fallbackLocale: enLocale.name,
  messages,
});

const t = i18n.global.t;

export { i18n, t };

// _this.$i18n.global.locale = "zh-cn";
