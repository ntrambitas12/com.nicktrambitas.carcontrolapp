<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
    linkContent: {
        type: Object,
        default: () => {}
    }
})
</script>

<template>
    
    <router-link class="LinkContainer" :to="linkContent?.link">
        <img class="LinkImage" :src="linkContent?.image">
        <h2 class="LinkHeading">{{ linkContent?.text }}</h2>
        <img class="LinkArrow" src="https://placehold.co/40x40">
    </router-link>
</template>

<style scoped>
.LinkContainer{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    gap: 1rem;
    padding: 1rem 0;
    text-decoration: none;
    transition: background-color 0.3s;
    border-bottom: 1px solid #e5d9f0;
}
.LinkImage{
    padding-left: 1rem;
}
.LinkHeading{
    flex-grow: 1;
    color: white;
    font-family: sans-serif;
    margin: 0;
}
.LinkArrow{
    padding-right: 1rem;
}
.LinkContainer:active {
    background-color: rgba(239, 239, 239, 0.557);
}
</style>