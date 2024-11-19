<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import AuthService from '@/services/api/auth';

globalThis.AuthService = AuthService; // TODO: remover em prod
// AuthService.isLogged()
</script>

<template>
    <header>
        <div>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/fake">Fake reqs</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style scoped>
</style>
