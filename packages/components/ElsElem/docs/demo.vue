<template>
  <div>
    <el-divider>字符串插值和普通元素</el-divider>
    <els-elem :elem="test1"></els-elem>
    <el-divider>
      v-if 指令
      <el-switch v-model="bool"></el-switch>
    </el-divider>
    <els-elem :elem="test2"></els-elem>
    <el-divider>插槽</el-divider>
    <els-elem :elem="test3">
      <template v-slot:test="{text}">
        <span>{{ text }}</span>
      </template>
    </els-elem>
    <el-divider>传递插槽</el-divider>
    <els-elem :elem="test4"></els-elem>
    <el-divider>事件绑定</el-divider>
    <els-elem :elem="test5"></els-elem>
    <el-divider>获取组件或者元素实例</el-divider>
    <els-elem :elem="test6"></els-elem>
    <el-divider>直接渲染测试 [ ElTabPanel 必须通过直接渲染才能成功渲染组件 ]</el-divider>
    <els-elem :elem="testTabs"></els-elem>
  </div>
</template>

<script setup lang="ts">
import { ref, computed ,h} from "vue";
import { ElsElem, Elem } from "../index";
import {
  ElDivider,
  ElSwitch,
  ElButton,
  ElProgress,
  ElInput,
  ElTag,
ElTabPane,
ElTabs,
} from "element-plus";
import {toPlainObject,toString} from "lodash"
//
const bool = ref(false);
const percent = ref(0);
setInterval(() => {
  percent.value = Math.round(Math.random() * 10000) / 100;
}, 1000);
//
const test1: Elem = {
  cls: [
    "3 + 4 = ",
    "{{ 3 + 4}} ",
    { tag: "br" },
    { tag: "i", cls: "<i> i 标签 </i>" },
    { tag: "br" },
    {
      tag: "template",
      cls: " template 模板 请看 dom 树结构 1+2+3+4 = {{ 1 + 2 + 3 + 4 }}",
    },
  ],
};
const test2: Elem = {
  cls: [
    "要求：必须使用响应式属性 :: ",
    { tag: ElTag, type: "success", "v-if": bool, cls: "v-if = true" },
    {
      tag: ElTag,
      type: "danger",
      "v-if": computed(() => !bool.value),
      cls: "v-if = false",
    },
  ],
};
const text = ref("hello slot!");
const test3: Elem = {
  cls: [
    {
      tag: ElInput,
      ":modelValue": text,
      "@update:modelValue": ({ $ }: any) => {
        text.value = $[0];
      },
    },
    { tag: "slot", name: "test", ":text":text },
  ],
};
const test4: Elem = {
  cls: [
    {
      tag: ElProgress,
      ":percentage": percent,
      strokeWidth: 26,
      textInside: true,
      status: "success",
      cls: { tag: "i", "#default": "{ percentage }", cls: "{{ percentage }}%" },
    },
  ],
};
const num1 = ref(0);
const num2 = ref(0);
const subNum = ref();
const status = ref<boolean | null>(null);
const test5: Elem = {
  style: "display:flex;align-items:center;",
  cls: [
    {
      tag: ElButton,
      cls: "点我测试",
      type: "success",
      "@click": () => {
        num1.value = Math.round(Math.random() * 10);
        num2.value = Math.round(Math.random() * 10);
        status.value = null;
        subNum.value = undefined;
      },
    },
    {
      style: "width:200px;text-align:right;padding-right:4px;",
      cls: {
        "v-if": computed(() => num1.value + num2.value > 0),
        cls: [num1, " + ", num2, " = "],
      },
    },
    {
      tag: ElInput,
      ":modelValue": subNum,
      "@update:modelValue": ({ $ }: any) => {
        subNum.value = $[0];
      },
      "@change": ({ $ }: any) => {
        if (num1.value + num2.value > 0) {
          status.value = num1.value + num2.value == Number($[0]);
        }
      },
      cls: {
        tag: "template",
        "#suffix": "",
        cls: [
          {
            tag: ElTag,
            type: "success",
            "v-if": computed(() => status.value === true),
            cls: "✅",
          },
          {
            tag: ElTag,
            type: "danger",
            "v-if": computed(() => status.value === false),
            cls: "❌",
          },
        ],
      },
    },
  ],
};

const inputRef = ref();
const test6:Elem = {
  cls:[
    { tag:ElInput,ref:(el:any) => inputRef.value = el,},
    {cls:computed(() => "" + JSON.stringify(toPlainObject(inputRef.value)))}
  ]
}


const testTabs:Elem = {tag:ElTabs,type:"border-card",modelValue:"A",cls:[
    {tag:ElTabPane,isDirectRender:true,name:"A",label:"A",cls:"AAAA"},
    {tag:ElTabPane,isDirectRender:true,name:"B",label:"B",cls:"BBBB"},
    {tag:ElTabPane,isDirectRender:true,name:"C",label:"C",cls:"CCCC"},
    {tag:ElTabPane,isDirectRender:true,name:"D",label:"D",cls:"DDDD"},
  ]}
</script>
