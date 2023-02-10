import { unref } from "vue";
export const has = Object.prototype.hasOwnProperty;

export const getType = (o: any): string => {
  const t: string = Object.prototype.toString.call(o);
  const res = /^\[object (.*)\]$/.exec(t);
  return res === null ? "null" : res[1].toLowerCase();
};
// 判断元素标签是否是 html 元素
const HTML_TAGS = ["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","menu","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"];
export const isHtmlTag = (tag: string): boolean => HTML_TAGS.includes(tag);

// 执行字符串表达式 返回表达式结果
const ExtKeys = ["this"];
export const doEval = (s = "", obj: any = {}, isGetRefValue = false): any => {
  try {
    const keys = Object.keys(obj).filter((k) => !ExtKeys.includes(k));
    const vals = keys.map((k) => (isGetRefValue ? unref(obj[k]) : obj[k]));
    const str = "return " + s;
    return new Function(...keys, str)(...vals);
  } catch (e) {
    console.error(e);
  }
  return undefined;
};

// 获取 vue3 中 ref 对象的值
export const getRefValue = (obj: any): any => {
  if (typeof obj === "object" && obj && obj.__v_isRef === true) {
    return obj.value;
  }
  return obj;
};
// 解析 token
export const parseToken = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replaceAll("-", "+").replaceAll("_", "/");
  const obj = JSON.parse(window.atob(base64));
  return obj;
};

export const isAdmin = (userInfo: { scopes: string[] }) => {
  return userInfo.scopes[0] == "SYS_ADMIN";
};

// 获取public静态资源
export  const getAssetsFile = (url: string) => {
  return new URL(`../../public/image/${url}`, import.meta.url).href
}
