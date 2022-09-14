import Vue from "vue";
import App from "./App.vue";

import "@/mobile/flexible";
import "@/styles/reset.css";

import router from "@/router";
// search输入框清楚失效问题
import "@vant/touch-emulator";
Vue.config.productionTip = false;

import {
  NavBar,
  Tabbar,
  TabbarItem,
  Col,
  Row,
  Image as VanImage,
  Lazyload,
  Cell,
  CellGroup,
  Icon,
  Tag,
  Search,
  Divider,
} from "vant";

Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Lazyload);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Tag);
Vue.use(Search);
Vue.use(Divider);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
