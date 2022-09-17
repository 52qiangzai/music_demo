<template>
  <!-- 封装首页播放组件 -->
  <van-cell center :item="item" @click="routerToPlay(item)">
    <template #title>
      {{ item.name }}
    </template>
    <template #right-icon>
      <van-icon name="play-circle-o" size="0.6rem" />
    </template>

    <template #label>
      <van-tag plain type="danger" v-show="item.song.sqMusic">SQ</van-tag>
      {{ item.song.artists[0].name }} - {{ item.song.album.name }}
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
      const { id } = item;
      this.$router.push({
        name: "play",
        query: {
          id,
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