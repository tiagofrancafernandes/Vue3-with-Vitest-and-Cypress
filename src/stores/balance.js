import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useBalanceStore = defineStore('balance', () => {
    const balance = ref(0);
    const doubleCount = computed(() => balance.value * 2);

    function increment() {
        balance.value++;
    }

    function refreshBalance () {
        console.log('refreshBalance');
    }

    return { balance, doubleCount, increment, refreshBalance };
});
