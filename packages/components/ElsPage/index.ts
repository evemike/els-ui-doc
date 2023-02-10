import { App, Plugin } from 'vue';
import ElsPage from './src/index.vue';

export const ElsPagePlugin: Plugin = {
  install(app: App) {
    app.component('els-page', ElsPage);
  },
};

export {
  ElsPage,
};
