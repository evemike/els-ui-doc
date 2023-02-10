import { isDate, isNumber } from "./lodash";
/* 日期和时间的工具方法 */
// 把各种日期格式转换为日期格式
export const getDate = (d: Date | string | number | undefined) => {
  if (d == undefined) {
    return new Date();
  }
  if (isDate(d)) {
    return d;
  }
  if (isNumber(d)) {
    return new Date(d);
  }
  if (/^\d+$/.test(d)) {
    return new Date(Number(d));
  }
  //
  try {
    return new Date(d);
  } catch (e) {
    console.error("getDate ===> ", e);
  }
  return new Date();
};
// 日期格式化
export const dateFormate = (
  fmt: string,
  d?: Date | string | number | undefined
) => {
  const date = getDate(d);
  const o: { [key: string]: number } = {
    "Y+": date.getFullYear(),
    "y+": date.getFullYear(),
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  for (const k in o) {
    const ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1
          ? String(o[k])
          : String(o[k]).padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
};

export const registerFormat = () => {
  (Date.prototype as any).format = function (fmt: string) {
    return dateFormate(fmt, this);
  };
};
