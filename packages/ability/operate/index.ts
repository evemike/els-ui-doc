import { indexOf } from "lodash"
import { Elem,Context } from "../../components/ElsElem"
import {isArray} from "../../utils/lodash"

type OperateElem<T extends string> = (T|[T,Elem]|Elem)[]

// 生成 操作按钮集合的方法
export interface UseOperateProps<T extends string> {
  operate?:OperateElem<T>
  attrs?:Record<string,any>
  handle?:(name:string,...args:any) => void;
  class?:string
  defaultData?:Record<T,Elem>
  layout?:Record<string, string[]> | string[]
}

export interface UseOperateResult {
  elems:Elem[]
}
// 
const useOperate = <T extends string>(props:UseOperateProps<T>):UseOperateResult => {
  const {operate,attrs = {},handle,class:cla,defaultData,layout} = props;
  //
  if(operate == undefined){
    return {elems:[]}
  }
  //
  const ek:string[] = []
  const es:Elem[] = []
  for(let i = 0,l = operate.length;i < l;i++){
    const v = operate[i];
    let e:Elem|undefined;
    let k:string;
    if(typeof v === 'string'){
      k = v;
      e = defaultData?.[v]
    }
    else if(isArray(v)){
      const [tk,tv] = v;
      const t = defaultData?.[tk] || {}
      k = tk;
      e = {...t,...tv}
    }else{
      k = v.keyid || v.name || v.label
      e = v;
    }
    //
    if(e != undefined){
      if(handle){
        const tc = e?.onClick
        e.onClick = (...args:any) => {
          tc?.(...args)
          handle.call(e,k,...args)
        }
      }
      es.push({...attrs,...e})
      ek.push(k)
    }
  }
  // layout
  const elems = layout == undefined ? es : sortGroupUtil(layout,ek,es)
  //
  return {elems}
}

export default useOperate;


// layout 排序和分组
const sortGroupUtil = (layout:Required<UseOperateProps<any>>["layout"],ek:string[],es:Elem[]):Elem[] => {
  if(isArray(layout)){
    return layout.map(k => indexOf(ek,k)).filter(n => n > -1).map(n => es[n])
  }
  const ks = Object.keys(layout);
  return ks.map(k => ({tag:"div",class:"_operate-layout-" + k,cls:sortGroupUtil(layout[k],ek,es)}))
}