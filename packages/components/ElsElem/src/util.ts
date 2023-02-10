import { unref, renderSlot, resolveDynamicComponent, createVNode,h ,mergeProps} from "vue"
import { isObject, isMap, upperFirst, isArray, get,omit } from "../../../utils/lodash"
import { Elem, Context, ElemAttrs, RenderFunction } from "./inter"

//
const REG_IS_VUE = /^\s*v-([\w-]+)\s*$/;
const REG_SLOT = /^\s*(?:(?:v-slot:|#)(\w+)|v-slot)\s*$/;
const REG_BIND = /^\s*(?:(?:v-bind:|:)(\w+)|v-bind)\s*$/;
const REG_ON = /^\s*(?:v-on:|@)([\w:]+)\s*$/;
// 这里面的keys 默认会放入到 root 中，如果希望放入 props 中并且不做过多处理，请使用 contextKeys 来处理~
const ROOT_KEYS = [
  "tag",
  "setup",
  "hooks",
  "cls",
  "children",
  "contextKeys",
  "excludeKeys",
  "this",
  "slot-scope",
  "slot",
  "render",
  "beforeRender",
  "isDirectRender"
];

const HTML_TAGS = ["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","menu","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"];
export const isHtmlTag = (tag: string): boolean => HTML_TAGS.includes(tag);
export const getElemAttrs = (elem: Elem, context: Context) => {
  const keys = Object.keys(elem);
  const res: ElemAttrs = { root: {}, directive: {}, prop: {} }; // root | directive | props

  keys.forEach((k) => {
    const v = elem[k];
    const b = REG_IS_VUE.test(k) || REG_BIND.test(k) || REG_ON.test(k);
    // 需要包含在 props 中的keys 集合
    const ctxKeys: string[] = new Array<string>().concat(
      elem.contextKeys || [],
      context.contextKeys || []
    );
    // 需要排除在 props 中的 keys 集合
    const extKeys: string[] = new Array<string>().concat(
      elem.excludeKeys || [],
      context.excludeKeys || []
    );
    //
    const cb = ctxKeys.includes(k);
    if (REG_SLOT.test(k)) {
      res.root["slot-scope"] = v;
      res.root["slot"] = REG_SLOT.exec(k)?.[1] ?? "default";
    } else if (b) {
      res.directive[k] = v;
    }
    else if (ROOT_KEYS.includes(k) && !cb) {
      res.root[k] = v;
    } else{
      res.prop[k] = v;
    }
  });
  return res;
};
//
export const getSlotName = (elem: Elem) => {
  const keys = Object.keys(elem).filter(k => REG_SLOT.test(k));
  if (keys.length > 0) {
    return REG_SLOT.exec(keys[0])?.[1] || "default"
  }
  return "default"
}

// 字符串表达式执行 并返回结果
const ExtKeys = ["this","true","false"];
const doEval = (s = "", obj: any = {}, isGetRefValue = false): any => {
  // 剔除不能作为 key 值的 字符串 如 onUpdate:XXX
  const keys = Object.keys(obj).filter(k => typeof k === 'string').filter((k) => !ExtKeys.includes(k)).filter(k => !/[^\w$]/.test(k));
  const vals = keys.map((k) => (isGetRefValue ? unref(obj[k]) : obj[k]));
  const str = "return " + s;
  try {
    return new Function(...keys, str)(...vals);
  } catch (e) {
    console.error("字符串表达式执行异常！",s,obj,isGetRefValue);
    console.error(keys,vals,str);
    console.error(e);
  }
  return undefined;
};
// 指令解析

const EventKeys = ["pointerevent"]
export const parseDirective = (
  directive: Record<string, any>,
  scope: Record<string, any>
) => {
  const keys = Object.keys(directive);
  const res: Record<string, any> = { "v-bind": {}, "v-on": {} };
  //
  keys.forEach((k) => {
    let v = directive[k];
    if (typeof v === "string") {
      v = doEval(v, scope, true);
    } else {
      v = unref(v);
    }
    // v-bind
    if (REG_BIND.test(k)) {
      // const r = res['v-bind']
      const bk = REG_BIND.exec(k) ?? [];
      //
      if (bk[1] == undefined) {
        if (isMap(v)) {
          for (const [tk, tv] of v) {
            if (REG_IS_VUE.test(tk)) {
              res[tk] = tv;
            } else {
              res["v-bind"][tk] = tv;
            }
          }
        }
        else if (isObject(v)) {
          Object.keys(v).forEach((tk) => {
            if (REG_IS_VUE.test(tk)) {
              res[tk] = v[tk];
            } else {
              res["v-bind"][tk] = v[tk];
            }
          });
        }
      }
      //
      else {
        res["v-bind"][bk[1]] = v;
      }
    }
    // v-on
    else if (REG_ON.test(k)) {
      const ek = REG_ON.exec(k) ?? [];
      if (ek[1]) {
        const tk = "on" + upperFirst(ek[1]);
        res["v-on"][tk] =
          typeof v === "function"
            ? (e:Event,...args:any[]) => {
              const t = Object.prototype.toString.call(e).split(' ')[1].replace(']','').toLowerCase();
              const params = {...scope}
              if(EventKeys.includes(t)){
                params.$event = e;
              }else{
                args = [e,...args]
              }
              if(args.length > 0){
                params.$ = args;
              }
              return v.apply(scope, [params])
            }
            : v;
      }
    }
    //
    else {
      res[k] = v;
    }
  });
  return res;
};

// 循环匹配并执行回调
const loopExec = (reg: RegExp, str: string, call: (res: RegExpExecArray) => void) => {
  let t: RegExpExecArray | null;
  while ((t = reg.exec(str)) !== null) {
    call(t)
  }
}

// 字符串模板 表达式解析 aa {{ a+b }} bb {{ c + d }}
const REG_EXP = /\{\{\s*(.*?)\s*\}\}/g
export const getExpValue = (str: string, scope: Record<string, any> = {}) => {
  if (!str) {
    return "";
  }
  let res = str;
  loopExec(REG_EXP, str, ([s, exp]) => {
    try {
      const v = doEval(exp, scope,true)
      res = res.replace(s, v)
    } catch (e) {
      console.error("=====字符串模板解析异常！=====", exp, scope)
    }
  })
  return res;
}

// 解构赋值方法 支持不完全对象解构赋值 {k:key,k,k:key} /^\s?{.*}\s?$/ [a,b,c] = [0,1,2]
const REG_ISARRAY = /^\s*\[(.*)\]\s*$/
const REG_ISOBJECT = /^\s*\{(.*)\}\s*$/
export const getDestruct = (str: string|boolean, scope: any = {}): Record<string,any> => {
  const s = unref(scope)
  if (!str || typeof str === 'boolean') {
    return str === false ? {} : s
  }
  const res: any = {};
  if (isArray(s) && REG_ISARRAY.test(str)) {
    const as = REG_ISARRAY.exec(str);
    const ks = as?.[1] ? as[1].split(',').map(k => k.trim()) : []
    ks.forEach((k, i) => {
      res[k] = s?.[i]
    })
  }
  else if (isObject(s) && REG_ISOBJECT.test(str)) {
    const as = REG_ISOBJECT.exec(str);
    const ks = as?.[1] ? as[1].split(',').map(k => k.trim()) : []
    ks.forEach(k => {
      const [sk, tk] = k.split(':').map(s => s.trim())
      res[tk || sk] = get(s, sk)
    })
  }
  else {
    res[str] = s;
  }
  return res;
};


// 特殊元素的渲染
export const specialRender: Record<string, RenderFunction> = {
  template({ children }) {
    // @ts-ignore
    return children?.default();
  },
  slot({ props, children, slots }) {
    const name = props.name || "default";
    delete props.name;
    // console.log(this.$_attrs)
    const childs = children?.[name] ?? (() => []);
    // @ts-ignore
    return renderSlot(slots, name, props, () => childs())
  },
  component({props,children}) {
    const name: string = props.is;
    delete props.is;
    const c: any = resolveDynamicComponent(name);
    return createVNode(c, props, children);
  },
};

// 默认元素渲染
export const defaultRender:RenderFunction = (config) => {
  const tagname = config.tagname
  // 特殊元素的默认渲染函数
  if(specialRender[tagname]){
    return specialRender[tagname](config)
  }
  // 
  const directives = config.directives;
  const children = config.children;
  const tag = config.tag;
  const props = config.props;
  // v-text:: 已知当有 v-text 属性时，会覆盖掉内部的 children 属性
  if (directives["v-text"]) {
    // @ts-ignore
    return h(tag, props, directives["v-text"] as string);
  }
  // 返回 VNode 
  // @ts-ignore
  return h(tag,props,children)
}

// props 过滤
export const propsFilter = (props:Record<string,any>,extKeys:string[]) => {
  return omit(props,extKeys)
} 

//
export const getProps = (elem:Elem,ctx:Record<string,any>) => {
  const {prop,directive} = getElemAttrs(elem,{})
  //
  const dt = parseDirective(directive,ctx);
  //
  return mergeProps(prop, dt["v-bind"], dt["v-on"])
}