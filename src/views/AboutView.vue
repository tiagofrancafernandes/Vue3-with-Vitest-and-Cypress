<script setup lang="js">
import WalletService from '@/services/api/wallet';

globalThis.WalletService = WalletService
// console.log(await WalletService.getBalance());
</script>

<template>
    <main>
        <div class="about">
            <h1>This is an about page</h1>
        </div>
    </main>
</template>

<style scoped>
</style>
