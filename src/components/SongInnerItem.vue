<template>
  <!-- 封装内页播放组件 -->
  <!-- 组件适合普通搜索接口reqSearchMusic -->
  <van-cell center @click="routerToPlay(item)">
    <template #title>
      {{ item.name }}
    </template>
    <template #right-icon>
      <van-icon name="play-circle-o" size="0.6rem" />
    </template>

    <template #label>
      <van-tag plain type="danger" v-show="item.fee !== 0">SQ</van-tag>
      {{ item.artists[0].name }} - {{ item.album.name }}
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
      const picUrl = item.album.artist.img1v1Url;
      const author = `${item.artists[0].name}  - ${item.album.name}`;
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