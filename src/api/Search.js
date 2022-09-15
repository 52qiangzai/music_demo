import request from "@/utils/request";

// 搜索热词
export const reqSearchHotKeyWord = () => {
  return request.get("/search/hot");
};

// 搜索建议
export const reqSearchSuggestKeyWord = (keywords, type = "mobile") => {
  return request.get("/search/suggest", {
    params: {
      keywords,
      type,
    },
  });
};

// 搜索音乐
export const reqSearchMusic = (keywords, offset = 0, limit = 30, type = 1) => {
  return request.get("/search", {
    params: {
      keywords,
      offset,
      limit,
      type,
    },
  });
};
