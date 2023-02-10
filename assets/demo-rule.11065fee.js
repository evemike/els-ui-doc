const e=`<script setup lang="ts">
import {ref} from "vue"
import {ElsForm} from "../index"
import {Elem} from "../../ElsElem"
import {ElDivider,ElButton} from "element-plus"
//
const column:Elem[] = [
  {tag:ElButton,cls:"\u70B9\u6211\u6821\u9A8C\u8868\u5355\u89C4\u5219 \u901A\u8FC7 ref \u83B7\u53D6\u8868\u5355\u5B9E\u4F8B\u5E76\u8C03\u7528 validate \u65B9\u6CD5",type:"primary","@click":() => {elsFormRef?.value?.validate()}},
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
<\/script>

<template>
  <div style="display:flex;justify-content:space-between">    
    <els-form ref="elsFormRef" style="width:49%;max-height:calc(100vh - 300px);overflow:auto;" v-model="data" :column="column" ></els-form>
    <el-divider direction="vertical" style="height:auto"></el-divider>
    <div style="width:49%;max-height:calc(100vh - 300px);overflow:auto;">
      <pre>{{ JSON.stringify(data,null,2) }}</pre>
    </div>
    
  </div>
</template>`;export{e as default};
