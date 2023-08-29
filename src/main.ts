import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import pkg from '../package.json';

console.log(pkg);

createApp(App).mount('#app');
