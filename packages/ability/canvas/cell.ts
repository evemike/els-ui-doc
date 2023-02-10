// 元素基础类
import {Graph} from "./graph"
import {CanvasEvent} from "./event"
import {CanvasState} from "./state"
export class Cell {
  private tag = 'cell'
  graph:Graph;
  event:CanvasEvent<Cell>;
  state = new CanvasState(this.stateSub);
  //
  constructor(graph:Graph) {
    this.graph = graph;
    this.event = new CanvasEvent<Cell>(this,'cell',graph.event.getHandles());

    // 添加到画布之后触发事件！ 表示创建成功
    // this.event.emit('cell:added',this)
  }

  private stateSub(data?:Record<string,any>){}

}