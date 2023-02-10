<script setup lang="ts">
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
    cls: "点我删除最后一个表单元素并依据 autoClean 属性来决定是否删除对应属性值，不过数组值无法清除！",
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
</script>

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
