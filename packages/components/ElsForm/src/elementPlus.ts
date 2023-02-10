import {
  unref,
  h,
  computed,
  Component,
  ref,
  useAttrs,
  onUnmounted,
  toRef,
} from "vue";
import { ElsFormUIPlugin,ElsFormUIPluginConfig } from "./inter";
import {
  Elem,
  ElsElemProps,
  RenderFunction,
  ElemFunctionTag,
  defaultRender,
  SetupFunction,
} from "../../ElsElem";
//
import {
  ElForm,
  ElRadio,
  ElCheckbox,
  ElInput,
  ElFormItem,
  ElOption,
} from "element-plus";
//
import { getTempValue } from "../../../utils/regexp";
import {
  camelCase,
  has,
  isBoolean,
  isArray,
  get,
  set,
  merge,
  unset,
  isObject,
  isFunction,
} from "../../../utils/lodash";
import { TOR } from "../../../utils/intf";
//
export interface DefaultElemExtends {
  prop?: TOR<string | ((props: ElsElemProps) => string)>;
  elFormItem?: TOR<string[] | Record<string, any>>;
  isFormElem?: TOR<boolean>;
}

// tag 替换默认 tag 并 且当父元素为特定元素时，替换子元素默认 tag
export const tag: ElemFunctionTag = ({ parent }) => {
  if (parent && has(EL_FORM_DEFAULT_CHILD, camelCase(parent.tagname))) {
    return EL_FORM_DEFAULT_CHILD[camelCase(parent.tagname)];
  }
  return ElInput;
};

export const render: RenderFunction = (config) => {
  const props = config.props;
  const setupRes = config.setupRes;
  // console.log("=====[ RENDER ]======>", props);
  // 判断是否是表单元素
  if (setupRes.isFormElem) {
    // console.log("==========[ FORM ELEM ]========")
    const prop = setupRes.formProp as string;
    unset(props, "value");
    // 判断是否需要自动添加 elFormItem
    if (setupRes.isNeedElFormItem) {
      // console.log("==========[ EL FORM ITEM ]========")
      // 生成 elFormItem 元素的 props
      const elFormItemProps: Record<string, any> = {
        ...buildElFormItemProps(props),
        prop,
      };
      // 生成 rules
      elFormItemProps.rules = buildRules(elFormItemProps);
      // 
      return h(ElFormItem, elFormItemProps, {
        default: () => defaultRender(config),
      });
    }
  }

  // 返回默认渲染函数
  return defaultRender(config);
};

export const setup: SetupFunction = (props, params) => {
  const elem = props.elem;
  const {formProps,emitChange} = props.context as {formProps:ElsFormUIPluginConfig["formProps"],emitChange:ElsFormUIPluginConfig["emitChange"]};
  const parent = props.parent;
  const tagname = camelCase(params.tagname);
  const parentname = camelCase(parent?.tagname);
  const setupRes = parent?.setupRes;
  const tp = unref(elem.prop);
  const ep:string = typeof tp === "function" ? tp(props) : tp;
  const fp: string | any[] = unref(setupRes?.formProp) || [];
  const p: string[] = /^\^/.test(ep) ? [ep.replace("^","")] :new Array<string>().concat(fp, ep || []);
  const formProp = p.join(".");
  //
  const res: ReturnType<SetupFunction> = { isFormElem: false };

  //
  if (p.length > 0) {
    res.formProp = formProp;
  }
  // 是否是表单元素
  if (isFormElem(elem, tagname, parentname)) {
    formProps?.add(formProp);
    res.isFormElem = true;
    const defaultValue = unref(elem.modelValue ?? elem.value) ?? undefined;
    const context = props.context;
    const modelValue = context.modelValue;
    //
    if (get(unref(modelValue), formProp) == undefined) {
      set(unref(modelValue), formProp, defaultValue);
    }
    // 添加 v-model 指令 以及绑定交互事件
    res.prop = {
      ":modelValue": computed(() => get(unref(modelValue), formProp)),
      "onUpdate:modelValue": (v: any) => {
        set(unref(modelValue), formProp, v ?? defaultValue);
        emitChange?.(formProp, v);
      },
    };
    res.excludeKeys = ["value"];
    res.isFormItem = true;
    res.isNeedElFormItem = isNeedElFormItem(elem);
    onUnmounted(() => {
      formProps?.delete(formProp);
    });
  }
  return res;
};

