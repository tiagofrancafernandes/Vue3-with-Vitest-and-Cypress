<script setup lang="js">
const props = defineProps({
    hasMarker: {
        type: Boolean,
        defaul: false,
    },
});
</script>

<template>
    <div class="item">
        <i
            class="cursor-pointer hover:text-red-500"
            :class="{
                'text-red-500': props?.hasMarker,
            }"
        >
            <slot name="icon"></slot>
        </i>
        <div class="details">
            <h3>
                <slot name="heading"></slot>
            </h3>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.text-red-500, .hover\:text-red-500:hover {
    color: red;
}

.item {
    margin-top: 2rem;
    display: flex;
    position: relative;
    border: 1px solid gray;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
}

.details {
    flex: 1;
    margin-left: 1rem;
    padding: 0 0.5rem;
}

i {
    display: flex;
    place-items: center;
    place-content: center;
    width: 32px;
    height: 32px;
    color: var(--color-text);
}

h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
}

@media (min-width: 1024px) {
    .item {
        margin-top: 0;
        padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
    }

    i {
        top: calc(50% - 25px);
        left: -26px;
        position: absolute;
        border: 1px solid var(--color-border);
        background: var(--color-background);
        border-radius: 8px;
        width: 50px;
        height: 50px;
    }

    .item:before {
        content: ' ';
        border-left: 1px solid var(--color-border);
        position: absolute;
        left: 0;
        bottom: calc(50% + 25px);
        height: calc(50% - 25px);
    }

    .item:after {
        content: ' ';
        border-left: 1px solid var(--color-border);
        position: absolute;
        left: 0;
        top: calc(50% + 25px);
        height: calc(50% - 25px);
    }

    .item:first-of-type:before {
        display: none;
    }

    .item:last-of-type:after {
        display: none;
    }
}
</style>
