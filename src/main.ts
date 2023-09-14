import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';

// css样式
import '@/style/reset.scss';
import '@/style/common.scss';

// iconfont scss
import '@/assets/iconfont/iconfont.scss';
// 添加unocss样式
// import 'virtual:uno.css';

// 引入router
import router from './router';

// 引入pinia
import pinia from './store';

// 全局引入
// import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

// element-plus icon svg
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(pinia).mount('#app');
