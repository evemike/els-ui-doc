const n=`<script setup lang="ts">
import { ref, reactive, shallowReactive } from "vue";
import { ElsForm } from "../index";
import { Elem } from "../../ElsElem";
import { ElButton, ElDivider } from "element-plus";
import {
  ElRadio,
  ElRadioGroup,
  ElInputNumber,
  ElCheckboxGroup,
  ElCheckbox,
  ElTabPane,
  ElTabs,
  ElSelect,
  ElOption,
} from "element-plus";
//
const column: Elem[] = shallowReactive([
  {
    tag: ElButton,
    cls: "\u70B9\u6211\u5220\u9664\u6700\u540E\u4E00\u4E2A\u8868\u5355\u5143\u7D20\u5E76\u4F9D\u636E autoClean \u5C5E\u6027\u6765\u51B3\u5B9A\u662F\u5426\u5220\u9664\u5BF9\u5E94\u5C5E\u6027\u503C\uFF0C\u4E0D\u8FC7\u6570\u7EC4\u503C\u65E0\u6CD5\u6E05\u9664\uFF01",
    type: "danger",
    "@click": () => {
      column.pop();
    },
  },
  { tag: ElDivider },
  { prop: "input.A", label: "INPUT A", value: "input.A" },
  { prop: "input.B.0", label: "INPUT B.0", value: "input.B.0" },
  { prop: "input.B.1", label: "INPUT B.1", value: "input.B.1" },
  { prop: "input.B.A", label: "INPUT B.A", value: "input.B.A" },
  { prop: "input.C.A", label: "INPUT C.A", value: "input.C.A" },
  { prop: "input.C.B.0.A", label: "INPUT C.B.0.A", value: "input.C.B.0.A" },

  {
    tag: ElTabs,
    type: "border-card",
    modelValue: "A",
    cls: [
      {
        tag: ElTabPane,
        name: "A",
        label: "A",
        isDirectRender: true,
        cls: [
          {
            tag: "div",
            prop: "input",
            cls: [
              { prop: "D", label: "INPUT D", value: "input.D" },
              {
                prop: "E.A.0.B",
                label: "INPUT E.A.0.B",
                value: "input.E.A.0.B",
              },
            ],
          },
        ],
      },
      {
        tag: ElTabPane,
        name: "B",
        label: "B",
        cls: "BBBB",
        isDirectRender: true,
      },
      {
        tag: ElTabPane,
        name: "C",
        label: "C",
        cls: "CCCC",
        isDirectRender: true,
      },
      {
        tag: ElTabPane,
        name: "D",
        label: "D",
        cls: "DDDD",
        isDirectRender: true,
      },
    ],
  },
]);
//
console.log("----------------------------", column);
const data = ref<Record<string, any>>({});
<\/script>

<template>
  <div style="display: flex; justify-content: space-between">
    <els-form
      style="width: 49%; max-height: calc(100vh - 300px); overflow: auto"
      v-model="data"
      :column="column"
    ></els-form>
    <el-divider direction="vertical" style="height: auto"></el-divider>
    <div style="width: 49%; max-height: calc(100vh - 300px); overflow: auto">
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </div>
</template>
`;export{n as default};
