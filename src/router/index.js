import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Layout from "@/views/Layout";
import Home from "@/views/Home";
import Search from "@/views/Search";
import Play from "@/views/Play";
import Comment from "@/views/Comment";
import SongListDetails from "@/views/SongListDetails";
const routes = [
  {
    path: "/",
    redirect: "/layout",
  },
  {
    path: "/play",
    component: Play,
    name: "play",
    meta: {
      title: "播放音乐",
    },
  },
  {
    path: "/details",
    component: SongListDetails,
    name: "details",
    meta: {
      title: "歌单详情",
    },
  },
  {
    path: "/comment",
    component: Comment,
    name: "comment",
    meta: {
      title: "音乐评论",
    },
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
