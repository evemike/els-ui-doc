// 状态管理类
export class CanvasState {
  // 状态集合
  private subStates:Record<string,any> = {}; // 外部订阅的状态
  private states = new Map<string,any>();
  private subs:((data:Record<string,any>) => void)[] = []
  subscribeHandle:(data?:Record<string,any>) => void;
  
  // 增加订阅函数
  constructor(subscribeHandle:(data?:Record<string,any>) => void){
    this.subscribeHandle = subscribeHandle;
  }
  // 状态变更
  private publish = (data?:Record<string,any>) => {
    this.subscribeHandle(data)
  }
  // 更新状态
  private update = (states:Record<string,any> = {}) => {
    const data:Record<string,any> = {}
    let isChange = false;
    Object.keys(states).forEach(n => {
      const v = states[n]
      if(!this.states.has(n) || this.states.get(n) !== v){
        this.states.set(n,v)
        isChange = true;
        data[n] = v
      }
    })
    if(isChange){
      this.publish(data)
    }
  }
  // 
  private subApi = (data:Record<string,any>) => {
    const d:Record<string,any> = {}
    let isChange = false;
    Object.keys(data).forEach(k => {
      if(!this.states.has(k)){
        d[k] = data[k]
        isChange = true;
      }
    })
    if(isChange){
      this.subStates = d;
      this.publish(d)
    }
  }
  // 订阅
  sub = (api:(data:Record<string,any>) => void) => {
    this.subs.push(api)
  }
  // 获取当前状态
  get = () => {
    return [...this.states.entries()].reduce((obj:Record<string,any>, [key, value]) => (obj[key] = value, obj), {...this.subStates})
  }
  // 状态赋值
  set(states:Record<string,any>):void;
  set(name:string,val:any):void;
  set(arg1:string|Record<string,any>,arg2?:any){
    // const temp:[add?:Record<string,any>,del?:Record<string,any>] = [{}]
    let states:Record<string,any> = {}
    const t = typeof arg1;
    if(t === 'string' && arg2){
      states[arg1 as string] = arg2
    }
    else if(t === 'object'){
      states = arg1 as Record<string,any>;
    }
    this.update(states)
  }
  // 清除状态
  clear = () => {
    this.states.clear();
    this.publish();
  }
}