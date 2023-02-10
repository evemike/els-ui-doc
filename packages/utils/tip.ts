// 提示
import { ElMessage, MessageParams, ElMessageBox,ElAlert,ElPopover ,ElButton} from "element-plus";
import { AppContext, VNode } from "vue";
import {InfoFilled} from "@element-plus/icons-vue"

/* 顶部浮出框提示 自动消失 */
export const tipBase = (option?: MessageParams, appContext?: AppContext) => {
  ElMessage(option, appContext);
};
//
export const tipSuccess = (
  tipText: string | VNode,
  appContext?: AppContext
) => {
  const options: MessageParams = {
    message: tipText,
    type: "success",
  };
  tipBase(options, appContext);
};

export const tipWarning = (
  tipText: string | VNode,
  appContext?: AppContext
) => {
  const options: MessageParams = {
    message: tipText,
    type: "warning",
  };
  tipBase(options, appContext);
};

export const tipInfo = (tipText: string | VNode, appContext?: AppContext) => {
  const options: MessageParams = {
    message: tipText,
    type: "info",
  };
  tipBase(options, appContext);
};

export const tipError = (tipText: string | VNode, appContext?: AppContext) => {
  const options: MessageParams = {
    message: tipText,
    type: "error",
  };
  tipBase(options, appContext);
};

// const TIP_TEXT_LIB = {
//   add: "新增",
//   edit: "编辑",
//   delete: "删除",
//   other: "操作",
// };
// const TIP_TYPE_TEXT = {success:'成功',warning:'警告',info:'提示',error:'失败'}
// export const tip = (
//   tipName: "add" | "edit" | "delete" | "other" = "other",
//   type: "success" | "warning" | "info" | "error" = "success",
//   tipText?: string | VNode
// ) => {
//   const message = tipText ?? TIP_TEXT_LIB[tipName];
//   tipBase({ message, type });
// };
const TIP_TEXT_LIB:Record<string,string> = {add:'新增',edit:'编辑',delete:'删除',other:'操作',validate:'表单验证'}
const TIP_TYPE_TEXT = {success:'成功',warning:'警告',info:'提示',error:'失败'}
export const tip = (tipName: keyof typeof TIP_TEXT_LIB | string = 'other', type: keyof typeof TIP_TYPE_TEXT = 'success', tipText?: string | VNode) => {
    const message = tipText ?? (Object.keys(TIP_TEXT_LIB).includes(tipName) ? TIP_TEXT_LIB[tipName] : tipName) ;
    tipBase({message,type})
}

const CONFIRM_TEXT_LIB = <const> { delete: "是否删除数据 : " };
export const confirm = (
  info = "",
  tip: keyof typeof CONFIRM_TEXT_LIB | string = "delete",
  type: keyof typeof TIP_TYPE_TEXT = "warning",
  title = ""
) => {
  return ElMessageBox.confirm(
    `${
      Object.keys(CONFIRM_TEXT_LIB).includes(tip) ? (CONFIRM_TEXT_LIB as any)[tip] : tip
    } ${info} ?`,
    title || TIP_TYPE_TEXT[type],
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  );
};

export const elemTip: (
  info: string | Record<string, any>
) => Record<string, any> = (info) => {
  let infoElem = [];
  if (typeof info === "string") {
    infoElem = info
      .split("/br")
      .map((s) => ({ tag: ElAlert, closable: false, type: "info", title: s }));
  } else {
    infoElem = [info];
  }
  return {
    tag: ElPopover,
    class: "els-form--tip-popover",
    popperClass: "els-form--tip-popover-popper",
    trigger: "hover",
    placement: "top",
    width: "auto",
    cls: [
      {
        tag: ElButton,
        slot: "reference",
        class: "els-form--tip-button",
        link:true,
        icon: InfoFilled,
      },
      ...infoElem,
    ],
  };
};
