// 自定义数字显示函数
export const formatNumber_Qz = (num) => {
  // 判断长度
  const strLen = String(num).length;
  if (strLen <= 5) return num;
  if (strLen > 5 && strLen <= 8) {
    let a = String(num).split("").reverse();
    a.splice(4, 0, ".");
    let b = a
      .reverse()
      .slice(0, a.indexOf(".") + 2)
      .join("");
    return `${b} 万`;
  }
  if (strLen > 8 && strLen <= 14) {
    let a = String(num).split("").reverse();
    a.splice(8, 0, ".");
    let b = a
      .reverse()
      .slice(0, a.indexOf(".") + 2)
      .join("");
    return `${b} 亿`;
  }
};
