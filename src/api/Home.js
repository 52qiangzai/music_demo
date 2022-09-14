import request from "@/utils/request";

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
