const n=`<template>
  <div>
    <div>
      <div style="display: flex; align-items: center">
        \u662F\u5426\u53EF\u7F16\u8F91\uFF1A<el-switch v-model="isEdit"></el-switch>
        <el-divider direction="vertical"></el-divider>

        \u6A21\u5F0F\uFF1A
        <el-radio-group v-model="mode">
          <el-radio-button label="text"></el-radio-button>
          <el-radio-button label="box"></el-radio-button>
          <el-radio-button label="border"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top:8px;">
        <el-input
          v-if="!isEdit"
          @keydown="(e:any) => handleChange(e)"
        ></el-input>
      </div>
    </div>
    <el-divider></el-divider>
    <els-exp-box
      :is-edit="isEdit"
      :mode="mode"
      v-model="value"
      @init="handleInit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  ElSwitch,
  ElRadioGroup,
  ElRadioButton,
  ElInput,
  ElDivider,
} from "element-plus";
import { ElsExpBox } from "../index";
const isEdit = ref(true);
const value = ref("");
const mode = ref<"text" | "box" | "border">("text");
let input: any = undefined;
const handleInit = (params: any) => {
  input = params.input;
};
const handleChange = (e: KeyboardEvent) => {
  const v = e.key;
  input && input(v);
};
<\/script>
`;export{n as default};
