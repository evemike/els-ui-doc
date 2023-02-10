import {CanvasEvent} from "./event"
import {CanvasState} from "./state"
export class Graph {
  private tag = "";
  //
  constructor(){}
  // 事件实例
  event = new CanvasEvent<Graph>(this)
  // 状态实例
  state = new CanvasState(this.stateSub)
  //

  // 状态订阅
  private stateSub(data?:Record<string,any>){
    
  }
}

