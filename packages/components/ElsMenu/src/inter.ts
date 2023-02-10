import { Component,Ref } from "vue";
import { Elem, Context } from "../../ElsElem";
import { Router ,RouteLocationNormalizedLoaded} from "vue-router";

export type RouterLocationRaw = Parameters<Router["push"]>[0];

// export type Menu = (Record<string,any> & {id?:string|number,title?:string,path:RouterLocationRaw,handle?:() => void,icon:string|Component})
export interface MenuElem extends Record<string, any> {
  id: string | number;
  title?: string;
  name?:string,
  path?: RouterLocationRaw;
  handle?: (menu?:MenuElem) => void;
  icon?: string | Component;
  type?:string
  children?:MenuElem[]
}

export interface ElsMenuProps {
  menus: MenuElem[];
  collapse:boolean;
  context: Record<string, any>; // 模板上下文集合
  initMenu: (
    route: RouteLocationNormalizedLoaded,
    menus: MenuElem[]
  ) => string;
  UIPluging:ElsMenuUIPlugin
}

export type ElsMenuUIPlugin = (props:Pick<ElsMenuProps,"menus"|"context"|"collapse">,cfg:ElsMenuUIPluginConfig) => {
  elem: Elem;
  context: Context;
  menuRef:Ref<any>
}

export interface ElsMenuUIPluginConfig {
  currentId:Ref<string|number>
  handleSelect:(menu:MenuElem) => void
}