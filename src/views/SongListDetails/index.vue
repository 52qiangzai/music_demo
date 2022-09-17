<template>
  <div>
    <van-nav-bar :border="false">
      <template #left>
        <van-icon
          name="arrow-left"
          size="20"
          @click="$router.back()"
          class="left-incon"
        />
      </template>
    </van-nav-bar>
    <p class="title">歌单详情页</p>
    <van-cell-group :border="false">
      <SongItemPlusVue
        v-for="(item, index) in songsList"
        :key="index"
        :item="item"
      />
    </van-cell-group>
    <!--添加更多 -->
    <div class="btn" v-show="songsList.length">
      <van-button
        type="primary"
        loading-type="spinner"
        text="加载更多"
        @click="getAllMusicByListId"
      ></van-button>
    </div>
  </div>
</template>

<script>
import { reqMusicListDetailById } from "@/api/Music";
import SongItemPlusVue from "@/components/SongItemPlus.vue";
export default {
  name: "",
  components: { SongItemPlusVue },
  data() {
    return {
      detailsId: this.$route.query.id,
      songsList: [],
      offset: 0,
    };
  },
  mounted() {
    this.getAllMusicByListId();
  },
  methods: {
    // 根据歌单列表获取歌单音乐
    async getAllMusicByListId() {
      let res = await reqMusicListDetailById(this.detailsId, 10, this.offset);
      if (res.code === 200) {
        this.songsList.push(...res.songs);
      }
      this.offset += 1;
    },
  },
};
</script>
<style  scoped>
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
.btn {
  margin: 10px;
  margin-bottom: 80px;
  text-align: center;
}
</style>