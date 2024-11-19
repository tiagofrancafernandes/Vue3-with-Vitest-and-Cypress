import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import env from './src/environments/env';

import { fileURLToPath, URL } from 'node:url';
import dotenv from 'dotenv';

dotenv.config({
    path: fileURLToPath(new URL('./.env', import.meta.url)),
    encoding: 'utf8',
    debug: true,
    override: true,
});

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.

    const allowedEnvs = [
        'APP_ENV',
        'API_BASE_URI',
    ];

    let loadedEnv = Object.fromEntries(
        Object.entries(loadEnv(mode, process.cwd(), '')).filter(
            i => i[0] && (`${i[0]}`.startsWith('VITE_') || allowedEnvs.includes(i[0]))
        )
    );

    globalThis._env = loadedEnv;
    globalThis.env = env;
    return {
        // vite config
        define: {
            __APP_ENV__: JSON.stringify(loadedEnv.APP_ENV),
            __API_BASE_URI__: JSON.stringify(loadedEnv.API_BASE_URI),
            _env: loadedEnv,
            env: `${env}`,
        },
        plugins: [vue(), vueDevTools()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    };
});
