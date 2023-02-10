<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demoSetup from "./demo-setup.vue"
</script>
<!-- 加载 demo 组件 end -->
<!-- 正文开始 -->

# ElsElem
# 抽象元素

抽象数据渲染

## 版本


## 基础用法
<Preview demo-name="demo">
  <demo />
</Preview>

###    
::: tips 提示
在基础用法中，主要简单介绍属性绑定、字符串模板、v-if 指令、插槽 slot 、具名插槽，作用域插槽、事件绑定的用法。   
其中需要注意的是，当属性是 Ref 响应式属性时，如果需要绑定其值，则需要通过 v-bind 指令来绑定，如果需要整个响应式对象，则直接绑定即可。   
另外在事件绑定时，回传的参数是经过了处理的。所有回调的参数都包裹在一个大的对象里，事件中传递的参数则是在 对象的 $ 属性中，该属性是回调函数的参数列表 arguments 的完整值，另外，当回调的第一个参数是 Event 类型时，会将该值追加到 $event 属性中。
:::

###     
::: warning 子节点(cls | children)
1. children 优先级比 cls 优先级高
2. 支持 string number boolean Elem VNode () => VNode|string|undefined 或混合数组、响应式数据 类型。
3. 当 为函数时 和 render 在参数上有所不同
:::

## setup 和 render 函数
<Preview demo-name="demo-setup">
  <demo-setup/>
</Preview>

###    
::: tips setup 和 render 函数
1. setup 中可以设定生命周期钩子函数。
2. setup 可以返回对象，并且对象属性可以用在表达式或者指令表达式中。
3. setup 可以返回 tag 值，并且按照优先级来生效。优先级：**elem.setup > elem.attr > context.setup > context.attr** 
4. setup 可以返回 render 函数，并且优先级最高，可以覆盖掉默认的 render 函数，不过 v-if 指令会在 render 函数之前生效！。
5. render 函数可以返回 VNode,string,number,boolean,undefined 这些数据类型
6. render 函数还有一个参数 config 可以获取到 els-elem 组件内部处理好的一些数据，声明如下：
``` ts
export type RenderFunction = (config: {
  tag: string;
  isHtml: boolean;
  props: any;
  children: Record<string, (p?: any) => TOA<string | VNode> | undefined>;
  context: Context;
  slots: any;
}) => TOA<string | VNode> | undefined;
```
:::

## 重要属性及其子属性说明
参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:- | :-: | :-: | :-: | :-: | :-:
`elem` | 第一个参数 | Elem | - | - | 是 
`- tag` | 元素标签 | ElemTag | - | div | 否 
`- contextKeys` | 需要添加到 props 中的属性 | string[] | - | - | 否 
`- excludeKeys` | 不需要添加到 props 中的属性 | string[] | - | - | 否 
`- setup` | 初始化函数，将在 created 时调用 | SetupFunction | - | - | 否 
`- render` | 自定义 render 函数 | RenderFunction | - | - | 否 
`- cls\|children` | 子节点 | TORA\<ElemChild\> | - | - | 否   
`context` | 第二个参数 | Context | - | {} | 否
`- slots` | context.slots | Record\<string,RenderFunction\> | - | - | 否 
`- tag` | 元素标签 | ElemTag | - | div | 否 
`- contextKeys` | 需要添加到 props 中的属性 | string[] | - | - | 否 
`- excludeKeys` | 不需要添加到 props 中的属性 | string[] | - | - | 否 
`- setup` | 初始化函数，将在 created 时调用 | SetupFunction | - | - | 否 
`- render` | 自定义 render 函数 | RenderFunction\|Record\<string,RenderFunction\> | - | - | 否 
###
::: warning 优先级
context 中和 elem 中很多属性都是重合的，而且，在 setup 的返回值中也有部分重合属性，例如 tag ,当属性重合时，会有优先级之分。大体优先级排序如下        
**elem.setup > elem.attr > context.setup > context.attr**   
以 **render** 为例，实际代码如下：      
``` ts
  // 判断是否有自定义 render 函数
  const _render = elemSetupRes?.render || root?.render || ctxSetupRes?.render || context?.render;
```
:::
###
::: warning 属性
在 elem 对象中 ，并不是所有属性都会添加到元素的 props 中，部分属性是定义好的功能属性，这部分属性在组件中会被用到，并且默认不会添加到 props 中！
``` ts
  // 这里面的keys 默认会放入到 root 中，如果希望放入 props 中并且不做过多处理，请使用 contextKeys 来处理~
  const ROOT_KEYS = ["tag","setup","hooks","cls","children","contextKeys","excludeKeys","this","slot-scope","slot","render"];
```
:::
###
::: warning setup
1. setup 函数 执行顺序 context.setup > elem.setup
:::


