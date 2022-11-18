<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in imgList" :key="image.bannerId">
        <van-image
          width="100%"
          height="100%"
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
.my-swipe,
.van-swipe-item {
  color: #fff;
  font-size: 20px;
  /* line-height: 150px; */
  max-height: 370px !important;
  text-align: center;
  background-color: #39a9ed;
  aspect-ratio: 18/7;
}
</style>
