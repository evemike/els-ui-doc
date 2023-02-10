// @ts-check
// 树型数据公共方法 tree = []
import { cloneDeep, clone } from "./lodash";
// 遍历
export interface InterTreeConfig {
  isSource?: boolean;
  sourceChildren?: string;
  children?: string;
  key?: string;
}

export type TreeCallFn<T> = (
  node: T,
  list: T[],
  i: number,
  pNode?: T,
  pi?: number
) => void | boolean;

// 遍历所有元素
export const treeMap = <T extends Record<string, any>>(
  tree: T[] = [],
  fn: TreeCallFn<T> = () => undefined,
  cfg: InterTreeConfig = {}
): T[] => {
  const isSource = cfg.isSource || false;
  const s = isSource ? tree : cloneDeep<T[]>(tree);
  const ck = cfg.children || "children";
  // 节点遍历方法 深度优先遍历
  const f = (list: T[], pn?: T, ins?: number) => {
    const tl = clone(list);
    for (let i = 0, l = tl.length; i < l; i++) {
      const n = tl[i];
      if (n) {
        const res = fn(n, list, i, pn, ins);
        if (res === false) {
          break;
        }
        const c = n[ck];
        if (c && c.length > 0) {
          f(c, n, i);
        }
      }
    }
  };
  f(s, undefined, undefined);
  return s;
};
// 仅遍历父元素的 children ,可用于排序
// export const treeMapList = <T extends Record<string,any>>(tree:T[] = [], fn:TreeCallFn<T> = () => undefined, cfg:InterTreeConfig = {}):T[] => {
//   const isSource = cfg.isSource || false;
//   const s = isSource ? tree : cloneDeep<T[]>(tree);
//   const ck = cfg.children || 'children';
//   const f = (list:T[], pn:T, ins:number) => {
//     const tl = clone(list)
//     for(let i=0,l = tl.length; i < l;i++){
//       const n = tl[i];
//       if(n){
//         const res = fn(n,list,i,pn,ins)
//         if(res === false){break;}
//         const c = n[ck]
//         if(c && c.length > 0){
//           f(c,n,i)
//         }
//       }
//     }
//   }
//   f(s, undefined, undefined)
//   return s;
// }
// 将 tree 转换为对象 依据关键字段
export const treeToObject = <T extends Record<string, any>>(
  tree: T[],
  cfg: InterTreeConfig = {}
) => {
  const res: Record<string, T> = {};
  const k = cfg.key || "id";
  const f: TreeCallFn<T> = (n) => {
    if (n && n[k]) {
      res[n[k]] = n;
    }
  };
  treeMap<T>(tree, f, cfg);
  return res;
};
// 过滤 fn()
export const treeFilter = <T extends Record<string, any>>(
  tree: T[] = [],
  fn: (...args: Parameters<TreeCallFn<T>>) => boolean,
  cfg: InterTreeConfig = {}
) => {
  const ck = cfg.children || "children";
  const f: TreeCallFn<T> = (n, l, i, pn, ins) => {
    const bool = fn(n, l, i, pn, ins);
    if (!bool) {
      const it = l.indexOf(n);
      l.splice(it, 1);
      if (pn && pn[ck] && pn[ck].length == 0) {
        delete pn[ck];
      }
    }
  };
  return treeMap<T>(tree, f, cfg);
};
// 节点排序
export const treeSort = <T extends Record<string, any>>(
  tree: T[] = [],
  fn:(a: any, b: any) => number,
  cfg: InterTreeConfig = {}
) => {
  const f: TreeCallFn<T> = (n, l, i, pn, ins) => {
    l.sort(fn);
  };
  return treeMap<T>(tree, f, cfg);
};
// 移动节点位置 id : 目标节点 id ,pid : 新的父节点id ，index: 新的位置
export const treeNodeMove = <T extends Record<string, any>>(
  tree: T[],
  id: string,
  pid: string,
  index: number,
  cfg: InterTreeConfig = {},
  fc?: (node: T, snode?: T, tnode?: T, si?: number) => void
) => {
  const k = cfg.key || "id";
  const ck = cfg.children || "children";
  let node: T | undefined;
  let si: number | undefined;
  let snode: T[] | undefined;
  let tnode: T[] | T | undefined;
  let target: T | undefined;
  let pnode: T | undefined;
  const f: TreeCallFn<T> = (n, l, i, pn) => {
    if (n[k] == id) {
      node = n;
      snode = l;
      si = i;
      pnode = pn;
    }
    if (n[k] == pid) {
      tnode = n[ck] || n;
      target = n;
    }
  };
  const res = treeMap(tree, f, cfg);
  tnode = tnode ?? res;
  //
  if (fc && node) {
    fc(node, pnode, target, si);
  }
  //
  if (node != undefined) {
    if (snode) {
      (snode as any).splice(si, 1);
    }
    if (tnode) {
      Array.isArray(tnode)
        ? tnode.splice(index, 0, node)
        : ((tnode[ck] as any) = [node]);
    }
  }
  // console.log('id=',id,'::pid=',pid,'::snode=',snode,'::tnode=',tnode,'::node=',node,'::si=',si,'::res = ',JSON.stringify(res))
  return res;
};
// 新增节点 指定父节点，指定位置 插入多个节点，如果不指定位置，则默认插入到末尾
export const treeAdd = <T extends Record<string, any>>(
  tree: T[] = [],
  fn: (pNode: T) => [T[], number] | undefined,
  cfg: InterTreeConfig = {}
) => {
  const ck = cfg.children || "children";
  const f: TreeCallFn<T> = (n, l, i, pn, ins) => {
    if (pn) {
      const [ns, index = l.length] = fn(pn) || [];
      if (ns) {
        l.splice(index, 0, ...ns);
        return false;
      }
    }
  };
  return treeMap<T>(tree, f, cfg);
};
// 指定父节点，指定位置 插入一个节点 如果不指定位置，则默认插入到末尾
export const treeAddOne = <T extends Record<string, any>>(
  tree: T[] = [],
  fn: (pNode: T) => [T, number] | undefined,
  cfg: InterTreeConfig = {}
) => {
  const ck = cfg.children || "children";
  const f: TreeCallFn<T> = (n, l) => {
    const [node, index = l.length] = fn(n) || [];
    if (node) {
      if (!n[ck]) {
        (n[ck] as any) = [];
      }
      n[ck].splice(index, 0, node);
      return false;
    }
  };
  return treeMap<T>(tree, f, cfg);
};
// 依据方法查找 节点，当
export const treeFind = <T extends Record<string, any>>(
  tree: T[],
  fn: (node: T) => boolean,
  cfg: InterTreeConfig = {}
): T | undefined => {
  let node: T | undefined;
  const f: TreeCallFn<T> = (n) => {
    if (fn(n)) {
      node = n;
      return false;
    }
  };
  treeMap(tree, f, cfg);
  return node;
};
// 删除节点 依据节点 id 或者其他唯一值
export const treeDelete = <T extends Record<string, any>>(
  tree: T[] = [],
  list: any[] = [],
  cfg: InterTreeConfig = {}
) => {
  const k = cfg.key || "id";
  //
  const f: (...args: Parameters<TreeCallFn<T>>) => boolean = (n) =>
    !list.includes(n[k]);
  return treeFilter<T>(tree, f, cfg);
};

