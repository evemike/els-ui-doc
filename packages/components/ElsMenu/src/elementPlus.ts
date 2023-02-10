import { useAttrs, ref ,toRef} from "vue";
import { ElsMenuUIPlugin, MenuElem } from "./inter";
import {
  Elem,
  ElemFunctionTag,
  SetupFunction,
} from "../../ElsElem";
import {ElsSvg} from "../../ElsSvg"
import {
  ElMenu,
  ElMenuItemGroup,
  ElSubMenu,
  ElMenuItem,
  ElIcon,
} from "element-plus";
import {camelCase} from "../../../utils/lodash"

type TypeElMenu = InstanceType<typeof ElMenu>;

const useElMenu: ElsMenuUIPlugin = (props, cfg) => {
  const attrs = useAttrs();
  const elMenuAttrs = attrs?.elMenu || {};
  const menus = toRef(props,"menus"); // tree
  const collapse = toRef(props,"collapse")
  //
  const currentId = cfg.currentId;
  //
  const tag: ElemFunctionTag = (props) => {
    const elem = props.elem || {};
    const type = elem.type || "item";
    switch (type) {
      case "group":
        return ElMenuItemGroup;
      case "sub":
        return ElSubMenu;
      case "item":
        return ElMenuItem;
    }
    return ElMenuItem;
  };
  //

  const elMenuRef = ref<TypeElMenu>();
  const elem = {
    ...elMenuAttrs,
    ref: (e: TypeElMenu) => (elMenuRef.value = e),
    ":collapse":collapse,
    ":defaultActive": currentId,
    tag: ElMenu,
    cls: menus,
  };
  //
  const setup: SetupFunction = (props, { tagname }) => {
    const name = camelCase(tagname)
    if (!["elMenuItem", "elSubMenu", "elMenuItemGroup"].includes(name)) {
      return {};
    }
    const elem = props.elem as MenuElem;
    const icon = elem?.icon;
    const title = elem.title || elem.label;
    const path = elem.path;
    const index: string = String(elem.id);
    const prop: Elem = { index };
    const tcls: Elem[] = [
      { tag: ElIcon, "v-if": icon != undefined, cls: { tag: ElsSvg,id:icon } },
      { tag: "span", cls: title },
    ];
    if (name === "elMenuItem") {
      prop.cls = tcls;
      prop["@click"] = () => cfg.handleSelect(elem);
    } else {
      prop.cls = {
        tag: "div",
        class:"_title-slot",
        "#title": true,
        cls: tcls,
      };
    }
    return {
      prop,
      excludeKeys: ["id", "type", "title", "icon", "path"],
      path,
    };
  };

  const context = {
    tag,
    setup,
  };

  return {
    elem,
    context,
    menuRef: elMenuRef,
  };
};

export default useElMenu;
