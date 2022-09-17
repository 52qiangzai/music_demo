import request from "@/utils/request";

// 检查音乐是否可用
export const reqInspectMusic = (id) => {
  return request.get("/check/music", {
    params: {
      id,
    },
  });
};

// 根据id获取音乐详细信息
export const reqMusicAllInfo = (id) => {
  return request.get("/song/detail", {
    params: {
      ids: id,
    },
  });
};

// 获取音乐播放url相关信息
export const reqMusicInfo = (id) => {
  return request.get("/song/url", {
    params: {
      id,
    },
  });
};

// 获取歌词相关信息
export const reqMusicLyric = (id) => {
  return request.get("/lyric", {
    params: {
      id,
    },
  });
};
