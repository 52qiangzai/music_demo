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
    />
    <van-divider />
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
      <van-cell-group :border="false">
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
        <van-cell>搜索 "{{ searchKeyWord }}"</van-cell>
      </van-cell-group>
      <!-- 搜索结果列表 -->
      <van-cell-group :border="false">
        <van-cell>搜索 "{{ searchKeyWord }}"</van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { reqSearchHotKeyWord } from "@/api/Search";
export default {
  name: "Search",
  data() {
    return {
      searchKeyWord: "",
      isShow: true,
      hotsList: [],
      locSearchTemp: [],
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
    // clearSearchKeyWord() {
    //   console.log(1);
    //   this.searchKeyWord = "";
    // },
    // inputDemo() {
    //   console.log(11);
    // },
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
    // 搜索确定函数
    onSearch() {
      const data = {
        first: this.searchKeyWord,
      };
      this.locSearchTemp.unshift(data);
      localStorage.setItem(
        "loc_search_list",
        JSON.stringify(this.locSearchTemp)
      );
    },
    // 删除本地搜索热词
    deleteLocSearchKeyWordHandler(target) {
      this.locSearchTemp = this.locSearchTemp.filter(
        (item) => item.first !== target.first
      );
      localStorage.setItem("loc_search_list", this.locSearchTemp);
    },
    // 热搜词处理函数
    hotsKeyWordSearchHandler(e) {
      if (e.target.className.includes("van-tag")) {
        this.searchKeyWord = e.target.innerText;
        this.onSearch()
      }
    },
    // 获取热搜关键词
    async getSearchHotList() {
      let res = await reqSearchHotKeyWord();
      if (res.code === 200) {
        this.hotsList = res.result.hots;
      }
    },
    // 获取搜索歌词历史
    getLocSearchList() {},
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
</style>