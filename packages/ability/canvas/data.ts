import {get,set,has} from "../../utils/lodash"

abstract class Data {
  private data = new Map<string,any>();
  private handles = new Map<string,Set<() => void>>();
  abstract get:(key:string) => any;
  abstract set:(key:string,val:any) => boolean;
  abstract remove:(key:string) => boolean;
  abstract clear:() => boolean;
  // 发布
  pub(keys:string[],data:Record<string,any>){
    const ds:Set<() => void> = get(this.handles,'default');
    keys.map(k => this.handles.has(k) ? Array.from(this.handles.get(k) as Set<() => void>) : [])
  }
  // 订阅数据变化
  sub(handle:(...args:any) => void):void;
  sub(handle:(...args:any) => void,key:string):void;
  sub(handle:(...args:any) => void,keys:string[]):void;
  sub(handle:(...args:any) => void,keys:string|string[] = 'default'){
    const ks = new Array<string>().concat(keys)
    ks.forEach(k => {
      if(!this.handles.has(k)){
        this.handles.set(k,new Set<() => void>())
      }
      const s = this.handles.get(k);
      s?.add(handle)
    })
  }
}

// 属性集合
// export class Props extends Data {

//   get(key:string){

//   }
// }