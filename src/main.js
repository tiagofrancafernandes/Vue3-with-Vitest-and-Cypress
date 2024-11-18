import './assets/main.css';
import "toastify-js/src/toastify.css";

import Toast from '@/Libs/Toast'

globalThis.Toast = Toast;
globalThis.toast = Toast;

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
