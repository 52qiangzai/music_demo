import request from "@/utils/request";

// 获取首页轮播图数据
// 0: pc
// 1: android
// 2: iphone
// 3: ipad
export const reqBanner = (type = 0) => {
  return request.get("/banner", {
    params: {
      type,
    },
  });
};

// 获取热门歌单，默认30
export const recommendMusic = (limit = 30) => {
  return request.get("/personalized", {
    params: {
      limit,
    },
  });
};

// 最新音乐
export const getNewMusic = () => {
  return request.get("/personalized/newsong");
};
