import {
  defineComponent,
  PropType,
  unref,
  computed,
  h,
  mergeProps,
  VNode,
  resolveComponent,
  isVNode,
} from "vue";
import {
  Elem,
  SetupFunction,
  ElemChild,
  ElsElemProps,
  ElemTag,
  ElemStaticTag,
  RenderFunction,
  RenderFunctionParams,
  ElsElemScope,
} from "./inter";
import {
  getElemAttrs,
  parseDirective,
  getExpValue,
  getDestruct,
  getSlotName,
  isHtmlTag,
  defaultRender,
  getProps,
} from "./util";
import {
  merge,
  kebabCase,
  isFunction,
  isObject,
  omit,
  assign,
} from "../../../utils/lodash";

export default defineComponent({
  name: "els-elem",
  props: {
    elem: Object as PropType<ElsElemProps["elem"]>,
    context: Object as PropType<ElsElemProps["context"]>,
    parent: Object as PropType<ElsElemProps["parent"]>,
    params: Object as PropType<ElsElemProps["params"]>,
    slotParams: Object as PropType<ElsElemProps["slotParams"]>,
    slots: Object as PropType<ElsElemProps["slots"]>,
  },
  setup(props, ctx) {
    // 不使用解构赋值 主要是因为解构赋值会失去响应性
    const elem: ElsElemProps["elem"] = props.elem || {};
    const context: ElsElemProps["context"] = props.context || {};
    const parent: ElsElemProps["parent"] = props.parent;
    const params: ElsElemProps["params"] = props.params || {};
    const slots: ElsElemProps["slots"] = assign(
      {},
      context.slots || {},
      props.slots || ctx.slots
    );
    // tag
    const et: ElemTag = unref(elem?.tag) ?? unref(context?.tag) ?? "div";
    // @ts-ignore
    const tag = isFunction(et) ? et(props, ctx) : et;
    const tagname =
      typeof unref(tag) === "string" ? unref(tag) : kebabCase(unref(tag).name);
    const isHtml = isHtmlTag(tagname);
    // const tag = computed<ElemStaticTag>(() => {
    //   const t: ElemTag =
    //     unref(elem?.tag) ??
    //     unref(context?.tag) ??
    //     "div";
    //   if (typeof t == "function" && t.name === "tag") {
    //     // @ts-ignore
    //     return t(props, ctx);
    //   }
    //   return t;
    // });
    // const tagname = computed(() =>
    //   typeof tag.value === "string" ? tag.value : kebabCase(tag.value.name)
    // );
    // const isHtml = computed(() => isHtmlTag(unref(tagname)));
    // setup 处理
    let elemSetupRes: ReturnType<SetupFunction> = {};
    let ctxSetupRes: ReturnType<SetupFunction> = {};
    const setupRes: ReturnType<SetupFunction> = { prop: {} };
    if (context.setup) {
      ctxSetupRes =
        context.setup(
          props as ElsElemProps,
          { tag: unref(tag), tagname: unref(tagname), isHtml: unref(isHtml) },
          ctx
        ) || {};
      merge(setupRes, ctxSetupRes);
    }
    if (elem.setup) {
      elemSetupRes =
        elem.setup(
          props as ElsElemProps,
          { tag: unref(tag), tagname: unref(tagname), isHtml: unref(isHtml) },
          ctx
        ) || {};
      merge(setupRes, elemSetupRes);
    }
    // 解析 elem 合并规则自定义，当发现数组是，采用 concat 合并
    // const attrs = getElemAttrs(assignWith(clone(elem),setupRes.prop,(ov,sv,k) => {
    //   if(k === "cls" || k === "children"){
    //     return new Array<Elem["cls"]>().concat(ov,sv).filter(v => v != undefined)
    //   }
    //   else if(isArray(ov) || isArray(sv)){
    //     return new Array<any>().concat(ov,sv).filter(v => v != undefined)
    //   }
    // }), context);
    const attrs = getElemAttrs(mergeProps(elem, setupRes.prop || {}), context);
    const root = attrs.root;
    const prop = attrs.prop;
    const directive = attrs.directive;

    // 需要排除在 props 中的 keys
    const excludeKeys = new Array<string>().concat(
      setupRes.excludeKeys || [],
      elem.excludeKeys || [],
      context.excludeKeys || []
    );
    // 作用域
    // 属性作用域
    const _scopeA = { ...params, ...prop, ...setupRes };
    // 引用作用域
    const _scopeB: ElsElemScope = {
      $tag: unref(tag),
      $tagname: unref(tagname),
      $isHtml: unref(isHtml),
      $slots: slots,
      $elem: elem,
      $context: context,
      $root: root,
      $prop: prop,
      $directive: directive,
      $elemSetupRes: elemSetupRes,
      $ctxSetupRes: ctxSetupRes,
      $setupRes: setupRes,
      $parent: parent,
      $params: params,
    };
    //
    const childs = computed(() =>
      new Array<ElemChild | Elem | undefined>()
        .concat(unref(root.children), unref(root.cls))
        .filter((v) => v != undefined)
    );
    //
    const createChildren = (params: Record<string, any>) => {
      const cls = unref(childs);
      if (cls.length === 0) {
        return undefined;
      }
      const temp: Record<string, ((arg: any) => VNode | string | undefined)[]> =
        {
          default: [],
        };
      // 遍历所有子节点 构建子节点函数
      cls.forEach((c) => {
        const tc = unref(c);
        if (isVNode(tc)) {
          temp.default.push(() => tc);
        } else if (isFunction(tc)) {
          temp.default.push((_s) => tc(params, _s, _scopeB));
        } else if (isObject(tc)) {
          const sn = getSlotName(tc);
          if (!temp[sn]) {
            temp[sn] = [];
          }
          // 当采用直接渲染时
          if (tc.isDirectRender === true) {
            const _et = unref(tc?.tag) ?? unref(context?.tag) ?? "div";
            const _tag = isFunction(_et)
              ? _et({ elem: tc, context, params }, ctx)
              : _et;
            const _tn =
              typeof unref(_tag) === "string"
                ? unref(_tag)
                : kebabCase(unref(_tag).name);
            //
            temp[sn].push((_s = {}) =>
              h(_tag, getProps(tc, { ...params, ..._s }), {default:(_sc = {}) => [
                h(resolveComponent("els-elem"), {
                  elem: { tag: "template", cls: tc.cls },
                  context,
                  parent: { elem: tc, tagname: _tn, setupRes },
                  params,
                  slotParams: {..._s,..._sc},
                  slots,
                }),
              ]})
            );
          } else {
            temp[sn].push((slotParams) =>
              h(resolveComponent("els-elem"), {
                elem: tc,
                context,
                parent: { elem, tagname: unref(tagname), setupRes },
                params,
                slotParams,
                slots,
              })
            );
          }
        } else {
          temp.default.push((_s) => getExpValue(String(tc), params));
        }
      });
      //
      const res: any = {};
      Object.keys(temp).forEach((k) => {
        res[k] = (p: any) => temp[k].map((f) => f(p));
      });
      return res;
    };
    // render
    const render: RenderFunction = () => {
      // slot scope
      const ss = getDestruct(root["slot-scope"], props.slotParams);
      // 变量作用域
      // console.log('====scope====>',props.slotParams,root["slot-scope"])
      const scope = { ..._scopeA, ...ss };
      // 指令解析
      const directives = parseDirective(directive, scope);
      // v-if 实现
      if (directives["v-if"] === false) {
        return undefined;
      }
      // 构造 props
      const elemProps: Record<string, any> = omit(
        mergeProps(prop, directives["v-bind"], directives["v-on"]),
        excludeKeys
      );
      // 创建子节点集合
      const children = createChildren(scope);
      //
      const config: RenderFunctionParams = {
        tag: unref(tag),
        tagname,
        isHtml: scope.$isHtml,
        props: elemProps,
        children,
        context,
        elem,
        slots,
        parent,
        directives,
        setupRes,
      };
      // 判断是否有自定义 render 函数
      const _render =
        elemSetupRes?.render ||
        root?.render ||
        ctxSetupRes?.render ||
        context?.render;
      if (_render) {
        if (isFunction(_render)) {
          return _render(config);
        }
        if (_render[tagname] != undefined) {
          return _render[tagname](config);
        }
      }
      // 返回默认渲染函数
      return defaultRender(config);
    };
    //
    return render;
  },
});
