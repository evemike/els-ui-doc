import { App, Plugin } from 'vue';
import ElsElem from './src/index';
export const ElsElemPlugin: Plugin = {
  install(app: App) {
    app.component('els-elem', ElsElem);
  },
};

export {
  ElsElem,
};

export * from "./src/inter"

export * from "./src/util"
