<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar :title="title" />
    <!-- 中间路由 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar v-model="active" @change="routerChange">
      <van-tabbar-item icon="home-o" name="home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" name="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      active: "home",
      title: "首页",
    };
  },
  watch: {
    $route: {
      handler: function (newVal, oldVal) {
        this.title = newVal?.meta.title;
      },
      deep: true,
    },
  },
  methods: {
    routerChange() {
      this.$router.push({ name: this.active });
    },
  },
};
</script>