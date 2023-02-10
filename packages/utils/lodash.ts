// lodash 打包优化方案，如果项目中使用了 lodash ，统一在这里引入 使用 "cherry pick"
import get from "lodash/get";
import set from "lodash/set";
import has from "lodash/has";
import unset from "lodash/unset";
//
import camelCase from "lodash/camelCase";
import kebabCase from "lodash/kebabCase";
import upperFirst from "lodash/upperFirst";
//
import toPlainObject from "lodash/toPlainObject";
import merge from "lodash/merge";
import clone from "lodash/clone";
import cloneDeep from "lodash/cloneDeep";
import assign from "lodash/assign";
import assignWith from "lodash/assignWith";
import omit from "lodash/omit"
import difference from "lodash/difference"
import fromPairs from "lodash/fromPairs"
//
import isFunction from "lodash/isFunction";
import isArray from "lodash/isArray";
import isObject from "lodash/isObject";
import isPlainObject from "lodash/isPlainObject";
import isBoolean from "lodash/isBoolean";
import isDate from "lodash/isDate";
import isNumber from "lodash/isNumber";
import isMap from "lodash/isMap";
//
import sum from "lodash/sum";
import toString from "lodash/toString";
import uniq from "lodash/uniq";
import uniqueId from "lodash/uniqueId";
//
export {
  get,
  set,
  has,
  unset,
  //
  camelCase,
  kebabCase,
  upperFirst,
  //
  toPlainObject,
  merge,
  clone,
  cloneDeep,
  assign,
  assignWith,
  omit,
  difference,
  fromPairs,
  //
  isFunction,
  isArray,
  isObject,
  isPlainObject,
  isBoolean,
  isDate,
  isNumber,
  isMap,
  //
  sum,
  toString,
  uniq,
  uniqueId,
};
