<script setup>
// @ is an alias to /src
import { onMounted, onBeforeMount, computed } from 'vue';
import { useAppStore } from '@/stores/appStore';
import { RouterLink } from 'vue-router';
import MainPageLink from '@/components/MainPageLink.vue';
import car from '@/assets/car.png'
const store = useAppStore();
const links = [
{
  link: '/controls',
  image: 'https://placehold.co/50x50',
  text: 'Controls'
},
{
  link: '/location',
  image: 'https://placehold.co/50x50',
  text: 'Location'
},
{
  link: '/controls',
  image: 'https://placehold.co/50x50',
  text: 'Charging'
},
{
  link: '/controls',
  image: 'https://placehold.co/50x50',
  text: 'Diagnostics'
}
]
onBeforeMount(() => {
  store.loadProfileData();
});
onMounted(async () => {
  try {
    const resp = await fetch('http://localhost:3000');
    const data = await resp.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

const appHeadingBackground = computed(() => {
    return `background: linear-gradient(129deg, rgb(${store.colorScheme?.r ?? 147}, ${store.colorScheme?.g ?? 22}, ${store.colorScheme?.b ?? 22}), rgb(149, 143, 143));`
})
</script>

<template>
  <div class="AppBody" :style="appHeadingBackground">
    <div class="AppCardHeading">
    </div>
   <div class="AppCardContainer MainAppCardContainer">
    <router-link class="goBack" to="/settings">
            <img src="https://placehold.co/40x40"/>
        </router-link>
    <div class="carImageDiv">
      <div class="text-overlay">
        {{ store.nickName }}
      </div>
      <img :src="store.profilePhoto ?? car" class="carImage"/>
    </div>  
       <div class="AppCardMain">
          <MainPageLink v-for="(link, idx) in links" :key="idx" :link-content="link"/>
       </div>
   </div>
</div> 
</template>

<style scoped>
.AppCardMain{
  margin-top: auto; /* Push container to bottom of the screen */
  width: 100%;
  background-color: rgb(239 239 239 / 45%);
  border-radius: 30px 30px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 0;
  @media screen and (min-width: 1000px) {
  width: 75%;
  }
}
.text-overlay{
  position: absolute;
  font-size: larger;
  color: white;
  font-family: sans-serif;
  padding-bottom: 0.75rem;
  @media screen and (min-width: 600px) {
  padding-bottom: 2rem;
  }
}
.MainAppCardContainer{
  height: 100%;
}
.carImageDiv{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 0.5;
  position: relative;
}

.carImage{
  max-width: 100%;
  @media screen and (min-width: 750px) {
  width: 80%;
  }
}

.goBack{
  margin-top: 1rem;
}
</style>