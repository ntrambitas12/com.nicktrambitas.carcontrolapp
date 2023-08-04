<script setup>
import { onMounted, onBeforeMount, computed } from 'vue';
import AnimatedButton from '@/components/AnimatedButton.vue';
import { useAppStore } from '@/stores/appStore';
import { useControlsStore } from '@/stores/controlsStore'
import { RouterLink } from 'vue-router';
const store = useAppStore();
const controlStore = useControlsStore();

onBeforeMount(() => {
  store.loadProfileData();
  controlStore.initializeStore();
});
const appHeadingBackground = computed(() => {
    return `background: linear-gradient(129deg, rgb(${store.colorScheme?.r ?? 147}, ${store.colorScheme?.g ?? 22}, ${store.colorScheme?.b ?? 22}), rgb(149, 117, 117));`
})

const handleClick = async (event) => {
    await controlStore.sendCommand(event, store.getVin);
}
</script>

<template>
 <div class="AppBody" :style="appHeadingBackground">
    <div class="AppCardHeading HeadingControls">
          <div class="AppSubpageHeadingTextWrapper">
            <h1 class="AppSubpageHeadingText">Controls</h1>
          </div>  
        <router-link class="goBack" to="/">
            <img src="https://placehold.co/40x40"/>
        </router-link>
    </div>
   <div class="AppCardContainer ControlsAppCardContainer">
       <div class="AppCardMain">
            <div class="DoorLocks">
                <animated-button v-for="(item, idx) in controlStore.getDoorButtons" 
                :button-content="item"
                button-type="DoorButton"
                :key="idx"
                @click="(event) => handleClick(event)"
                :disabled="controlStore.buttonStateTracking.get(item?.text)"/>
            </div>
            <hr>
            <div class="OtherControls">
                <animated-button v-for="(item, idx) in controlStore.getControlButtons"
                :button-content="item"
                button-type="ControlButton"
                :key="idx"
                @click="(event) => handleClick(event)"
                :disabled="controlStore.buttonStateTracking.get(item?.text)"/>
            </div>
            <hr>
            <div class="Climate Controls">
                <p style="text-align: center; color: white;">WIP. Climate Controls Go Here.</p>
            </div>
       </div>
   </div>
</div> 
</template>

<style scoped>
.goBack{
    margin-right: auto;
    padding-left: 1rem;
}
.ControlsAppCardContainer{
    margin-top: 20%;
    @media screen and (min-width:630px) {
        margin-top: 5%;
}
}
.HeadingControls{
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
}


.DoorLocks{
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    padding-bottom: 5%;
}
.OtherControls{
    padding-top: 10%;
    padding-bottom: 10%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2.5rem;
    align-content: center;
    justify-content: space-evenly;
    width: 80%;
    margin: auto;
    @media screen and (min-width:630px) {
    width: 60%;
}
}
</style>