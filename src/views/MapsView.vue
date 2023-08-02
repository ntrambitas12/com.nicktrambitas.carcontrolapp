<script setup>
import { onBeforeMount, computed } from 'vue';
import { useAppStore } from '@/stores/appStore';
import { RouterLink } from 'vue-router';
const store = useAppStore();

onBeforeMount(() => {
  store.loadProfileData();
});
const appHeadingBackground = computed(() => {
    return `background: linear-gradient(129deg, rgb(${store.colorScheme?.r ?? 147}, ${store.colorScheme?.g ?? 22}, ${store.colorScheme?.b ?? 22}), rgb(149, 83, 83));`
})
const mapsURL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12427.541868129878!2d-94.8002343!3d38.85797864999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0be64c4530521%3A0x25c3fb9c2fc06a76!2sWalmart%20Neighborhood%20Market!5e0!3m2!1sen!2sus!4v1691015096130!5m2!1sen!2sus'
</script>
<template>
    <div class="AppCardHeading HeadingMap" :style="appHeadingBackground">
          <div class="ControlsTextWrapper">
            <h1 class="ControlsText">Location</h1>
          </div>  
        <router-link class="goBack" to="/">
            <img src="https://placehold.co/40x40"/>
        </router-link>
    </div>
 <div class="embedded-maps">
    <iframe
      class="embedded-maps-iframe"
      :src="mapsURL"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.embedded-maps {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 79.88px); /* Calc is used to subtract the height of the header so that the maps dont overflow */
}

.embedded-maps-iframe {
  width: 100%;
  height: 100%;
}
.HeadingMap{
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
.goBack{
    margin-right: auto;
    padding-left: 1rem;
}
</style>