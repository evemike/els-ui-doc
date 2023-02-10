import { App, Plugin } from 'vue';
import ElsSvgSelect from './src/index.vue';

export const ElsSvgSelectPlugin: Plugin = {
  install(app: App) {
    app.component('els-svg-select', ElsSvgSelect);
  },
};

export {
  ElsSvgSelect,
};
