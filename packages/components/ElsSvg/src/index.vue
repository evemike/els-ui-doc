<script lang="ts">
export default {
  name:"ElsSvg"
}
</script>

<script setup lang="ts">
import { toRefs  } from "vue";
import type { Component,DefineComponent } from "vue"
interface Props {
  id: DefineComponent | Component | string;
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {
  prefix: "icon",
  color: "",
});
//
const { id, color } = toRefs(props);
</script>

<template>
  <svg v-if="typeof id === 'string'" aria-hidden="true" class="svg-icon">
    <use :href="`#${id}`" :fill="color" />
  </svg>
  <template v-else>
    <component :is="id"></component>
  </template>
</template>