export const treeDeleteOne = <T extends Record<string, any>>(
  tree: T[] = [],
  key: any,
  cfg: InterTreeConfig = {}
) => {
  const k = cfg.key || "id";
  //
  let res: T | undefined;
  //
  const f: (...args: Parameters<TreeCallFn<T>>) => boolean = (n, list, i) => {
    if (n[k] == key) {
      list.splice(i, 1);
      res = n;
      return false;
    }
    return true;
  };
  treeMap(tree, f, cfg);
  return res;
};
// 生成一棵树上所有的路径 返回一个二维数组 [[目标节点,路径节点...]...] 路径节点集合不包含目标节点
export const treeAllPath = <T extends Record<string, any>>(
  tree: T[] = [],
  cfg: InterTreeConfig = {}
) => {
  const paths: T[][] = [];
  let s: T[] = [];
  //
  const f: TreeCallFn<T> = (n, l, i, pn, ins) => {
    if (pn) {
      const pi = s.indexOf(pn);
      const len = s.length;
      if (pi == -1) {
        s.push(pn);
      } else if (pi < len - 1) {
        let ct = len - 1 - pi;
        while (ct-- > 0) {
          s.pop();
        }
      }
    } else {
      s = [];
    }
    paths.push([n, ...s]);
  };
  treeMap<T>(tree, f, cfg);
  return paths;
};
// 叶节点和其路径提取 leaf 数据结构 [叶节点,父节点集合]
export const treeLeafs = <T extends Record<string, any>>(
  tree: T[] = [],
  cfg: InterTreeConfig = {}
) => {
  // const leafs = [];
  const ck = cfg.children || "children";
  const paths = treeAllPath<T>(tree, cfg);
  return paths.filter((items) => !items[0][ck] || items[0][ck].length == 0);
};
// 查找节点，返回节点路径 list 是目标节点 id 集合 返回一个二维数组 [[目标节点,路径节点...]...]
export const treeFindPath = <T extends Record<string, any>>(
  tree: T[] = [],
  list: any[] = [],
  cfg: InterTreeConfig = {}
) => {
  const k = cfg.key || "id";
  const paths = treeAllPath<T>(tree, cfg);
  return paths.filter((item) => list.includes(item[0][k]));
};
// 重置树节点属性,包括 children 的名称都可以改，返回一颗新的树,保持该树的结构不变 并且当返回值为 undefined 时，删除该节点。。。
export const treeReset = <T extends Record<string, any>>(
  tree: T[] = [],
  fn: (...args: Parameters<TreeCallFn<T>>) => undefined | Record<string, any>,
  cfg: InterTreeConfig = {}
) => {
  // menus 真实 children Name
  const csk = cfg.sourceChildren || cfg.children || "children";
  const ctk = cfg.children || "children";
  const f: TreeCallFn<T> = (n, l, i, pn, ins) => {
    const o = fn(n, l, i, pn, ins);
    if (o == n && n != undefined) {
      return;
    }
    if (o == undefined) {
      l.splice(l.indexOf(n), 1);
      return;
    }
    const c = n[csk];
    const ks = Object.keys(n);
    ks.forEach((k) => delete n[k]); // 清除原对象所有数据
    const oks = Object.keys(o);
    oks.forEach((k) => ((n as Record<string, any>)[k] = o[k])); // 重新设置原对象属性
    if (!o[ctk] && c && c.length > 0) {
      (n as Record<string, any>)[ctk] = c; // 重新设定原对象 children 属性
    }
  };
  return treeMap<T>(tree, f, cfg);
};
