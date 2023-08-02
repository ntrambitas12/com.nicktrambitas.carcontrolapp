<script setup>
import { onMounted, onBeforeMount, computed } from 'vue';
import AnimatedButton from '@/components/AnimatedButton.vue';
import { useAppStore } from '@/stores/appStore';
import { RouterLink } from 'vue-router';
const store = useAppStore();

onBeforeMount(() => {
  store.loadProfileData();
});
const appHeadingBackground = computed(() => {
    return `background: linear-gradient(129deg, rgb(${store.colorScheme?.r ?? 147}, ${store.colorScheme?.g ?? 22}, ${store.colorScheme?.b ?? 22}), rgb(149, 143, 143));`
})
</script>

<template>
 <div class="AppBody" :style="appHeadingBackground">
    <div class="AppCardHeading HeadingControls">
          <div class="ControlsTextWrapper">
            <h1 class="ControlsText">Controls</h1>
          </div>  
        <router-link class="goBack" to="/">
            <img src="https://placehold.co/40x40"/>
        </router-link>
    </div>
   <div class="AppCardContainer ControlsAppCardContainer">
       <div class="AppCardMain">
            <div class="DoorLocks">
                <animated-button :button-content="{image:'https://placehold.co/35x35', text:'Lock'}" button-type="DoorButton"/>
                <animated-button :button-content="{image:'https://placehold.co/35x35', text:'Unlock'}" button-type="DoorButton"/>
            </div>
            <hr>
            <div class="OtherControls">
                <animated-button :button-content="{image:'https://placehold.co/35x35', text:'Flash'}" button-type="ControlButton"/>
                <animated-button :button-content="{image:'https://placehold.co/35x35', text:'Honk'}" button-type="ControlButton"/>
                <animated-button :button-content="{image:'https://placehold.co/35x35', text:'Trunk'}" button-type="ControlButton"/>
                <animated-button :button-content="{image:'https://placehold.co/35x35', text:'Fuel'}" button-type="ControlButton"/>
                <animated-button :button-content="{image:'https://placehold.co/35x35', text:'Open'}" button-type="ControlButton"/>
                <animated-button :button-content="{image:'https://placehold.co/35x35', text:'Close'}" button-type="ControlButton"/>
                <animated-button :button-content="{image:'https://placehold.co/35x35', text:'Start'}" button-type="ControlButton"/>
                <animated-button :button-content="{image:'https://placehold.co/35x35', text:'Stop'}" button-type="ControlButton"/>
            </div>
            <hr>
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
}
.HeadingControls{
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
}
.ControlsTextWrapper{
    margin-right: auto;  
}
.ControlsText{
    margin-right: 56px; /* Offset to perfectly align heading to the center of the screen. Update this if back arrow image changes size */
}

.DoorLocks{
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 5%;
}
.OtherControls{
    padding-top: 5%;
    padding-bottom: 5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.61rem;
    align-content: center;
    justify-content: center;
    width: 80%;
    margin: auto;
}
</style>