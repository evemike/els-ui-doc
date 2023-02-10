<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# ElsCron - CRON 表达式生成器

CRON 表达式生成器表单插件，支持生成，回显，双向绑定，自定义表单布局

## 基础用法
<Preview comp-name="ElsCron" demo-name="demo">
  <demo />
</Preview>

## 属性
参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`modelValue` | 双向绑定参数 | string | - | `` | 否 
`layout` | 生成器表单 tab 布局 | string[] | - | `['second','minute','hour','day','month','year','week']` | 否
`elFormItem` | ElFormItem 组件自定义配置集合 | Record<string,any> | - | `{}` | 否
`label` | 定义 input 输入框的 label 值 | string | - | `` | 否
`rules` | ElFormItem 自定义的校验规则集合 | Record<string,any>[] | - | `[]` | 否
`error` | ElFormItem 自定义的错误信息集合 | string | - | `` | 否
`labelPosition` | ElFormItem 自定义的label 显示位置 | "left"|"right"|"top" | - | `top` | 否
`inlineMessage` | ElFormItem 使用行内信息 | boolean | - | `false` | 否
`showMessage` | 是否启用 ElForm 以及对应的校验提示 | boolean | - | `true` | 否
`disabled` | 输入框不可编辑 | boolean | - | `false` | 否
`noInput` | 是否移除输入框 | boolean | - | `false` | 否
`size` | 所有内置表单的 size 值 | string | - | `normal` | 否

## 事件
事件名 | 说明 | 参数列表 | 参数说明
:-: | :-: | :-: | :-:
`update:modelValue` | 双向绑定的触发事件 | value | 当前生成的 cron 表达式值

## 方法
方法名 | 说明 | 参数列表 | 返回值说明
:-: | :-: | :-: | :-:

