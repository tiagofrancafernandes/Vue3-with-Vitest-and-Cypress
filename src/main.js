import './assets/main.css';
import "toastify-js/src/toastify.css";

import Toast from '@/Libs/Toast'
import config from '@/helpers/config';
import env from '@/environments/env';

globalThis.Toast = Toast;
globalThis.toast = Toast;
globalThis.env = env;
globalThis.config = config;

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
