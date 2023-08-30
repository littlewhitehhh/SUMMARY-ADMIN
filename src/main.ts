import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// 添加unocss样式
import 'virtual:uno.css';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

createApp(App).use(ElementPlus).mount('#app');
