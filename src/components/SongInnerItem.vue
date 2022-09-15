<template>
  <!-- 封装内页播放组件 -->
  <van-cell center :item="item">
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
};
</script>

<style scoped>
/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>