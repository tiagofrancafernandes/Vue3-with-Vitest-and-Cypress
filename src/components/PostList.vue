<script setup>
import { ref, onMounted } from 'vue';
import PostItemFactory, { staticFakeItems } from '@/factory/PostItemFactory';
import { ifObjectOr, toNumberOr, positiveNumberOr } from '@/helpers/helpers';
import { useBalanceStore } from '@/stores/balance'
import { storeToRefs } from 'pinia';

import AuthService from '@/services/api/auth';

globalThis.AuthService = AuthService; // TODO: remover em prod
// AuthService.isLogged()

import PostListItem from './PostListItem.vue';
import DocumentationIcon from './icons/IconDocumentation.vue';
import ToolingIcon from './icons/IconTooling.vue';
import EcosystemIcon from './icons/IconEcosystem.vue';
import CommunityIcon from './icons/IconCommunity.vue';
import SupportIcon from './icons/IconSupport.vue';
import IconHeart from './icons/IconHeart.vue';

// globalThis.positiveNumberOr = positiveNumberOr;

const balanceStore = useBalanceStore();
const { name, doubleCount, balance } = storeToRefs(balanceStore);
const { increment, refreshBalance, creditSubtract, getBalance } = balanceStore;

const limitText = (text, max = null, end = '...') => {
    if (typeof text !== 'string') {
        return '';
    }

    end = typeof end === 'string' ? end : '';

    max = toNumberOr(max, null) > 0 ? toNumberOr(max, null) : null;

    if (max !== null) {
        return text.length > max ? text.slice(0, max) + end : text;
    }

    return text;
}

let fetchMoreCountPosts = ref(5);
const markedPosts = ref([]);
const posts = ref([]);

onMounted(() => {
    // posts.value = PostItemFactory.generateItems(15); // dynamic fake items
    posts.value = JSON.parse(localStorage.getItem('mc_posts') || 'null') || staticFakeItems;

    if (AuthService.isLogged()) {
        refreshBalance();
    }
});

const fetchMorePosts = () => {
    if (!AuthService.isLogged()) {
        return;
    }

    fetchMoreCountPosts.value = positiveNumberOr(fetchMoreCountPosts.value, 5);

    let currentPosts = posts.value || [];
    currentPosts.push(...PostItemFactory.generateItems(
        fetchMoreCountPosts.value,
        {
            contactData: null,
        }
    )); // dynamic fake items

    posts.value = currentPosts;

    localStorage.setItem('mc_posts', JSON.stringify(currentPosts));
}

const hasMarker = (post) => {
    if (!post || !['string', 'object'].includes(typeof post)) {
        return false;
    }

    if (typeof post === 'string') {
        return markedPosts.value.includes(post);
    }

    return markedPosts.value.includes(post['uid'] ?? null);
}

const getContact = (post) => {
    post = ifObjectOr(post);

    if (!post) {
        return;
    }

    let postUid = post?.uid ?? null;
    let contactPrice = positiveNumberOr(post?.contactPrice ?? 0);

    if (!postUid || !contactPrice) {
        return;
    }

    if (positiveNumberOr(getBalance(), 0) < contactPrice) {
        globalThis?.Toast?.error('Saldo insuficiente');
        return;
    }

    creditSubtract(contactPrice, {
        onSuccess: ({response}) => {
            if (getBalance() < 15) {
                globalThis?.Toast?.danger(`Seu saldo está baixo`, 5000);
                globalThis?.Toast?.info(`Saldo: ${getBalance()}`, 5500);
            }

            globalThis?.Toast?.success(`Contato liberado!`, 3500);

            post.contactData = PostItemFactory.generateContactData(); // TODO: aqui buscar os dados desse contato

            console.log('getContact', {contactPrice, post, postUid, contactData: post.contactData});

            localStorage.setItem('mc_posts', JSON.stringify(posts.value));
        },
    });
}

const togglePostMark = (post) => {
    if (!post || !['string', 'object'].includes(typeof post)) {
        return false;
    }

    let postUid = null;

    if (typeof post === 'string') {
        postUid = post;
    }

    postUid = post['uid'] ?? null;

    if (!postUid) {
        return false;
    }

    if (!hasMarker(postUid)) {
        markedPosts.value.push(postUid);

        return hasMarker(true);
    }

    markedPosts.value = markedPosts.value.filter(i => i !== postUid);
    return true;
}

const refreshAuthToken = () => {
    AuthService.refreshAuthToken();
}
</script>

<template>
    <div class="flex justify-between">
        <div><button type="button" @click="refreshAuthToken">Auto Login</button></div>
        <template v-if="AuthService.isLogged()">
            <div>Saldo: <span v-text="balance"></span> <button type="button" @click="refreshBalance">Atualizar</button></div>
            <div class="cursor-pointer user-select-none" @click.prevent.stop="increment">Adicionar 100 créditos</div>
        </template>
    </div>

    <template
         v-if="AuthService.isLogged()"
        v-for="(post, postIndex) in posts"
        :key="postIndex"
    >
        <PostListItem
            :post="post"
            :hasMarker="hasMarker(post)"
        >
            <template #icon>
                <span @click="togglePostMark(post)">
                    <IconHeart />
                </span>
            </template>
            <template #heading>{{ limitText(post.title, 51) }}</template>

            <div class="flex justify-between">
                <div>
                    <strong>{{ post?.from }}</strong> -> <strong>{{ post?.from }}</strong>
                </div>
                <div>
                    <template v-if="post?.contactData">
                        <strong>{{ [
                            post?.contactData?.phones[0]['phone'] ?? '',
                            post?.contactData?.emails[0] ?? '',
                        ].filter(i => i.trim()).join(' | ') }}</strong>
                    </template>
                    <template v-else>
                        <strong class="cursor-pointer text-green-500" @click="getContact(post)">
                            Obter contato por {{ post.contactPrice }} {{ post.contactPrice > 1 ? 'créditos' : 'crédito' }}
                        </strong>
                    </template>
                </div>
            </div>

            <div v-html="post.description"></div>
        </PostListItem>
    </template>

    <div  v-if="AuthService.isLogged()" class="flex">
        <button type="button" @click="fetchMorePosts">Carregar mais</button>
        <input type="number" v-model="fetchMoreCountPosts" min="1">
    </div>
</template>

<style>
.text-green-500 {
    color: green;
}
</style>
