const e=`<template>
  <div>
    <el-divider>\u5B57\u7B26\u4E32\u63D2\u503C\u548C\u666E\u901A\u5143\u7D20</el-divider>
    <els-elem :elem="test1"></els-elem>
    <el-divider>
      v-if \u6307\u4EE4
      <el-switch v-model="bool"></el-switch>
    </el-divider>
    <els-elem :elem="test2"></els-elem>
    <el-divider>\u63D2\u69FD</el-divider>
    <els-elem :elem="test3">
      <template v-slot:test="{text}">
        <span>{{ text }}</span>
      </template>
    </els-elem>
    <el-divider>\u4F20\u9012\u63D2\u69FD</el-divider>
    <els-elem :elem="test4"></els-elem>
    <el-divider>\u4E8B\u4EF6\u7ED1\u5B9A</el-divider>
    <els-elem :elem="test5"></els-elem>
    <el-divider>\u83B7\u53D6\u7EC4\u4EF6\u6216\u8005\u5143\u7D20\u5B9E\u4F8B</el-divider>
    <els-elem :elem="test6"></els-elem>
    <el-divider>\u76F4\u63A5\u6E32\u67D3\u6D4B\u8BD5 [ ElTabPanel \u5FC5\u987B\u901A\u8FC7\u76F4\u63A5\u6E32\u67D3\u624D\u80FD\u6210\u529F\u6E32\u67D3\u7EC4\u4EF6 ]</el-divider>
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
    { tag: "i", cls: "<i> i \u6807\u7B7E </i>" },
    { tag: "br" },
    {
      tag: "template",
      cls: " template \u6A21\u677F \u8BF7\u770B dom \u6811\u7ED3\u6784 1+2+3+4 = {{ 1 + 2 + 3 + 4 }}",
    },
  ],
};
const test2: Elem = {
  cls: [
    "\u8981\u6C42\uFF1A\u5FC5\u987B\u4F7F\u7528\u54CD\u5E94\u5F0F\u5C5E\u6027 :: ",
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
      cls: "\u70B9\u6211\u6D4B\u8BD5",
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
            cls: "\u2705",
          },
          {
            tag: ElTag,
            type: "danger",
            "v-if": computed(() => status.value === false),
            cls: "\u274C",
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
<\/script>
`;export{e as default};
