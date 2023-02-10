<template>
  <div class="els-menu">
    <els-elem :elem="menuUI.elem" :context="menuUI.context"></els-elem>
  </div>
</template>



<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { ElsMenuProps, MenuElem } from "./inter";
import { ElsElem } from "../../ElsElem";
import { initMenu } from "./util";
//
import useElMenu from "./elementPlus"
//
interface Props {
  menus: ElsMenuProps["menus"];
  collapse?:ElsMenuProps["collapse"];
  context?: ElsMenuProps["context"];
  initMenu?: ElsMenuProps["initMenu"];
  UIPluging?: ElsMenuProps["UIPluging"];
}
//
const emits = defineEmits<{
  (
    e: "init-menu",
    router: Record<string, any>,
    menus: ElsMenuProps["menus"]
  ): void;
  (e: "change", menu: MenuElem): void;
  (e: "select", menu: MenuElem): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  collapse:false,
  menus:() => [],
  context:() => ({}),
});
// 当前激活 ID
const currentId = ref<string>("");
// 当刷新时重置当前 ID,如果有则调用自定义方法，如果没有自定义方法，默认依据 path 来匹配！并触发事件 :initMenuElem = (router,curreintMenuElem) => void
const route = useRoute();
const initMenuFun = props.initMenu || initMenu
if(route){
  currentId.value = initMenuFun(route, props.menus);
}
//
const handleSelect = (menu: MenuElem) => {
  emits("select",menu)
  if(currentId.value !== String(menu.id)){
    currentId.value = String(menu.id);
    emits("change",menu)
  }
};
//
const UIPluging = props.UIPluging || useElMenu;
//
const menuUI = UIPluging(props,{currentId,handleSelect})
//
defineExpose({...menuUI,currentId,handleSelect})
</script>

<style scoped lang="scss">
.els-menu {
}
</style>
