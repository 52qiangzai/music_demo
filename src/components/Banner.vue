<template>
  <div>
    <van-swipe
      class="my-swipe"
      :autoplay="1500"
      indicator-color="white"
      style="height: 200px"
    >
      <van-swipe-item v-for="(image, index) in imgList" :key="image.bannerId">
        <van-image
          width="100%"
          height="200"
          fit="cover"
          lazy-load
          :src="image.pic"
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    imgList: Array,
  },
};
</script>
<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>