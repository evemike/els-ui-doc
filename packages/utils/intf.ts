/* 类型定义规则
 * 最小限度的使用 any 类型
 * 禁止使用 枚举 ，枚举类型编译为 js 之后会产生冗余代码 ，枚举本身会被编译成 map 类型,可以使用 联合类型 替换枚举
 // TypeScript
enum Test {
    enum1 = 2,
    enum2,
    enum3
}
const test:Test = Test.enum2; // 3

// 编译为javscript
var Test;
(function (Test) {
    Test[Test["enum1"] = 2] = "enum1";
    Test[Test["enum2"] = 3] = "enum2";
    Test[Test["enum3"] = 4] = "enum3";
})(Test || (Test = {}));
var test = Test.enum2; // 3
*/
import {Ref,ComputedRef,} from "vue"
// 公共普通的对象类型
export interface KeyValue<T> {
  [key: string]: T;
}
// 公共方向 类型
export type Direction = "top" | "right" | "bottom" | "left";

// 公共位置 类型
export type Site = "top" | "right" | "bottom" | "left";

// 开关对象
export type Switch<T extends Record<any, any>> =
  | boolean
  | (T & { enabled: boolean });
export type SwitchObj<T extends Record<any, any>> =
  | { enabled: boolean }
  | ({ enabled: boolean } & T);


export type TOA<T> = T | T[];
export type TOR<T> = T | Ref<T>;
export type TORA<T> = TOR<TOA<T>>
