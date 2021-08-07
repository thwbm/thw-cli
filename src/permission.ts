import router from "./router/index";
import store from "./store/index";
import { size } from "lodash-es";

router.beforeEach(async (to, from, next) => {
  // try {
  // } catch (err) {}

  if (store.getters["user/login"] === "") {
    await store.dispatch("user/getLogin");
  }

  if (store.getters["user/login"]) {
    if (to.path === "/login") next({ path: "/" });

    if (!size(store.getters["user/user"])) {
      await store.dispatch("user/getUser");
    }

    next();
  } else {
    // next("/login"); // 否则全部重定向到登录页
    next();
  }
});