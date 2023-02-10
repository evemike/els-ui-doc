import { App, Plugin } from 'vue';
import ElsForm from './src/index.vue';

export const ElsFormPlugin: Plugin = {
  install(app: App) {
    app.component('els-form', ElsForm);
  },
};

export {
  ElsForm,
};


export * from "./src/inter"

export * as EPP_ElsForm from "./src/elementPlus"
