// api/auth

import { ifNumericOr, ifObjectOr, ifStringOr, isFilled, objectFilter, positiveNumberOr, isFunction } from '@/helpers/helpers';
import { baseURI, getURL, AuthToken } from '@/services/api-cfg';
import { defaults, mande } from 'mande'

const loadDefaults = () => {
    let token = AuthToken.getToken();

    if (token) {
        defaults.headers.Authorization = `Bearer ${token}`;
    }

    if (!token) {
        delete defaults.headers.Authorization;
    }
}

let authApiOptions = {};

const auth = () => {
    loadDefaults();

    return mande(getURL('/auth'), authApiOptions);
}

export async function devAutologin(params = {}) {
    params = ifObjectOr(params, {});

    let {thenFn} = params;
    loadDefaults();

    const autologinData = await mande(getURL('/dev-only'), {}).post('/dev-autologin');

    console.log('autologinData', autologinData);

    if (isFilled(autologinData?.token)) {
        AuthToken.setToken(autologinData?.token);
        globalThis?.Toast?.success(`Login efetivado com sucesso!`, 3000);
        globalThis?.Toast?.info(`Por favor, atualize a página`, 3500);
    }

    if (isFunction(thenFn)) {
        thenFn();
    }

    return autologinData;
}

export async function currentUserCheck() {
    const data = await auth().post('/me');

    console.log('data', data);

    return data;
}

const isLogged = () => {
    return isFilled(AuthToken.getToken());
}

async function checkLogged() {
    if (!isLogged()) {
        AuthToken.forgetToken();
        return;
    }
}

async function loggedIsValid() {
    if (!isLogged()) {
        AuthToken.forgetToken();
        return false;
    }

    try {
        let data = await auth().post('/me');
        return isFilled((data || {})?.email);
    } catch (error) {
        AuthToken.forgetToken();
        return false;
    }
}

async function refreshAuthToken() {
    await loggedIsValid();

    return await devAutologin()
}

const AuthService = {
    devAutologin,
    currentUserCheck,
    isLogged,
    checkLogged,
    loggedIsValid,
    refreshAuthToken,
}

export default AuthService
