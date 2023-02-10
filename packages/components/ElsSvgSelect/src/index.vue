<template>
  <div class="els-svg-select">
    <els-elem :elem="elem" :context="context" />
  </div>
</template>

<script lang="ts">
export default {
  name:"ElsSvgSelect"
}
</script>

<script lang="ts" setup>
import {ref,unref} from "vue"
import { ElsSvgSelectProps } from "./inter"
import { ElsElem } from "../../ElsElem";
import useElComponent from "./elementPlus"

interface Props {
  modelValue?:ElsSvgSelectProps["modelValue"]
  icons?:ElsSvgSelectProps["icons"]
  UIPluging?:ElsSvgSelectProps["UIPluging"]
}
//
const props = withDefaults(defineProps<Props>(),{
  modelValue:undefined,
  icons:() => []
})
//
const emits = defineEmits<{
  (e:"update:modelValue",v:string|string[]):void
}>()

//
const value = ref(unref(props.modelValue));
const change = (v?:string|string[]) => {
  if(v != undefined){
    value.value = v;
  }
  emits("update:modelValue",unref(value))
}
const pluging = props.UIPluging || useElComponent
//
const {elem,context} = pluging(props,{value,change,popperClass:"els-svg-select--popper"})
</script>

<style scoped lang="scss">
.els-svg-select {
  
}
</style>

<style lang="scss">
.els-svg-select--popper{
  li {
    
  }
}
</style>