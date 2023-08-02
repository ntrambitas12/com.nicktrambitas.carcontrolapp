<script setup>
import { RouterLink } from 'vue-router';
import { ref, onBeforeMount, computed } from 'vue';
import { useAppStore } from '@/stores/appStore';
import car from '@/assets/car.png'
import AnimatedButton from '@/components/AnimatedButton.vue';

const store = useAppStore();
onBeforeMount(() => {
    store.loadProfileData();
});

const fileInputRef = ref(null);
const onFileChange = () => {
    const fileInput = fileInputRef.value;
    if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        store.changeImage(event.target.result);
  };
  reader.readAsDataURL(file);    
  }
}

const appHeadingBackground = computed(() => {
    return ` background: linear-gradient(323deg, rgb(${store.colorScheme?.r ?? 147}, ${store.colorScheme?.g ?? 22}, ${store.colorScheme?.b ?? 22}), rgb(241, 208, 208));
    border-radius: 0 0 15px 15px;
    display: flex;
    flex-direction: column;`
})
</script>

<template>
 <div class="AppBody SettingsBody">
    <div :style="appHeadingBackground" class="SettingsCardBanner">
        <router-link class="goBack" to="/">
            <img src="https://placehold.co/40x40"/>
        </router-link>
        <h1 class="AppHeading SettingsHeading">Settings</h1>
        <span class="ProfileCard">
            <h3 class="CarName">{{ store.nickName }}</h3>
            <img :src="store.profilePhoto ?? car" class="CarImage" id="usrImg"/>
        </span>
    </div>
    <div class="AppCardContainer SettingsContainer">
        <div class="AppCard AppCardSettings">
            <div class="AppCardBox">
                <label class="SettingsLabel" for="VIN">VIN Number:</label>
                <input type="text" placeholder="Enter VIN" class="text-input settings-input-text" :disabled="store.inputDisabled" id="VIN" v-model="store.VIN" @input="() => store.enableSave()"/>
                <label class="SettingsLabel" for="nickname">Car Nickname:</label>
                <input type="text" placeholder="Give your car a nickname!" :disabled="store.inputDisabled" id="nickname" class="text-input settings-input-text" v-model="store.nickNameNew" @input="() => store.enableSave()"/>
                <label class="SettingsLabel" for="file-upload">Car Picture:</label>
                <input type="file" @change="onFileChange()" accept="image/*" id="file-upload" class="fileUpload" ref="fileInputRef"/>
                <p>{{ store.uploadProgressMessage }}</p>
                <AnimatedButton :button-content="{text: 'Save'}" :disabled="store.saveDisabled" @click="() => {store.saveProfile()}"/>
                <AnimatedButton :button-content="{text: 'Sign Out', color: 'Red'}" class="signOutButton" @click="() => {store.signOut()}"/>

            </div>
        </div>
    </div>
</div> 
</template>

<style scoped>
.SettingsCardBanner{
    @media screen and (min-width: 821px) {
  flex-direction: row !important;
  }
}
.goBack{
    display: flex;
    align-items: self-start;
    padding-left: 0;
}
.settings-input-text{
    padding: 10px 10px 10px 10px;
}
.signOutButton{
    margin-bottom: 2rem;
    margin-top: 3.5rem;
}
.fileUpload{
    margin-top: 0.9rem;
    margin-bottom: 1rem;
    cursor: pointer;
    border-radius: 2px;
}
.AppCardSettings{
    @media screen and (max-width: 600px) {
         width: 100% !important;
  }
    background: linear-gradient(323deg, rgb(255 255 255), rgb(255 255 255));
    border-radius: 0;
}
.SettingsLabel{
    align-self: flex-start;
    margin-left: 4rem;
    font-family: sans-serif;
    font-size: .9rem;
}
.SettingsBody{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: linear-gradient(323deg, rgb(255 255 255), rgb(255 255 255));
}
.SettingsHeading{
    margin: 0;
    padding-top: 2rem;
    font-style: normal;
    align-self: flex-start;
    padding-left: 2rem;

    @media screen and (min-width: 1000px) {
    padding-left: 12rem;
    font-size: xxx-large;
  }
  
}
.CarImage{
    @media screen and (min-width: 900px) {
    max-width: 40%;
  }
    max-width: 60%;
    flex-grow: 0;
}
.ProfileCard{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.CarName{
    @media screen and (min-width: 600px)  and (max-width: 800px) {
    padding-left: 0;
    font-size: large;
    text-align: center;
  }
    @media screen and (min-width: 800px) {
    padding-left: 0;
    font-size: xx-large;
    text-align: end;
  }
  
    padding-left: 1.5rem;
    flex-grow: 1;
    color: white;

}
.SettingsContainer{
    margin-top: auto;
    margin-bottom: auto;
    padding-top: 2rem;
}
</style>