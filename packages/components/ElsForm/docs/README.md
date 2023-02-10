<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demoProp from "./demo-prop.vue"
import demoRule from "./demo-rule.vue"
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# ElsForm - 抽象表单

利用纯数据渲染表单

## 基础用法 element plus 表单组件展示
<Preview comp-name="ElsForm" demo-name="demo">
  <demo />
</Preview>

## 扩展用法 -- PROP
###    
::: tips 提示
1. prop 支持以 . 号链接的多层嵌套的结构  
2. 如果只有数字，会生成数组格式，否则会生成对象嵌套格式
3. 如果已经确定了是数组，则非数字的字符则会被忽略
4. 删除按钮可以配合 autoClean 属性来测试对删除列的值的清除功能
:::

<Preview comp-name="ElsForm" demo-name="demo-prop">
  <demo-prop />
</Preview>

## 扩展用法 -- 表单校验
::: tips 说明
1. required message trigger 可以直接写在元素属性集中。
2. 如果 rules 中已有相同的定义 例如 required ，则保留 rules 中规则！
3. 如果 rules 中没有 message 和 trigger ，则会使用默认的 message 和 trigger 来替换。trigger 默认值取 blur 。
4. message 支持模板语法，其上下文乃是 elFormItem 元素的属性集合,该模板仅支持属性替换，不支持表达式！。内置模板如下：
``` ts
const RULE_MESSAGE_TEMPLATE = {
  required: "请输入 [ {{ label }} ] ！",
  pattern: "请按照要求输入正确的 [ {{label}} ] 格式! 格式：{{ pattern }}",
  common: "请输入正确的 [ {{ label }} ] 格式!",
};
```
:::

<Preview comp-name="ElsForm" demo-name="demo-rule">
  <demo-rule />
</Preview>

## 属性
参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`modelValue` | 支持 v-model 指令 | `Record<string,any>` | - | `{}` | 否 
`column` | 表单元素数据集合 | `Elem[]` | - | `[]` | 否
`size` | 表单内元素 size 大小，原 elForm size 属性 | `"large" \| "default" \| "small"` | - | `small` | 否
`UIPluging` | 所使用的UI库表单插件 | `ElsFormUIPlugin` | - | `elementPlus` | 否
`autoClean` | 是否自动清除已删除的元素值 | `boolean` | - | `true` | 否
`elForm` | 隐藏属性 当使用 elementPlus 插件时生效,针对 elForm 组件的属性配置 | `Record<string,any>` | - | `{}` | 否

::: warning 注意
1. elForm 是依据当前选择 UIPluging 来决定的，是插件自己的内部实现，因为是隐藏属性，所以无法从 props 中获取，只能从 attrs 中获取！
:::

## 事件
事件名 | 说明 | 参数列表 | 参数说明
:-: | :-: | :-: | :-:
`change` | 当表单值变化时触发 | [prop,value] | 第一个参数时变化属性名，第二个参数是对应的属性值
`update:modelValue` | v-model 指令子组件传递数据给父组件的实现 | [value] | 完整的表单值

## 方法
方法名 | 说明 | 参数列表 | 返回值说明
:-: | :-: | :-: | :-:
`validate` | 验证整个表单 | - | - 
`submit` | 验证表单并按照指定方法过滤表单值并返回 | [call] | `(k: string, v: any) => undefined \| [string, any] 遍历 prop 的回调处理方法,默认过滤 undefined 值`
`formApi` | form 插件原生 api 入口 | [name,...args] | 参考 UI 组件库文档 

::: warning 注意
submit 方法回调函数返回值需要注意的是，当返回 undefined 时，会跳过这个属性
:::     
####  
::: warning 注意
formApi 是原生插件方法入口，第一个参数是 name 是原生的方法名，例如 elementPlus 中的 validate 调用方式是 elFormApi("validate",args)   
插件内部实现代码如下：

``` ts
validate: (...args:any[]) => elFormApi("validate",args)
```
:::
