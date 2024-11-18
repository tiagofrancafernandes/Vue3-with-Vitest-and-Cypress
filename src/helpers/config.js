import env from '@/environments/env';
import { isString, isArray, generateKey, dataGet } from '@/helpers/helpers';

export const allConfigs = () => {
    return {
        app: {
            name: env('APP_NAME', 'Mude Click'),
            env: env('APP_ENV', 'production'),
        },
        backend: {
            base_uri: env('API_BASE_URI', 'http://localhost:8000/api'),
        }
    };
}

export const config = (key, defaultValue = null) => {
    return dataGet(allConfigs(), key, defaultValue);
}

export default config;
