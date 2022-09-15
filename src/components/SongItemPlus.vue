<template>
  <!-- 封装首页播放组件 -->
  <!-- 组件对应更全的搜索接口 -->
  <van-cell center :item="item" @click="routerToPlay(item)">
    <template #title>
      {{ item.name }}
    </template>
    <template #right-icon>
      <van-icon name="play-circle-o" size="0.6rem" />
    </template>

    <template #label>
      <van-tag plain type="danger" v-show="item.sq">SQ</van-tag>
      {{ item.ar[0].name }} - {{ item.al.name }}
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
    routerToPlay(item) {
      const { id, name } = item;
      const picUrl = item.al.picUrl;
      const author = `${item.ar[0].name}  - ${item.al.name}`;
      this.$router.push({
        name: "play",
        query: {
          id,
        },
        params: {
          picUrl,
          name,
          author,
        },
      });
    },
  },
};
</script>

<style scoped>
/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>