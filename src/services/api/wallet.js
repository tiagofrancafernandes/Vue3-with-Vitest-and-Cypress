// api/wallet

import { ifNumericOr, ifStringOr, objectFilter, positiveNumberOr } from '@/helpers/helpers';
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

let walletApiOptions = {};

const wallet = () => {
    loadDefaults();

    return mande(getURL('/wallet'), walletApiOptions);
}

export function getUserById(id) {
  return wallet().get(id)
}

export async function getBalance() {
    const data = await wallet().post('/balance');

    console.log('data', data);

    return data?.balance;
}

export async function creditAdd(
    packageCode,
    expiresInDays = null,
    credits = null,
) {
    packageCode = ifStringOr(packageCode);
    expiresInDays = positiveNumberOr(expiresInDays, null);
    credits = positiveNumberOr(credits, null);

    if (!packageCode) {
        return null;
    }

    let payload = objectFilter({
        package: packageCode,
        expires_in_days: expiresInDays ?? null,
        credits: credits ?? null,
    }, (val, key, i) => {
        console.log(val, key, i);
        return val || (val > 0);
    });

    const data = await wallet().post('/credit/add', payload);

    console.log('data', data);

    return data;
}

export async function creditSubtract(value) {
    value = positiveNumberOr(value, null);

    if (!value) {
        return null;
    }

    let payload = objectFilter({
        value,
    });

    const data = await wallet().post('/credit/subtract', payload);

    console.log('data', data);

    return data;
}

export function createUser(userData) {
  return wallet().post(userData)
}

const WalletService = {
    creditSubtract,
    getUserById,
    getBalance,
    createUser,
    creditAdd,
}

export default WalletService
