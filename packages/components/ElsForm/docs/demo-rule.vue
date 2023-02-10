<script setup lang="ts">
import {ref} from "vue"
import {ElsForm} from "../index"
import {Elem} from "../../ElsElem"
import {ElDivider,ElButton} from "element-plus"
//
const column:Elem[] = [
  {tag:ElButton,cls:"点我校验表单规则 通过 ref 获取表单实例并调用 validate 方法",type:"primary","@click":() => {elsFormRef?.value?.validate()}},
  {tag:ElDivider},
  {prop:'input.A',label:"INPUT A",value:"",required:true},
  {prop:'input.B',label:"INPUT B",value:"",required:true,trigger:"change",message:"{{prop}} {{label}} is required!"},
  {prop:'input.C.A',label:"INPUT C.A",value:"",required:true,rules:[{required:false},{min:20}]},
  {prop:'input.C.B',label:"INPUT C.B",value:""},
  {prop:'input.C.0',label:"INPUT C.0",value:""},
  {prop:'input.C.D.A',label:"INPUT C.D.A",value:""},
]

const data = ref<Record<string,any>>({})
const elsFormRef = ref()
</script>

<template>
  <div style="display:flex;justify-content:space-between">    
    <els-form ref="elsFormRef" style="width:49%;max-height:calc(100vh - 300px);overflow:auto;" v-model="data" :column="column" ></els-form>
    <el-divider direction="vertical" style="height:auto"></el-divider>
    <div style="width:49%;max-height:calc(100vh - 300px);overflow:auto;">
      <pre>{{ JSON.stringify(data,null,2) }}</pre>
    </div>
    
  </div>
</template>