import {merge,get,has} from "../../utils/lodash"

// 初始精灵
class Sprite {
  // 构造函数
  constructor(ctx:CanvasRenderingContext2D,props:Record<string,any>){
    this.ctx = ctx;
    this.attrs = merge({},this.attrs,props)
  }
  public ctx:CanvasRenderingContext2D
  // 精灵属性集合
  public attrs:Record<string,any> = {}
  // 绘制方法 各个派生类自己实现
  public draw = () => {}

}

export default Sprite;