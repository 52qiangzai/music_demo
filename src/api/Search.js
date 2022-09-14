import request from "@/utils/request";

// 搜索热词
export const reqSearchHotKeyWord = () => {
  return request.get("/search/hot");
};
