<script setup>
import { onMounted, onBeforeMount, computed } from 'vue';
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
   <div class="AppCardContainer MainAppCardContainer">
       <div class="AppCardMain">
            <div class="DoorLocks">
                <hr>
            </div>
            <div class="OtherControls">
                <hr>
            </div>
       </div>
   </div>
</div> 
</template>

<style>
.goBack{
    margin-right: auto;
    padding-left: 1rem;
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
</style>