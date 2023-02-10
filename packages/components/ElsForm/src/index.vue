<template>
  <div class="els-form">
    <els-elem :elem="formUI.elem" :context="formUI.context"></els-elem>
  </div>
</template>

<script lang="ts">
export default {
  name: "ElsForm",
};
</script>

<script lang="ts" setup>
import {
  useSlots,
  watch,
  onMounted,
  unref,
  ref,
  toRef,
  reactive,
  onBeforeUnmount,
} from "vue";
import { ElsFormProps, ElsFormUIPluginConfig } from "./inter";
import useFormPluging from "./elementPlus";
import { ElsElem } from "../../ElsElem";
import { difference, unset, get, set } from "../../../utils/lodash";

interface Props {
  modelValue: ElsFormProps["modelValue"];
  column: ElsFormProps["column"];
  size?: ElsFormProps["size"];
  UIPluging?: ElsFormProps["UIPluging"];
  autoClean?: ElsFormProps["autoClean"];
}

const emits = defineEmits<{
  (e: "update:modelValue", v: Record<string, any>): void;
  (e: "change", name: string, value: any): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  size: "small",
  autoClean: true,
});
//
const slots = useSlots();
//
const formData = ref<Record<string, any>>({});
if(unref(props.modelValue)){
  formData.value = unref(props.modelValue)
}
//
const emitChange = (prop: string, val: any) => {
  emits("change", prop, val);
  emits("update:modelValue", unref(formData));
};
onMounted(() => {
  emits("update:modelValue", unref(formData));
});
watch(toRef(props, "modelValue"), (v) => {
  formData.value = v;
});
const formProps = reactive<Set<string>>(new Set<string>());
const UIConfig: ElsFormUIPluginConfig = { formProps, formData, emitChange };
//
const pluging = props.UIPluging || useFormPluging;
//
const formUI = pluging(props, UIConfig, { slots });
// 当 column 变化时，清除掉 已经删除的对应属性值
if (props.autoClean) {
  let formPropsCache: string[] = [];
  onMounted(() => {
    formPropsCache = Array.from(formProps);
  });
  // 避免在全局刷新时大量元素 unmounted 导致重复响应
  onBeforeUnmount(() => {
    formPropsCache = [];
    formProps.clear();
  });
  //
  watch(formProps, (v) => {
    const arr = Array.from(v);
    const da = difference(formPropsCache, arr);
    if (da.length > 0) {
      da.forEach((p) => unset(unref(formData), p));
      formPropsCache = arr;
      emits("update:modelValue", unref(formData));
    }
  });
}
// 提交 调用 validate 方法 并返回处理的值
const submit = async (
  call: (k: string, v: any) => undefined | [string, any] = (
    k: string,
    v: any
  ) => (v == undefined ? undefined : [k, v])
) => {
  try {
    await formUI.validate();
  } catch (e) {
    console.error("表单校验失败！====>", e);
  }
  const res: Record<string, any> = {};
  for (const k in formProps) {
    const v = get(unref(formData), k);
    const r = call(k, v);
    if (r != undefined) {
      const [key, val] = r;
      set(res, key, val);
    }
  }
  return res;
};
//
defineExpose({ ...formUI, formProps, submit });
</script>

<style lang="scss">
.els-form {
  .is-block {
    display: block;
  }
  .is-inline {
    display: inline-block;
  }
  .is-flex {
    display: flex;
  }
  .is-inline-flex {
    display: inline-flex;
  }
  .w-50 {
    width: 50%;
  }
  .w-30 {
    width: 30%;
  }
  .w-25 {
    width: 25%;
  }
  .w-20 {
    width: 20%;
  }
}
</style>
