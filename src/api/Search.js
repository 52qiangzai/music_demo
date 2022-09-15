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
