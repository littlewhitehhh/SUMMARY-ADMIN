import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// 添加unocss样式
import 'virtual:uno.css';

// 引入router
import router from './router';

// 引入pinia
import pinia from './store';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

createApp(App).use(ElementPlus).use(router).use(pinia).mount('#app');
