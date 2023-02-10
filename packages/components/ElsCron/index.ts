import { App, Plugin } from 'vue';
import ElsCron from './src/index.vue';

export const ElsCronPlugin: Plugin = {
  install(app: App) {
    app.component('els-cron', ElsCron);
  },
};

export {
  ElsCron,
};
