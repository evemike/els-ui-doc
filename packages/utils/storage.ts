// localstorage 保存数据
export const saveLocal = (key: string, val: any) => {
  const t = typeof val;
  if (t === "object") {
    localStorage.setItem(key, JSON.stringify(val));
  } else {
    localStorage.setItem(key, val);
  }
};

// 获取 localstorage 保存的数据 type 可以用来对数据做初步类型转换 目前仅支持 json对象转换
export function getLocal(key: string): string | null;
export function getLocal(key: string, isObj: boolean): any;
export function getLocal(key: string, isObj?: boolean) {
  const v = localStorage.getItem(key);
  switch (v) {
    case "null":
      return null;
    case "undefined":
      return null;
    default:
      break;
  }
  let res = v;
  if (isObj && v) {
    res = JSON.parse(v);
  }
  return res;
}
// export const getLocal = <T>(key:string, type:"string" | "object") => {
//   const r = localStorage.getItem(key) || undefined;
//   if (type == 'object' && r) {
//     return JSON.parse(r)
//   }
//   return r;
// }

// 清空 localstorage
export const clearLocal = () => {
  localStorage.clear();
};
