import type {
  Component,
  CSSProperties,
  VNode,
  Fragment,
  Teleport,
  Suspense,
  KeepAlive,
  Transition,
  TransitionGroup,
  SetupContext,
  FunctionalComponent,

} from "vue";
import { TOA, TOR, TORA } from "../../../utils/intf";

export type ElemChild =
  | string
  | boolean
  | number
  | VNode
  | Elem
  | ((
      scope: Record<string, any>,
      slotScope: any,
      elemScope: ElsElemScope
    ) => string | VNode | undefined);

export type ElemStaticTag =
  | keyof HTMLElementTagNameMap
  | "slot"
  | "template"
  | "component"
  | Component
  | InstanceType<typeof Fragment>
  | InstanceType<typeof Teleport>
  | InstanceType<typeof Suspense> 
  | InstanceType<typeof KeepAlive> 
  | FunctionalComponent
  | InstanceType<typeof TransitionGroup> 

export type ElemFunctionTag = (
  props: ElsElemProps,
  ctx: SetupContext
) => ElemStaticTag;

export type ElemTag = ElemStaticTag | ElemFunctionTag;

export type SetupFunction = (
  props: ElsElemProps,
  params: { tag: ElemStaticTag; tagname: string; isHtml: boolean },
  ctx: SetupContext
) =>
  | (Record<string, any> & {
      prop?: Record<string, any>;
      render?: RenderFunction | Record<string, RenderFunction>;
      beforeRender?: (scope: ElsElemScope) => void;
      excludeKeys?: string[];
    })
  | void;

export interface RenderFunctionParams {
  tag: ElemTag;
  tagname: string;
  isHtml: boolean;
  props: any;
  children: Record<string, (p?: any) => TOA<string | VNode> | undefined>;
  elem: Elem;
  context: Context;
  slots: any;
  parent: ElsElemProps["parent"];
  directives: Record<string, any>;
  setupRes: Record<string, any>;
}
export type RenderFunction = (
  config: RenderFunctionParams
) => TOA<string | VNode> | undefined;

export interface Elem extends Record<string, any> {
  tag?: TOR<ElemTag>;
  style?: TOR<string | CSSProperties>;
  contextKeys?: string[];
  excludeKeys?: string[];
  cls?: TORA<ElemChild>;
  children?: TORA<ElemChild>;
  setup?: SetupFunction;
  render?: RenderFunction;
  beforeRender?: (scope: ElsElemScope) => void;
  isDirectRender?: boolean;
}

// export type Elem<T = Record<string,any>> = DefaultElem & T;

export interface Context extends Record<string, any> {
  slots?: Record<string, RenderFunction>;
  tag?: Elem["tag"];
  contextKeys?: Elem["contextKeys"];
  excludeKeys?: Elem["excludeKeys"];
  setup?: SetupFunction;
  render?: RenderFunction | Record<string, RenderFunction>;
  beforeRender?: Elem["beforeRender"];
}

export interface ElsElemProps {
  elem: Elem;
  context: Context;
  parent?: Record<string, any> & {
    elem: Elem;
    setupRes: ReturnType<SetupFunction>;
    tagname: string;
  };
  params?: Record<string, any>;
  slotParams?: any;
  slots?: any;
}

export interface ElemAttrs {
  root: Partial<Elem>;
  directive: Partial<Elem>;
  prop: Partial<Elem>;
}

export interface ElsElemScope extends Record<string, any> {
  $tag: ElemTag;
  $tagname: string;
  $isHtml: boolean;
  $slots: any;
  $elem: Elem;
  $context: Context;
  $root: Record<string, any>;
  $prop: Record<string, any>;
  $directive: Record<string, any>;
  $params: Record<string, any>;
  $setupRes: ReturnType<SetupFunction>;
  $elemSetupRes: ReturnType<SetupFunction>;
  $ctxSetupRes: ReturnType<SetupFunction>;
  $parent: ElsElemProps["parent"];
}
