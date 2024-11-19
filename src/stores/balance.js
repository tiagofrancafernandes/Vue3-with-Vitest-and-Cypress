import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { ifObjectOr, toNumberOr, positiveNumberOr, isNumeric, isFunction } from '@/helpers/helpers';
import WalletService from '@/services/api/wallet';

// console.log(await WalletService.getBalance());

export const useBalanceStore = defineStore('balance', () => {
    const balance = ref(0);
    const doubleCount = computed(() => balance.value * 2);

    function increment() {
        // setBalance(balance.value + 1);
        let packageCode = 'pacote-100-i-2m-brl';

        WalletService?.creditAdd(packageCode)
            .then(res => {
                console.log('res', res);
                let _balance = res?.balance;

                if (res?.success) {
                    globalThis?.Toast?.success(`Crédito adicionado com sucesso!`, 3500);
                }

                if (!isNumeric(_balance)) {
                    refreshBalance();
                }

                if (isNumeric(_balance)) {
                    let currentValue = positiveNumberOr(balance.value, 0);
                    balance.value = positiveNumberOr(_balance, currentValue);
                }
            }).finally(() => {
                //
            });
    }

    async function refreshBalance () {
        console.log('refreshBalance');
        let currentValue = positiveNumberOr(balance.value, 0);
        // let value = positiveNumberOr(localStorage.getItem('fake_balance'), currentValue);
        let value = positiveNumberOr(await WalletService?.getBalance(), currentValue);
        balance.value = value;
        // localStorage.setItem('fake_balance', value);
    }

    function setBalance(value) {
        let currentValue = positiveNumberOr(balance.value, 0);
        value = positiveNumberOr(value, currentValue);
        balance.value = value;
        refreshBalance();
        // localStorage.setItem('fake_balance', value);
    }

    function creditSubtract(value, events = {}) {
        events = ifObjectOr(events, {});
        let {onSuccess, onFinally} = events;

        WalletService?.creditSubtract(value)
            .then(response => {
                console.log('response', response);
                let _balance = response?.balance;

                if (response?.success) {
                    if (onSuccess && isFunction(onSuccess)) {
                        onSuccess({response});
                    }

                    // globalThis?.Toast?.success(`Crédito debitado com sucesso!`, 3500);
                }

                if (!isNumeric(_balance)) {
                    refreshBalance();
                }

                if (isNumeric(_balance)) {
                    let currentValue = positiveNumberOr(balance.value, 0);
                    balance.value = positiveNumberOr(_balance, currentValue);
                }
            })
            .finally(() => {
                if (onFinally && isFunction(onFinally)) {
                    onFinally();
                }
            });
    }

    function getBalance() {
        refreshBalance();
        return balance.value;
    }

    return {
        balance,
        doubleCount,
        increment,
        refreshBalance,
        creditSubtract,
        setBalance,
        getBalance,
    };
});
