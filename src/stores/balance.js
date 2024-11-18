import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { ifObjectOr, toNumberOr, positiveNumberOr } from '@/helpers/helpers';

export const useBalanceStore = defineStore('balance', () => {
    const balance = ref(0);
    const doubleCount = computed(() => balance.value * 2);

    function increment() {
        setBalance(balance.value + 1);
    }

    function refreshBalance () {
        console.log('refreshBalance');
        let currentValue = positiveNumberOr(balance.value, 0);
        let value = positiveNumberOr(localStorage.getItem('fake_balance'), currentValue);
        balance.value = value;
        localStorage.setItem('fake_balance', value);
    }

    function setBalance(value) {
        let currentValue = positiveNumberOr(balance.value, 0);
        value = positiveNumberOr(value, currentValue);
        balance.value = value;
        localStorage.setItem('fake_balance', value);
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
        setBalance,
        getBalance,
    };
});
