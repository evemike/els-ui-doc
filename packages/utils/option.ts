import { isBoolean, isArray, isObject } from "./lodash";

export const getOption = <T, U>(
  d: T | undefined,
  attr: Partial<U> = {},
  config: { bool?: string; data?: string; default?: any[] } = {}
): U => {
  const keys = Object.assign({ bool: "enabled", data: "data" }, config);
  const bool = isBoolean(d) ? d : d == undefined ? false : true;
  const res: any = isObject(d) ? { ...attr, ...d } : { ...attr };
  if (isObject(d)) {
    return res;
  }
  res[keys.bool] = bool;
  if (isArray(d)) {
    res[keys.data] = d;
  } else if (config.default != undefined) {
    res[keys.data] = config.default;
  }
  //
  if (res[keys.data] == undefined || res[keys.data].length == 0) {
    res[keys.bool] = false;
  }
  return res;
};
