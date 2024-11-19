import { ifStringOr } from '@/helpers/helpers';
import config from '@/helpers/config';

export const baseURI = (defaultValue = null) => {
    return config('backend.base_uri', defaultValue);
}

export const forgetToken = (prefix = 'mc') => {
    localStorage.removeItem(`${prefix}token`) || null;
}

export const getToken = (prefix = 'mc') => {
    return localStorage.getItem(`${prefix}token`) || null;
}

export const setToken = (value, prefix = 'mc') => {
    value = ifStringOr(value, null);

    if (!value) {
        forgetToken(prefix);
        return;
    }

    localStorage.setItem(`${prefix}token`, value);
}

export const AuthToken = {
    forgetToken,
    getToken,
    setToken,
}

export const ltrimSlash = (value) => {
    value = ifStringOr(value, '').trim();

    return value.replaceAll(/^(\/){1,}/ig, '');
}

export const getURL = (uri, baseUri = null) => {
    baseUri = baseUri || baseURI();

    uri = ifStringOr(uri);

    return [baseUri, uri].map(i => ltrimSlash(i)).filter(i => i).join('/');
}
