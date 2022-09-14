import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Layout from "@/views/Layout";
import Home from "@/views/Home";
import Search from "@/views/Search";
const routes = [
  {
    path: "/",
    redirect: "/layout",
  },
  {
    path: "/layout",
    component: Layout,
    redirect: "/layout/home",
    children: [
      {
        name: "home",
        path: "home",
        component: Home,
        meta: {
          title: "首页",
        },
      },
      {
        name: "search",
        path: "search",
        component: Search,
        meta: {
          title: "搜索",
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
