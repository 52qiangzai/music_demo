<template>
  <div>
    <!-- 推荐歌单 -->
    <p class="title">推荐歌单</p>
    <van-row gutter="10">
      <van-col
        span="8"
        v-for="(item, index) in recommendMusicList"
        :key="item.id"
      >
        <van-image
          width="100%"
          height="100"
          lazy-load
          fit="cover"
          :src="item.picUrl"
        />
        <p class="song_name">{{ item.name }}</p>
      </van-col>
    </van-row>
    <!-- 最新音乐 -->
    <p class="title">最新音乐</p>
    <van-cell-group :border="false">
      <van-cell center v-for="(item, index) in newMusicList" :key="item.id">
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
    </van-cell-group>
  </div>
</template>

<script>
import { recommendMusic, getNewMusic } from "@/api/Home";
export default {
  name: "Home",
  data() {
    return {
      recommendMusicList: [],
      newMusicList: [],
    };
  },
  mounted() {
    this.getRecommendMusic();

    this.getNewMusicList();
  },
  methods: {
    // 首页推荐歌单
    async getRecommendMusic() {
      let res = await recommendMusic(6);
      if (res.code === 200) {
        this.recommendMusicList = res.result;
      }
    },
    // 首页推荐音乐
    async getNewMusicList() {
      let res = await getNewMusic();
      // console.log(result);
      if (res.code === 200) {
        this.newMusicList = res.result;
      }
    },
  },
};
</script>
<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>