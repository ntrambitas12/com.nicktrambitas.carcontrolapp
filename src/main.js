import { createApp } from 'vue';
import { createPinia } from 'pinia'
import './registerServiceWorker';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage";
import { useAppStore } from './stores/appStore';
import firebaseConfig from '@/configs/firebaseConfig';
import router from './router';
import App from './App.vue';

const firebase = initializeApp(firebaseConfig);
getDatabase(firebase);
getStorage(firebase);
const app = createApp(App);
const pinia = createPinia()
app.use(router);
app.use(pinia);
useAppStore(pinia);
app.mount('#app');
