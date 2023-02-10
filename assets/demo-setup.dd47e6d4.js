const e=`<script setup lang="ts">
import { ref, h,onUpdated,onMounted,onBeforeMount,onBeforeUpdate,onBeforeUnmount,onUnmounted } from "vue";
import { ElsElem, Elem } from "../index";
import { ElButton,ElDivider, ElTag } from "element-plus"
//
//
const n1 = ref(0)
const test1:Elem = {tag:ElButton,type:"success",setup:() => {
  console.log("\u7236\u5BB9\u5668 setup ====>")
  onBeforeMount(() => console.log("\u7236\u5BB9\u5668 before mounted"))
  onMounted(() => console.log("\u7236\u5BB9\u5668 mounted"))
  onBeforeUpdate(() => console.log("\u7236\u5BB9\u5668 before updated"))
  onUpdated(() => console.log("\u7236\u5BB9\u5668 updated"))
},"@click":() => {n1.value++},cls:{setup:() => {
  console.log("\u5B50\u8282\u70B9 setup ====>")
  onBeforeMount(() => {console.log("\u5B50\u8282\u70B9 before mounted");})
  onMounted(() => {console.log("\u5B50\u8282\u70B9 mounted"); })
  onBeforeUpdate(() => console.log("\u5B50\u8282\u70B9 before updated"))
  onUpdated(() => {console.log("\u5B50\u8282\u70B9 updated");})
  onBeforeUnmount(() => console.log("\u5B50\u8282\u70B9 before unmount"))
  onUnmounted(() => console.log("\u5B50\u8282\u70B9 unmounted"))
  return {n1,n2:Math.random()}
},cls:"\u70B9\u6211\u4FEE\u6539 n1 \u7684\u503C\uFF01 ===> n1 = {{ n1 }} :::  n2 = {{n2}}"}}
//
const b2 = ref(true)
const test2:Elem = {
  cls:[
    {tag:ElButton,cls:["\u70B9\u6211\u5207\u6362\u5143\u7D20"," :: ","bool = ",b2],"@click":() => {b2.value = !b2.value}},
    {tag:"br"},
    {setup:() => ({render:() => b2.value ? "setup render => BOOLEAN = true" : "setup render => BOOLEAN = false"}),render:() => b2.value ? "BOOLEAN = true" : "BOOLEAN = false" },
    {tag:"br"},
    // h(ElTag,{type:"success"}, {default:() => "bool is true"} ) \u5B50\u5143\u7D20\u91C7\u7528\u63D2\u69FD\u5199\u6CD5\uFF0C\u4E0D\u7136\u4F1A\u62A5\u8B66\u544A\uFF01
    {render:() => b2.value ? h(ElTag,{type:"success"}, {default:() => "bool is true"} ) : undefined },
    {render:() => b2.value ? undefined : "bool is false" }
  ]
}
<\/script>

<template>
  <div>
    <el-divider>1. setup \u8FD4\u56DE\u503C \u58F0\u660E\u5468\u671F\u94A9\u5B50\u51FD\u6570\u6D4B\u8BD5 \u8BF7\u6253\u5F00\u63A7\u5236\u53F0\uFF01</el-divider>
    <els-elem :elem="test1"></els-elem>
    <el-divider>2. setup \u8FD4\u56DE render \u51FD\u6570\uFF0C\u8986\u76D6\u9ED8\u8BA4\u7684 render \u51FD\u6570</el-divider>
    <els-elem :elem="test2"></els-elem>

  </div>
</template>`;export{e as default};
