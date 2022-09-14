import Vue from "vue";
import App from "./App.vue";

import "@/mobile/flexible";
import "@/styles/reset.css";

import router from "@/router";

Vue.config.productionTip = false;

import { NavBar, Tabbar, TabbarItem, Col, Row } from "vant";

Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Col);
Vue.use(Row);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
