import { toRef ,useAttrs , computed ,unref,ref } from "vue"
import {ElsSvgSelectProps,ElsSvgSelectUIPluging} from "./inter"
import { Elem, Context } from "../../ElsElem";
import { ElSelectV2,ElIcon } from "element-plus"
import {ElsSvg} from "../../ElsSvg"
const useElComponent:ElsSvgSelectUIPluging = (props,cfg) => {
  const icons = toRef(props,"icons");
  const options = computed(() => unref(icons)?.map(v => ({value:typeof v === 'string' ? v : v.name,s:v})))

  const attrs = useAttrs();
  console.log(options)
  const elem:Elem = {
    ...attrs,
    tag:ElSelectV2,
    popperClass:cfg.popperClass,
    ":options":options,
    ":modelValue":cfg.value,
    "onUpdate:modelValue":(v:any) => {cfg.change(v)},
    cls:[
      {tag:"template","#prefix":true,cls:{tag:ElIcon,cls:{ElsSvg,":id":cfg.value}}},
      {tag:ElIcon,"#default":"{ item }",cls:{tag:ElsSvg,":id":"item.s"}}
    ]
  };
  const context:Context = {}

  //
  return {elem,context}
}

export default useElComponent;