<script lang="ts">
export default {
  name: "svg-select",
};
</script>

<script setup lang="ts">
import { toRefs, computed } from "vue";
import { ElSelect, ElOption } from "element-plus";
import SvgIcon from "./main.vue";
//
import ids from "virtual:svg-icons-names";
interface Props {
  names?: string[];
  modelValue: any;
  color?: string;
}
const emits = defineEmits<{
  (e: "update:modelValue", payload: any): void;
}>();
const props = withDefaults(defineProps<Props>(), {
  color: "#333",
});
const { modelValue, names } = toRefs(props);

const icons = computed(() => (names ? names.value : ids));
</script>

<template>
  <el-select
    class="svg-select"
    popper-class="svg-select-popper"
    :model-value="modelValue"
    @change="(v) => emits('update:modelValue', v)"
  >
    <template #prefix>
      <svg-icon :id="modelValue" class="selected-svg-icon"></svg-icon>
    </template>
    <template v-for="id in icons" :key="id">
      <el-option :label="id" :value="id">
        <svg-icon :id="id" :color="props.color"></svg-icon>
      </el-option>
    </template>
  </el-select>
</template>

<style lang="scss">
.svg-select {
  width: 100%;
  .selected-svg-icon {
    width: 1em;
    height: 1em;
  }
}

.el-popper.svg-select-popper {
  max-width: 50%;
}
.el-select-dropdown.svg-select-popper {
  .el-scrollbar__view {
    display: grid;
    grid-template-columns: repeat(auto-fill, 48px);
    gap: 4px;
    width: 100%;
    margin: 0 !important;
    padding: 8px !important;
    .el-select-dropdown__item {
      padding: 8px;
      height: auto;
      line-height: 0;
      &.selected {
        box-shadow: 0 0 10px 0 #67c23a inset;
      }
    }
    svg {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
