<script lang="ts">
export default {
  name: "els-cron",
};
</script>

<script lang="ts" setup>
import { watch, toRefs, unref, ref, onMounted } from "vue";
import { ElInput, ElFormItem, ComponentSize, ElForm } from "element-plus";
import { ElsForm } from "../../ElsForm/index";
import cronAbility, { TypeLayout } from "../../../ability/cron/index";

interface Props {
  modelValue: string;
  layout?: TypeLayout[];
  elFormItem?: Record<string, any>;
  label?: string;
  prop?: string;
  required?: boolean;
  rules?: any[];
  error?: string;
  showMessage?: boolean;
  inlineMessage?: boolean;
  disabled?: boolean;
  noInput?: boolean;
  size?: ComponentSize;
  labelPosition?:"left"|"right"|"top";
}

const emits = defineEmits<{
  (e: "update:modelValue", d: any): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  elFormItem: () => ({}),
  showMessage: true,
  inlineMessage: true,
  labelPosition:'top',
  rules: () => [],
  layout: () => ['second','minute','hour','day','month','year','week'],
});
//
const {
  modelValue,
  layout,
  rules,
  showMessage,
  size,
  noInput,
  disabled,
  labelPosition
} = toRefs(props);
//
const {label,required,elFormItem,inlineMessage,error} = props;
//
const text = ref(unref(modelValue) ?? "");
let isChange = true;
//
const { cronData, cronText, column, validator } = cronAbility(
  text.value,
  layout?.value
);


// 添加自定义的 rules
const formRules = [
  ...unref(rules),
  {
    validator: (field: any, v = unref(text), cb: any) => {
      if (!v) {
        cb();
        return;
      }
      const msg = validator(v);
      msg ? cb(msg) : cb();
    },
  },
];

const elFormItemProps = {
  label,
  required,
  inlineMessage,
  error,
  ...elFormItem,
  rules:formRules,
  prop:"text",
}
//
watch(modelValue, (v) => {
  if (v != text.value) {
    text.value = v;
  }
});
watch(text, (v) => {
  if (!isChange) {
    isChange = true;
    return;
  }
  if (validator(v) != "") {
    return;
  }
  const t = v.trim();
  if (v != cronText.value) {
    cronText.value = t;
  }
  if (t !== text.value) {
    isChange = false;
    text.value = t;
  }
  if (v != modelValue.value) {
    emits("update:modelValue", t);
  }
});
watch(cronText, (v) => {
  if (v !== text.value) {
    text.value = v;
  }
});

// 初始化 text
onMounted(() => {
  if (!unref(text)) {
    text.value = cronText.value;
  }
});
//
</script>

<template>
  <div class="els-cron" >
    <div class="el-form-input" :class="[{'has-message':showMessage,'is-top':labelPosition == 'top'}]" v-if="!noInput">
      <template v-if="showMessage">
        <el-form :model="{ text }" :size="size" :label-position="labelPosition">
          <ElFormItem v-bind="elFormItemProps" >
            <el-input
              v-model="text"
              :disabled="disabled"
            ></el-input>
          </ElFormItem>
        </el-form>
      </template>
      <template v-else>
        <el-input
          v-model="text"
          :size="size"
          :disabled="disabled"
        ></el-input>
      </template>
    </div>

    <div class="els-cron-expl" >
      <els-form
        v-model="cronData"
        :column="column"
        size="small"
        :disabled="disabled"
      ></els-form>
    </div>
  </div>
</template>

<style lang="scss">
.els-cron {
  height: 100%;
  min-height: 200px;
  > .el-form-input {
    height: 48px;
    margin: 0;
    display: block;
    &.has-message{
      height:64px;
      &.is-top{
        height:88px;
      }
    }
  }
  > .els-cron-expl {
    min-height: 200px;
    height: calc(100% - 60px);
    ._radio-item {
      display: flex;
      height: auto;
      padding: 8px;
      margin: 0;
      width: 100%;
      align-items: center;
      &._label-9 {
        align-items: baseline;
      }
      .el-radio__label {
        flex: 1;
        > div {
          margin: 0 8px;
        }
      }
      .el-select {
        width: 70px;
      }
    }
    ._item {
      .el-input-number {
        margin: 0 8px;
      }
    }
    ._checkbox-group {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, 50px);
    }
    .el-tabs__content {
      padding: 8px;
      .el-tab-pane {
        .el-form-item {
          display: block;
          margin: 0;
          padding: 0;
          .el-form-item__label {
            display: none;
          }
        }
      }
    }
  }
}
</style>
