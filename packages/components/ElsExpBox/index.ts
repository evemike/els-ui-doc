import { App, Plugin } from 'vue';
import ElsExpBox from './src/index.vue';

export const ElsExpBoxPlugin: Plugin = {
  install(app: App) {
    app.component('els-exp-box', ElsExpBox);
  },
};

export {
  ElsExpBox,
};
