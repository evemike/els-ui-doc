// @ts-nocheck
import { createI18n } from "vue-i18n";
import { getLocal } from "../utils/storage";
import zhLocale from "element-plus/es/locale/lang/zh-cn";
import enLocale from "element-plus/es/locale/lang/en";
import cn from "./lang/zh-cn";
import en from "./lang/en";

//
const i18n = createI18n({
  legacy: false, // 解决使用useI18n报错问题
  locale: getLocal("i18nLocal") || "zh-cn",
  messages: {
    "zh-cn": Object.assign({}, cn, zhLocale),
    en: Object.assign({}, en, enLocale),
  },
});
export default i18n;

export {cn as zhcn,en}
