// 事件管理类
export class CanvasEvent<T> {
  // 监听函数存储类
  private target:T;
  private tag:string;
  private tagReg:RegExp;
  private handles:Map<string,Set<(...args:any) => void>>;
  //
  constructor(target:T,tag = "" ,handles?:Map<string,Set<(...args:any) => void>>) {
    this.target = target;
    this.tag = tag;
    this.tagReg = new RegExp(`^${this.tag}:`);
    if(handles){
      this.handles = handles;
    }else{
      this.handles = new Map<string,Set<(...args:any) => void>>();
    }
  }
  private getName(name:string){
    if(!this.tag) {return name;}
    if(this.tagReg.test(name)){
      return name;
    }else{
      return `${this.tag}:${name}`
    }
  }
  //
  getHandles(){return this.handles;}
  // 监听事件
  on(name:string,handle:(...args:any) => void){
    const _name = this.getName(name);
    if(!this.handles.has(_name)){
      this.handles.set(_name,new Set<(...args:any) => void>())
    }
    this.handles.get(_name)?.add(handle)
  }
  // 触发事件
  emit(name:string,...args:any){
    const _name = this.getName(name);
    if(this.handles.has(_name)){
      this.handles.get(_name)?.forEach(fun => fun.apply(this.target,[...args]))
    }
  }

  // 移除指定监听
  remove(name:string,handle?:(...args:any) => void){
    const _name = this.getName(name);
    if(this.handles.has(_name)){
      if(handle == undefined){
        this.handles.delete(_name)
      }else{
        const handles = this.handles.get(_name);
        handles!.has(handle) ?? handles!.delete(handle)
      }
    }
  }

  // 清除所有监听
  clear(){
    this.handles.clear();
  }
}