const useElForm: ElsFormUIPlugin = (props, cfg, ext) => {
  //
  const size = unref(props.size) || "default";
  const attrs = useAttrs();
  //
  const formData = cfg.formData;
  // const emitChange = cfg.emitChange;
  // const formProps = cfg.formProps;
  // 默认的 elFormProps
  const defaultElFormProps: Record<string, any> = merge(
    { validateOnRuleChange: false, size },
    attrs.elForm || {}
  );
  //
  const elFormRef = ref<TypeElForm>();
  //
  const elem: Elem = {
    ...defaultElFormProps,
    tag: ElForm,
    ref: (e: TypeElForm) => (elFormRef.value = e),
    cls: toRef(props, "column"),
    model: formData,
  };
  //
  const elFormApi = (name: string, ...args: any[]) => {
    const f = get(unref(elFormRef), name);
    if (f && isFunction(f)) {
      return f(...args);
    }
  };
  //
  const context = {
    ...ext,
    modelValue: formData,
    formProps:cfg.formProps,
    emitChange:cfg.emitChange,
    tag,
    setup,
    render,
  };

  return {
    elem,
    context,
    formRef: elFormRef,
    formApi: elFormApi,
    refresh: () => {},
    validate: (...args: any[]) => elFormApi("validate", args),
  };
};

export default useElForm;

// ElForm 表单元素的 tagname  驼峰形式，首字符小写//
const EL_FORM_ELEM_TAGS = [
  "elInput",
  "elInputNumber",
  "elSelect",
  "elSelectV2",
  "elDatePicker",
  "elRadio",
  "elRadioGroup",
  "elCheckbox",
  "elCheckboxGroup",
  "elCascader",
  "elCascaderPanel",
  "elColorPicker",
  "elRate",
  "elSlider",
  "elSwitch",
  "elTimePicker",
  "elTimeSelect",
  "elTransfer",
  "elAutocomplete",
];
// 特殊父元素，可以凭借 父元素名称确定子元素名称的！
const EL_FORM_DEFAULT_CHILD: Record<string, Component> = {
  elCheckboxGroup: ElCheckbox,
  elRadioGroup: ElRadio,
  elSelect: ElOption,
};
//

type TypeElForm = InstanceType<typeof ElForm>;
// 是否是表单元素
export const isFormElem = (e: Elem, en: string, pn?: string) => {
  // isFormElem
  if (unref(e.isFormElem) === true) {
    return true;
  }
  if (!EL_FORM_ELEM_TAGS.includes(en)) {
    return false;
  }
  //
  if (pn && has(EL_FORM_DEFAULT_CHILD, pn)) {
    return camelCase(EL_FORM_DEFAULT_CHILD[pn].name) !== en;
  }
  return true;
};

// 判断表单元素是否需要添加 elFormItem 元素
export const isNeedElFormItem = (e: Elem) => {
  const elFormItem: boolean | Record<string, any> =
    unref(e.elFormItem);
  // elFormItem
  if (isBoolean(elFormItem)) {
    return elFormItem;
  }
  return elFormItem?.enabled ?? true;
};

// 依据 required 字段生成 rules 并和 rules 字段合并,如果 rules 中没有对应的 message 按照模板生成 对应的 message
const RULE_MESSAGE_TEMPLATE = {
  required: "请输入 [ {{label}} ] ！",
  pattern: "请按照要求输入正确的 [ {{label}} ] 格式! 格式：{{ pattern }}",
  common: "请输入正确的 [ {{label}} ] 格式!",
};
export const buildRules = (props: Record<string, any>) => {
  const required = unref(props.required) ?? false;
  const trigger = unref(props.trigger) ?? "blur";
  const message = has(props, "message")
    ? getTempValue(unref(props.message), props)
    : getTempValue(RULE_MESSAGE_TEMPLATE.required, props);
  const rules: Record<string, any>[] = isArray(unref(props.rules))
    ? [...unref(props.rules)]
    : [];
  // //
  const tks = Object.keys(RULE_MESSAGE_TEMPLATE);
  const res: Record<string, any>[] = [];
  let hasRequired = false;
  rules.forEach((rule) => {
    const d = { ...unref(rule) };
    const k = tks.filter((k) => has(d, k))?.[0] || "common";
    const t: string =
      d.message || unref(props.message) || get(RULE_MESSAGE_TEMPLATE, k);
    d.message = getTempValue(t, { ...props, ...d });
    if (has(d, "required")) {
      hasRequired = true;
    }
    if (!has(d, "trigger")) {
      d.trigger = trigger;
    }
    res.push(d);
  });
  //
  if (!hasRequired && required) {
    res.push({ required, message, trigger });
  }
  delete props.required;
  delete props.trigger;
  delete props.message;
  //
  return res;
};

// 构建 elFormItem 的 props
const EL_FORM_ITEM_PROPS_KEYS = [
  "label",
  "labelWidth",
  "error",
  "showMessage",
  "inlineMessage",
  "required",
  "rules",
  "trigger",
  "message",
];
const buildElFormItemProps = (props: Record<string, any>) => {
  const elFormItem = unref(get(props, "elFormItem"));
  const keys = isArray(elFormItem)
    ? elFormItem
    : isObject(elFormItem)
    ? Object.keys(elFormItem)
    : [];
  const res: Record<string, any> = isObject(elFormItem)
    ? { ...elFormItem }
    : {};
  EL_FORM_ITEM_PROPS_KEYS.forEach((k) => {
    if (has(props, k) && !keys.includes(k)) {
      res[k] = get(props, k);
      unset(props, k);
    }
  });
  unset(props, "elFormItem");
  return res;
};
