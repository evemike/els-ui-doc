import {} from "vue";
import {Router} from "vue-router"
import {RouterLocationRaw,MenuElem,ElsMenuProps} from "./inter"
import { getTempValue } from "../../../utils/regexp"
import {isArray} from "../../../utils/lodash"

// 跳转
const HTTP_REG = /^\s*http/
export const jump = (path:RouterLocationRaw,router:Router,cfg?:Record<string,any>) => {
  if(typeof path === 'string' && HTTP_REG.test(path)){
    window.open(path, cfg?.target || "_blank");
  }else{
    router?.push(path)
  }
}

// 解析模板并跳转
export const jumpFromTempalte = (path:RouterLocationRaw,ctx:Record<string,any>,router:Router,cfg?:Record<string,any>) => {
  jump(typeof path === "string" ? getTempValue(path,ctx): path ,router,cfg)
}

// menu
export const menuJump = (menu:MenuElem,router:Router) => {
  if(menu.handle){
    menu.handle(menu)
  }else if(menu.path){
    jump(menu.path,router,menu)
  }
}

// 默认的初始化 menuId 函数
export const initMenu:ElsMenuProps["initMenu"] = (route,menus) => {
  const {path,fullPath,name} = route
  let ms:MenuElem|MenuElem[] = menus;
  let ct = ms.length;
  while(isArray(ms) && ms.length > 0 && ct > 0){
    for(let i=0,l = ms.length;i < l;i++){
      const e:MenuElem = (ms as MenuElem[])[i]
      const p = e.path
      if(p){
        let bool = false;
        let tp:any = p;
        let tn = "";
        if(typeof p !== "string"){
          tp = (p as any).path || "";
          tn = (p as any).name || "";
        }
        bool = (name && name === tn) || path.includes(tp) || fullPath.includes(tp)
        if(bool){
          ms = e.children || e
          ct = isArray(ms) ? ms.length : 0;
          break;
        }
      }
      ct--;
    }
  }
  console.log(ms,menus)
  return !isArray(ms) ? String((ms as MenuElem).id) : ""
}