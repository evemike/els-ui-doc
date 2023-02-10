import { ref, watch, unref, onMounted } from "vue";
import {
  validator,
  createCronData,
  createCronText,
  createElem,
  TypeLayout,
} from "./util";
export default function cronAbility(value?: string, layout?: TypeLayout[]) {
  const cronText = ref(value ?? "");
  const cronData = ref<Record<string, any>>({});
  let isMounted = false;
  let isChangeText = true;
  let cacheText = "0 0 0 * * ? *";
  //
  const tabElem = createElem(layout);
  const column = [tabElem];
  //
  const resetCronText = (v: string) => {
    cacheText = v;
    cronText.value = v;
  };
  // 初始化 cache 和 cronData
  if (value) {
    cacheText = value;
  } else {
    cronText.value = cacheText;
  }
  // 初始化 cron Data
  cronData.value = createCronData(cacheText);
  // 当表单数据变化时
  watch(
    cronData,
    () => {
      if (!isMounted || !isChangeText) {
        setTimeout(() => {
          isChangeText = true;
        }, 50);

        return;
      }
      const t = createCronText(cronData);
      if (t !== cacheText) {
        resetCronText(t);
      }
    },
    { deep: true }
  );

  // 当 text 数据变化时
  watch(cronText, (v) => {
    if (v != cacheText) {
      const d = createCronData(v);
      cacheText = v;
      isChangeText = false;
      cronData.value = d;
    }
  });
  onMounted(() => {
    isMounted = true;
  });
  //
  return { cronData, cronText, column, validator };
}

export * from "./util";
