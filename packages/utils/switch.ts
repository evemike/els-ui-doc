// 开关对象
export type Switch<T extends Record<any, any>> =
  | boolean
  | (T & { enabled: boolean });
export type SwitchObj<T extends Record<any, any>> =
  | { enabled: boolean }
  | ({ enabled: boolean } & T);

// 开关对象解析
export const getSwitchAttr = <T extends Record<string, any>>(
  attr: Switch<T>,
  value?: T,
  trans?: (attr: Switch<T>, value?: T) => SwitchObj<T>
): SwitchObj<T> => {
  if (trans) {
    return trans(attr, value);
  }
  if (typeof attr == "boolean") {
    return value ? { ...value, enabled: attr } : { enabled: attr };
  }
  return value ? { ...value, ...attr } : attr;
};
