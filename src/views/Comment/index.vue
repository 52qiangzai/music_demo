<template>
  <div>
    <!-- 头部导航 -->
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
    <!-- 显示评论 -->
    <CommentCard
      v-for="(item, index) in commentsMessage"
      :key="index"
      :messageInfo="item"
    />
    <!--添加更多 -->
    <div class="btn">
      <van-button
        type="primary"
        loading-type="spinner"
        text="加载更多"
        @click="loadingMoreComments"
      ></van-button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CommentCard from "@/components/CommentCard.vue";
import { reqMusicCommentsById } from "@/api/Comment";
export default {
  name: "Comment",
  components: { CommentCard },
  data() {
    return {
      commentsMessageList: [],
      offset: 0,
    };
  },
  mounted() {
    this.getCommentsById();
  },
  computed: {
    commentsMessage: {
      get() {
        return this.commentsMessageList.map((item) => {
          return (item = {
            avatar: item.user.avatarUrl,
            nickName: item.user.nickname,
            comment: item.content,
            commentTime: moment(item.time).format("YYYY年MM月DD hh:mm:ss"),
          });
        });
      },
    },
  },
  methods: {
    async getCommentsById() {
      let res = await reqMusicCommentsById(
        this.$route.query.id,
        20,
        this.offset
      );
      if (res.code === 200 && res.comments) {
        this.commentsMessageList = res.comments;
      }
      console.log(res);
    },
    //
    async loadingMoreComments() {
      this.offset += 1;
      let res = await reqMusicCommentsById(
        this.$route.query.id,
        20,
        this.offset
      );
      if (res.code === 200 && res.comments) {
        this.commentsMessageList.push(...res.comments);
      }
    },
  },
};
</script>
<style scoped>
.btn {
  margin: 10px;
  text-align: center;
}
</style>