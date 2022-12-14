<template>
  <div>
    <van-search
      v-model="searchKeyWord"
      shape="round"
      placeholder="搜索歌曲、歌手、专辑"
      :clearable="true"
      :autofocus="true"
      clear-trigger="always"
      :maxlength="50"
      @search="onSearch"
      @input="onInput"
      @clear="onClear"
    />
    <van-divider />
    <div v-show="isShowMusicContainer">
      <!-- 热门搜索 -->
      <div v-show="isShow">
        <p class="title">热门搜索</p>

        <div class="hotKeyWord" @click="hotsKeyWordSearchHandler">
          <van-tag
            type="primary"
            text-color="#333"
            plain
            v-for="(item, index) in hotsList"
            :key="index"
          >
            {{ item.first }}
          </van-tag>
        </div>

        <!-- 搜索历史 -->
        <van-cell-group :border="false" @click="musicHistoryListHandler">
          <van-cell center v-for="(item, index) in locSearchTemp" :key="index">
            <template #title> {{ item.first }} </template>
            <template #right-icon>
              <van-icon
                name="cross"
                @click="deleteLocSearchKeyWordHandler(item)"
              />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div v-show="!isShow">
        <van-cell-group :border="false">
          <van-cell @click="pointSearch">搜索 "{{ searchKeyWord }}"</van-cell>
        </van-cell-group>
        <!-- 搜索结果列表 -->
        <van-loading size="30px" vertical color="#0094ff" v-show="isLoading"
          >加载中...</van-loading
        >
        <van-cell-group :border="false" @click="searchResultListHandler">
          <van-cell
            icon="search"
            v-for="(item, index) in searchSuggestList"
            :key="index"
          >
            <template #title>
              {{ item.keyword }}
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <!-- 音乐渲染列表 -->
    <SongItemPlus
      v-for="(item, index) in songsList"
      :key="index"
      :item="item"
    />
    <!--添加更多 -->
    <div class="btn" v-show="!isShowMusicContainer && songsList.length">
      <van-button
        type="primary"
        loading-type="spinner"
        text="加载更多"
        @click="loadingMoreSearchMusic"
      ></van-button>
    </div>
  </div>
</template>

<script>
// import SongInnerItem from "@/components/SongInnerItem.vue";
import SongItemPlus from "@/components/SongItemPlus.vue";

import {
  reqSearchHotKeyWord,
  reqSearchSuggestKeyWord,
  reqSearchCloudMusic,
} from "@/api/Search";
export default {
  name: "Search",
  components: {
    SongItemPlus,
  },
  data() {
    return {
      searchKeyWord: "",
      isShow: true,
      hotsList: [],
      isLoading: true,
      locSearchTemp: [],
      searchSuggestList: [],
      isShowMusicContainer: true,
      offset: 0,
      songsList: [],
    };
  },
  mounted() {
    this.getSearchHotList();
    // 进去直接判断是否由搜索历史
    this.updateLocSearchList();
  },
  watch: {
    searchKeyWord: {
      handler: function (newVal, oldVal) {
        !newVal ? (this.isShow = true) : (this.isShow = false);
      },
      deep: true,
    },
  },
  methods: {
    // 搜索建议列表
    async onInput() {
      this.isLoading = true;
      this.searchSuggestList = [];
      if (this.searchKeyWord === null || this.searchKeyWord.trim() === "") {
        this.searchSuggestList = [];
        this.isLoading = true;
        return;
      }
      let res = await reqSearchSuggestKeyWord(this.searchKeyWord);
      if (res.code === 200) {
        this.searchSuggestList = res.result.allMatch || [];
        this.isLoading = false;
      }
    },
    // 更新本地搜索历史
    updateLocSearchList() {
      if (localStorage.getItem("loc_search_list")) {
        this.locSearchTemp = JSON.parse(
          localStorage.getItem("loc_search_list")
        );
      } else {
        localStorage.setItem(
          "loc_search_list",
          JSON.stringify(this.locSearchTemp)
        );
      }
    },
    // 点击搜索函数
    pointSearch() {
      this.onSearch();
      this.isShowMusicContainer = false;
    },
    // 搜索确定函数
    onSearch() {
      if (this.searchKeyWord === "" || this.searchKeyWord.trim() === "") {
        this.$toast.fail("搜索内容不能为空");
        return;
      }
      // 判断本地是否有搜索过的关键词
      let isHave = this.locSearchTemp.some(
        (item) => item.first === this.searchKeyWord
      );
      if (isHave) {
        // 有删除再加
        this.locSearchTemp = this.locSearchTemp.filter(
          (item) => item.first !== this.searchKeyWord
        );
      }
      this.locSearchTemp.unshift({
        first: this.searchKeyWord,
      });
      localStorage.setItem(
        "loc_search_list",
        JSON.stringify(this.locSearchTemp)
      );
      this.getSearchMusicList();
    },
    // 清空搜索框函数
    onClear() {
      this.isShowMusicContainer = true;
      this.songsList = [];
    },
    // 搜索列表结果点击处理函数
    searchResultListHandler(e) {
      this.searchKeyWord = e.target.innerText;
      this.onSearch();
      this.isShowMusicContainer = false;
    },
    // 删除本地搜索热词
    deleteLocSearchKeyWordHandler(target) {
      this.locSearchTemp = this.locSearchTemp.filter(
        (item) => item.first !== target.first
      );
      localStorage.setItem(
        "loc_search_list",
        JSON.stringify(this.locSearchTemp)
      );
    },
    // 本地搜索历史点击处理
    musicHistoryListHandler(e) {
      if (e.target.innerText) {
        this.searchKeyWord = e.target.innerText;
        this.onSearch();
        this.isShowMusicContainer = false;
      }
    },
    // 热搜词处理函数
    hotsKeyWordSearchHandler(e) {
      if (e.target.className.includes("van-tag")) {
        this.searchKeyWord = e.target.innerText;
        this.onSearch();
        this.isShowMusicContainer = false;
      }
    },
    // 获取热搜关键词
    async getSearchHotList() {
      let res = await reqSearchHotKeyWord();
      if (res.code === 200) {
        this.hotsList = res.result.hots;
      }
    },
    // 获取搜索结果
    async getSearchMusicList() {
      let res = await reqSearchCloudMusic(this.searchKeyWord, this.offset);
      if (res.code === 200 && res.result.songCount > 0) {
        this.songsList = res.result.songs || [];
      }
    },
    // 加载更多搜索音乐
    async loadingMoreSearchMusic() {
      this.offset++;
      let res = await reqSearchCloudMusic(this.searchKeyWord, this.offset);
      if (res.code === 200 && res.result.songCount > 0) {
        this.songsList.push(...res.result.songs);
      }
    },
  },
};
</script>
<style scoped>
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  color: #333;
  font-size: 10px;
}
.van-tag {
  padding: 5px 8px;
  border-radius: 10px;
  border-color: #d3d4da;
  margin-right: 8px;
  margin-bottom: 8px;
}
.hotKeyWord {
  margin: 0 0 0.24rem 0.24rem;
}
.btn {
  margin: 10px;
  margin-bottom: 80px;
  text-align: center;
}
</style>