<script setup lang="ts">
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
</script>

<template>
  <div style="display: flex">
    <!-- CRON 表达式组件|插件 -->
    <ElsCron
      v-model="data.cron"
      label="CRON 表达式生成器"
      :label-position="labelPosition"
      :required="required"
      :el-form-item="{ labelWidth: 300 }"
      :layout="layout"
      style="width: 50%"
      :key="layout.join(' ') + labelPosition + required"
    ></ElsCron>
    <!-- 分割线 -->
    <el-divider direction="vertical" style="height: auto"></el-divider>
    <!-- v-model 双向绑定 值展示 -->
    <div style="flex: 1">
      <div>
        <ElDivider> 选择 表单 布局 </ElDivider>
        <ElSelect v-model="layout" multiple style="width: 100%">
          <ElOption value="second" />
          <ElOption value="minute" />
          <ElOption value="hour" />
          <ElOption value="day" />
          <ElOption value="month" />
          <ElOption value="week" />
          <ElOption value="year" />
        </ElSelect>
        <ElDivider> 选择 label 位置 </ElDivider>
        <ElSelect v-model="labelPosition">
          <ElOption value="top" />
          <ElOption value="left" />
          <ElOption value="right" />
        </ElSelect>
        <ElDivider> 是否必填项 </ElDivider>
        <ElSwitch
          v-model="required"
          active-text="必填"
          inactive-text="选填"
        ></ElSwitch>
      </div>
      <ElDivider>当前 layout 布局 </ElDivider>
      <div>{{ layout }}</div>
      <ElDivider>v-model 值</ElDivider>
      <div style="height: 100%">{{ data.cron }}</div>
    </div>
  </div>
</template>
