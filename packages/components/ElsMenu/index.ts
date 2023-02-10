import { App, Plugin } from 'vue';
import ElsMenu from './src/index.vue';

export const ElsMenuPlugin: Plugin = {
  install(app: App) {
    app.component('els-menu', ElsMenu);
  },
};

export {
  ElsMenu,
};

export * from "./src/inter"
// export * from "./src/util"
