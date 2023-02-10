import { unref, isRef, Ref } from "vue";

import {
  ElRadio,
  ElInputNumber,
  ElCheckboxGroup,
  ElCheckbox,
  ElTabPane,
  ElTabs,
  ElSelect,
} from "element-plus";

import {
  isArray,
  fromPairs,
  uniq,
} from "../../utils/lodash";

export const CRON_ATTR_NAMES = <const>[
  "",
  "",
  "to",
  "interval",
  "next",
  "last",
  "float",
  "",
  "",
  "the",
];
export const CRON_REGS = <const>[
  /^\?$/,
  /^\*$/,
  /^(\d+)-(\d+)$/,
  /^(\d+)\/(\d+)$/,
  /^(\d+)W$/,
  /^(\d+)L$/,
  /^(\d+)#(\d+)$/,
  /^\s+$/, // 暂时未使用的
  /^L$/,
  /^(,?\d+)+$/,
];
export const CRON_TEMP = <const>[
  "?",
  "*",
  ([v1, v2]: any) => `${v1}-${v2}`,
  ([v1, v2]: any) => `${v1}/${v2}`,
  ([v1]: any) => `${v1}W`,
  ([v1]: any) => `${v1}L`,
  ([v1, v2]: any) => `${v1}#${v2}`,
  "", // 暂时未使用的
  "L",
  (vs: any[]) => vs.sort((a, b) => a - b).join(","),
];
const ZH_WEEK = <const>["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

const getRadio = (label: string, cls: string | any[]) => ({
  tag: ElRadio,
  prop: "type",
  label: Number(label),
  cls,
  class: "_radio-item " + (Number(label) === 9 ? "_flex-start" : ""),
});

const DER = { tag: ElRadio, prop: "type" };

const DES = { tag: ElSelect, elFormItem: false };
const DEIN = {
  tag: ElInputNumber,
  controlsPosition: "right",
  elFormItem: false,
};
const getINS = (
  prop: string,
  config: {
    attrs: any[];
    prefix?: string;
    suffix?: string;
    connect?: string | string[];
  }
) => {
  const { attrs, prefix = "", suffix = "", connect = [] } = config;
  const res: any[] = [prefix];
  const cstr = new Array<string>().concat(connect);
  let ct = 0;
  for (const d of attrs) {
    const p = `${prop}.${ct}`;
    const c = cstr[ct] || "";
    if (!isArray(d)) {
      res.push({ ...DEIN, prop: p, value: (d as any)?.min, ...d });
    } else {
      res.push({ ...DES, prop: p, value: d[0].value, cls: d });
    }
    c && res.push(c);
    ct++;
  }
  res.push(suffix);
  return res;
};

const DECBG = { tag: ElCheckboxGroup, class: "_item _checkbox-group" };
const DECB = { tag: ElCheckbox };
const getCBG = (
  prop: string,
  config: {
    min?: number;
    max?: number;
    getLabel?: (n: number) => string;
  } = {}
) => {
  const { min = 0, max = 59, getLabel } = config;
  const cls: any[] = [];
  for (let i = min; i <= max; i++) {
    const s = getLabel ? getLabel(i) : `${i}`;
    cls.push({ ...DECB, label: i, cls: s });
  }
  return [{ ...DECBG, prop, cls }];
};

const getLineElem = (label: string, config: any, name: string) => {
  const n = CRON_ATTR_NAMES[Number(label)];
  let cls: any = "";
  if (!n) {
    cls = config;
  } else if (n === "the") {
    cls = getCBG(`^${name}.${n}`, config);
  } else {
    cls = getINS(`^${name}.${n}`, config);
  }
  //
  const c = `_radio-item _label-${label}`;
  // console.log("=====", label, cls, config);
  return { ...DER, class: c, label, cls };
};

interface CronItem extends Record<string, any> {
  type: number;
}

export const toData = (v: string, i: number) => {
  const res:any = { type: String(i) };
  const n = CRON_ATTR_NAMES[i];
  const reg = CRON_REGS[i];
  const [all, ...vals] =
    i == 9 ? [""].concat(uniq(v.split(","))) : reg.exec(v) || [];
  res[n] = vals.map((t) => Number(t));
  return res;
};

export const toText = (v: CronItem) => {
  const i = Number(v.type);
  const r = CRON_REGS[i];
  const n = CRON_ATTR_NAMES[i];
  const t = CRON_TEMP[i];
  const b = typeof t === "string";
  const vals = v[n] || [];
  //
  const res = b ? t : t(vals);
  if (!b && !r.test(res)) {
    // console.error("=== cron data check error ===", i, res, n, t, r, v);
    return t;
  }
  return res;
};

type CronData = [string, any, any][]; // 第一个值时 type 的值 ，第二个时表单参数，第三个表单默认值
const SECOND: CronData = [
  ["1", "每秒 允许的通配符[, - * /]", ""],
  [
    "2",
    {
      attrs: [
        { min: 0, max: 59 },
        { min: 0, max: 60 },
      ],
      prefix: "周期从",
      connect: "秒 到",
      suffix: "秒",
    },
    [0, 0],
  ],
  [
    "3",
    {
      attrs: [{ min: 0, max: 59 }, { min: 0 }],
      prefix: "周期从",
      connect: "秒开始，每隔",
      suffix: "秒执行一次",
    },
    [0, 0],
  ],
  ["9", {}, [0]],
];

const MINUTE: CronData = [
  ["1", "每分 允许的通配符[, - * /]", ""],
  [
    "2",
    {
      attrs: [
        { min: 0, max: 59 },
        { min: 0, max: 60 },
      ],
      prefix: "周期从",
      connect: "分 到",
      suffix: "分钟",
    },
    [0, 0],
  ],
  [
    "3",
    {
      attrs: [{ min: 0, max: 59 }, { min: 0 }],
      prefix: "周期从",
      connect: "分钟开始，每隔",
      suffix: "分钟执行一次",
    },
    [0, 0],
  ],
  ["9", {}, [0]],
];

const HOUR: CronData = [
  ["1", "每小时 允许的通配符[, - * /]", ""],
  [
    "2",
    {
      attrs: [
        { min: 0, max: 59 },
        { min: 0, max: 60 },
      ],
      prefix: "周期从",
      connect: "时 到",
      suffix: "小时",
    },
    [0, 0],
  ],
  [
    "3",
    {
      attrs: [{ min: 0, max: 59 }, { min: 0 }],
      prefix: "周期从",
      connect: "时开始，每隔",
      suffix: "小时执行一次",
    },
    [0, 0],
  ],
  ["9", { max: 23 }, [0]],
];

const DAY: CronData = [
  ["0", "不指定", ""],
  ["1", "每日 允许的通配符[, - * /]", ""],
  [
    "2",
    {
      attrs: [
        { min: 1, max: 31 },
        { min: 1, max: 31 },
      ],
      prefix: "周期从",
      connect: "日 到",
      suffix: "日",
    },
    [1, 1],
  ],
  [
    "3",
    {
      attrs: [{ min: 1, max: 31 }, { min: 1 }],
      prefix: "周期从",
      connect: "日开始，每隔",
      suffix: "日执行一次",
    },
    [1, 1],
  ],
  [
    "4",
    {
      attrs: [{ min: 1, max: 31 }],
      prefix: "每月",
      suffix: "日最近的那个工作日",
    },
    [1],
  ],
  ["8", "本月最后一天", ""],
  ["9", { min: 1, max: 31 }, [1]],
];

const MONTH: CronData = [
  ["0", "不指定", ""],
  ["1", "每月 允许的通配符[, - * /]", ""],
  [
    "2",
    {
      attrs: [
        { min: 1, max: 12 },
        { min: 1, max: 12 },
      ],
      prefix: "周期从",
      connect: "月 到",
      suffix: "月",
    },
    [1, 1],
  ],
  [
    "3",
    {
      attrs: [{ min: 1, max: 12 }, { min: 1 }],
      prefix: "周期从",
      connect: "月开始，每隔",
      suffix: "个月执行一次",
    },
    [1, 1],
  ],
  ["9", { min: 1, max: 12 }, [1]],
];

const WEEKOPTIONS = [
  { value: 1, label: "一" },
  { value: 2, label: "二" },
  { value: 3, label: "三" },
  { value: 4, label: "四" },
  { value: 5, label: "五" },
  { value: 6, label: "六" },
  { value: 7, label: "日" },
];
const WEEK: CronData = [
  ["0", "不指定", ""],
  ["1", "每周 允许的通配符[, - * /]", ""],
  [
    "2",
    {
      attrs: [WEEKOPTIONS, WEEKOPTIONS],
      prefix: "周期从星期",
      connect: " 到星期",
    },
    [1, 1],
  ],
  [
    "6",
    {
      attrs: [{ min: 1, max: 4 }, WEEKOPTIONS],
      prefix: "每月第",
      connect: "周的星期",
    },
    [1, 1],
  ],
  [
    "5",
    {
      attrs: [WEEKOPTIONS],
      prefix: "本月的最后一周的星期",
    },
    [1],
  ],
  [
    "9",
    { min: 1, max: 7, getLabel: (n: number) => WEEKOPTIONS[n - 1].label },
    [1],
  ],
];

const YEAR: CronData = [
  ["0", "不指定", ""],
  ["1", "每年 允许的通配符[, - * /]", ""],
  [
    "2",
    {
      attrs: [
        { min: 1970, max: 3000, value: new Date().getFullYear() },
        { min: 1970, max: 3000, value: new Date().getFullYear() },
      ],
    },
    [1970, new Date().getFullYear()],
  ],
];

export const check = (v: string, regs: number[]) => {
  let index = -1;
  for (let i = 0, l = regs.length; i < l; i++) {
    const ri = regs[i];
    const reg = CRON_REGS[ri];
    if (reg.test(v)) {
      index = ri;
      break;
    }
  }
  return index;
};

export const LAYOUT = <const>[
  ["second", SECOND],
  ["minute", MINUTE],
  ["hour", HOUR],
  ["day", DAY],
  ["month", MONTH],
  ["week", WEEK],
  ["year", YEAR],
];

export const defaultLayout = LAYOUT.map((d) => d[0]);
export type TypeLayout = typeof LAYOUT[number][0];
export const layoutData = fromPairs<CronData>(LAYOUT as any);
// 表达式校验
export const validator = (v: string) => {
  const vals = v.trim().split(" ");
  if (vals.length !== 7) {
    return (
      "ERROR_LENGTH :" + `${vals.length} : ${v} - [${defaultLayout.join(" ")}]`
    );
  }
  for (let i = 0, l = vals.length; i < l; i++) {
    const val = vals[i];
    const [n, d] = LAYOUT[i];
    const regs = d.map((c) => Number(c[0]));
    if (check(val, regs) == -1) {
      return "ERROR_VALUE :" + `${v} :: ${n}`;
    }
  }
  return "";
};
const LABEL: { [key in TypeLayout]: string } = {
  second: "秒",
  minute: "分",
  hour: "时",
  day: "日",
  month: "月",
  week: "周",
  year: "年",
};
const DETP = { tag: ElTabPane };
const DETAB = { tag: ElTabs, type: "border-card" };
export const createElem = (layout: TypeLayout[] = defaultLayout) => {
  const data = layout.map((n) => layoutData[n]);
  const elems = [];
  for (let i = 0, l = layout.length; i < l; i++) {
    const d = data[i];
    const n = layout[i];
    const l = LABEL[n];
    const cls = d.map(([label, config]) => getLineElem(label, config, n));
    const tab = { ...DETP, label: l, prop: n, cls };
    elems.push(tab);
  }
  //
  return { ...DETAB, cls: elems };
};

// 生成 cron 表达式 当 data 值有误时，修复错误并设置默认值 默认值 配置在 CronData 中。
const defaultText: { [key in TypeLayout]: string } = {
  second: "0",
  minute: "0",
  hour: "0",
  day: "1",
  month: "1",
  week: "?",
  year: "*",
};
const resetData = (name: string, key: string, val: any, data?: any) => {
  if (data && isRef<any>(data)) {
    data.value[name][key] = val;
  }
};
export const createCronText = (
  data: any,
  reset = resetData,
  dVal = defaultText
) => {
  const d = unref(data);
  const res = [];
  for (const n of defaultLayout) {
    let r = dVal[n];
    if (d[n] != undefined && d[n].type) {
      const t = d[n].type;
      const v1 = toText(d[n]);
      const cd = layoutData[n];
      const k = CRON_ATTR_NAMES[Number(t)];
      const dd = cd.filter((e) => e[0] == t)[0];
      const val = dd[2];
      const v2 = typeof v1 === "function" ? v1(val) : false;
      // console.log("==createCronText==", t, v1, v2, val, data[n]);
      v2 && reset(n, k, val, data);
      r = v2 || (v1 as string);
    }
    res.push(r);
  }
  return res.join(" ");
};

// 表达式生成 data 数据 字符串必须时经过校验之后的正确的字符串
export const createCronData = (v: string) => {
  const vals = v.split(" ");
  const res:any = {};
  for (let i = 0, l = defaultLayout.length; i < l; i++) {
    const n = defaultLayout[i];
    const val = vals[i];
    const cd = layoutData[n];
    const rs = cd.map((d) => Number(d[0]));
    const ins = check(val, rs);
    res[n] = toData(val, ins);
  }
  return res;
};
