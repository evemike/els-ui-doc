/* eslint-disable */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from 'vue';

import { ElsElemPlugin } from './components/ElsElem';
import { ElsFormPlugin } from './components/ElsForm';
import { ElsExpBoxPlugin } from './components/ElsExpBox';
import { ElsPagePlugin } from './components/ElsPage';
import { ElsMenuPlugin } from './components/ElsMenu';
import { ElsSvgPlugin } from './components/ElsSvg';
import { ElsTestPlugin } from './components/ElsTest';
import { ElsCronPlugin } from './components/ElsCron';

const MYLibPlugin: Plugin = {
  install(app: App) {
    ElsElemPlugin.install?.(app);
    ElsFormPlugin.install?.(app);
    ElsExpBoxPlugin.install?.(app);
    ElsPagePlugin.install?.(app);
    ElsMenuPlugin.install?.(app);
    ElsSvgPlugin.install?.(app);
    ElsTestPlugin.install?.(app);
    ElsCronPlugin.install?.(app);
  },
};

export default MYLibPlugin;

export * from './components/ElsElem'
export * from './components/ElsForm'
export * from './components/ElsExpBox'
export * from './components/ElsPage'
export * from './components/ElsMenu'
export * from './components/ElsSvg'
export * from './components/ElsTest'
export * from './components/ElsCron'