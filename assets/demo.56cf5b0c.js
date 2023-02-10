const e=`<script setup lang="ts">
import { ref } from "vue";
import ElsCron from "../src/index.vue";
import { TypeLayout } from "../../../ability/cron/index";
import { ElSelect, ElDivider, ElOption, ElSwitch } from "element-plus";
import { ElsForm } from "../../ElsForm/index";
//
const data = ref({ cron: "" });
const layout = ref<TypeLayout[]>([
  "second",
  "minute",
  "hour",
  "day",
  "month",
  "year",
  "week",
]);
const labelPosition = ref<"top" | "left" | "right">("top");
const required = ref(false);
<\/script>

<template>
  <div style="display: flex">
    <!-- CRON \u8868\u8FBE\u5F0F\u7EC4\u4EF6|\u63D2\u4EF6 -->
    <ElsCron
      v-model="data.cron"
      label="CRON \u8868\u8FBE\u5F0F\u751F\u6210\u5668"
      :label-position="labelPosition"
      :required="required"
      :el-form-item="{ labelWidth: 300 }"
      :layout="layout"
      style="width: 50%"
      :key="layout.join(' ') + labelPosition + required"
    ></ElsCron>
    <!-- \u5206\u5272\u7EBF -->
    <el-divider direction="vertical" style="height: auto"></el-divider>
    <!-- v-model \u53CC\u5411\u7ED1\u5B9A \u503C\u5C55\u793A -->
    <div style="flex: 1">
      <div>
        <ElDivider> \u9009\u62E9 \u8868\u5355 \u5E03\u5C40 </ElDivider>
        <ElSelect v-model="layout" multiple style="width: 100%">
          <ElOption value="second" />
          <ElOption value="minute" />
          <ElOption value="hour" />
          <ElOption value="day" />
          <ElOption value="month" />
          <ElOption value="week" />
          <ElOption value="year" />
        </ElSelect>
        <ElDivider> \u9009\u62E9 label \u4F4D\u7F6E </ElDivider>
        <ElSelect v-model="labelPosition">
          <ElOption value="top" />
          <ElOption value="left" />
          <ElOption value="right" />
        </ElSelect>
        <ElDivider> \u662F\u5426\u5FC5\u586B\u9879 </ElDivider>
        <ElSwitch
          v-model="required"
          active-text="\u5FC5\u586B"
          inactive-text="\u9009\u586B"
        ></ElSwitch>
      </div>
      <ElDivider>\u5F53\u524D layout \u5E03\u5C40 </ElDivider>
      <div>{{ layout }}</div>
      <ElDivider>v-model \u503C</ElDivider>
      <div style="height: 100%">{{ data.cron }}</div>
    </div>
  </div>
</template>
`;export{e as default};
