<template>
  <div>
    <!-- 评论人卡片组件 -->
    <div class="commentContainer">
      <div class="avatar">
        <van-image
          width="2rem"
          height="2rem"
          fit="cover"
          round
          :src="messageInfo.avatar"
        />
      </div>
      <div class="info">
        <p class="title">{{ messageInfo.nickName }}</p>
        <p class="comment">
          {{ messageInfo.comment }}
        </p>
        <p class="commentTime">{{ messageInfo.commentTime }}</p>
      </div>
    </div>
    <!-- 分割线 -->
    <van-divider dashed></van-divider>
  </div>
</template>

<script>
export default {
  props: {
    messageInfo: Object,
  },
};
</script>
<style scoped>
.commentContainer {
  box-sizing: border-box;
  display: flex;
  margin: 10px;
  align-items: center;
  padding: 5px;
}
.avatar {
  position: relative;
  top: -10px;
}
.info {
  flex: 1;
  margin: 0 0 0 10px;
  font-size: 13px;
}
.title {
  color: #0c73ce;
}
.comment {
  font-size: 0.8em;
  word-break: break-all;
}
.commentTime {
  font-size: 0.5em;
  color: #999999;
}
</style>