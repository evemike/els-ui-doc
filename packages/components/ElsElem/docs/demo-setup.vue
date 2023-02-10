<script setup lang="ts">
import { ref, h,onUpdated,onMounted,onBeforeMount,onBeforeUpdate,onBeforeUnmount,onUnmounted } from "vue";
import { ElsElem, Elem } from "../index";
import { ElButton,ElDivider, ElTag } from "element-plus"
//
//
const n1 = ref(0)
const test1:Elem = {tag:ElButton,type:"success",setup:() => {
  console.log("父容器 setup ====>")
  onBeforeMount(() => console.log("父容器 before mounted"))
  onMounted(() => console.log("父容器 mounted"))
  onBeforeUpdate(() => console.log("父容器 before updated"))
  onUpdated(() => console.log("父容器 updated"))
},"@click":() => {n1.value++},cls:{setup:() => {
  console.log("子节点 setup ====>")
  onBeforeMount(() => {console.log("子节点 before mounted");})
  onMounted(() => {console.log("子节点 mounted"); })
  onBeforeUpdate(() => console.log("子节点 before updated"))
  onUpdated(() => {console.log("子节点 updated");})
  onBeforeUnmount(() => console.log("子节点 before unmount"))
  onUnmounted(() => console.log("子节点 unmounted"))
  return {n1,n2:Math.random()}
},cls:"点我修改 n1 的值！ ===> n1 = {{ n1 }} :::  n2 = {{n2}}"}}
//
const b2 = ref(true)
const test2:Elem = {
  cls:[
    {tag:ElButton,cls:["点我切换元素"," :: ","bool = ",b2],"@click":() => {b2.value = !b2.value}},
    {tag:"br"},
    {setup:() => ({render:() => b2.value ? "setup render => BOOLEAN = true" : "setup render => BOOLEAN = false"}),render:() => b2.value ? "BOOLEAN = true" : "BOOLEAN = false" },
    {tag:"br"},
    // h(ElTag,{type:"success"}, {default:() => "bool is true"} ) 子元素采用插槽写法，不然会报警告！
    {render:() => b2.value ? h(ElTag,{type:"success"}, {default:() => "bool is true"} ) : undefined },
    {render:() => b2.value ? undefined : "bool is false" }
  ]
}
</script>

<template>
  <div>
    <el-divider>1. setup 返回值 声明周期钩子函数测试 请打开控制台！</el-divider>
    <els-elem :elem="test1"></els-elem>
    <el-divider>2. setup 返回 render 函数，覆盖默认的 render 函数</el-divider>
    <els-elem :elem="test2"></els-elem>

  </div>
</template>