import { App, Plugin } from 'vue';
import ElsSvg from './src/index.vue';

export const ElsSvgPlugin: Plugin = {
  install(app: App) {
    app.component('els-svg', ElsSvg);
  },
};

export {
  ElsSvg,
};
