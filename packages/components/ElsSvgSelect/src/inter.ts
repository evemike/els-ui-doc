
import type {Component,DefineComponent,Ref} from "vue"
import { Elem, Context } from "../../ElsElem";
//
export interface ElsSvgSelectProps {
  modelValue:string|string[]
  icons:(string|Component|DefineComponent)[]
  UIPluging:ElsSvgSelectUIPluging
}

export interface ElsSvgSelectUIPlugingConfig {
  value:Ref<ElsSvgSelectProps["modelValue"]>
  change:(val?:string|string[]) => void
  popperClass:string // 下拉框类名
}

export type ElsSvgSelectUIPluging = (props:Partial<ElsSvgSelectProps>,cfg:ElsSvgSelectUIPlugingConfig) => {
  elem: Elem;
  context: Context;
}