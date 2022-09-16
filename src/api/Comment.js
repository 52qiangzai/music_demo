import request from "@/utils/request";

// 根据歌曲id获取评论
export const reqMusicCommentsById = (id, limit = 20, offset = 0) => {
  return request.get("/comment/music", {
    params: {
      id,
      limit,
      offset,
    },
  });
};
