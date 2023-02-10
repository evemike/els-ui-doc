import { App, Plugin } from 'vue';
import ElsTest from './src/index.vue';

export const ElsTestPlugin: Plugin = {
  install(app: App) {
    app.component('els-test', ElsTest);
  },
};

export {
  ElsTest,
};
