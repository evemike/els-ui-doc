import {camelCase} from "./lodash"

export const getCSSStyle = (elem: Element) => {
  return window.getComputedStyle(elem);
};

export const getElemStyleValue = (elem: Element, key: string[]|string = []) => {
  const so = getCSSStyle(elem);
  const res: Record<string, string> = {};
  const keys = new Array<string>().concat(key)
  for (const k of keys) {
    const val = so.getPropertyValue(k);
    const key = camelCase(k);
    res[key] = val;
  }
  return res;
};