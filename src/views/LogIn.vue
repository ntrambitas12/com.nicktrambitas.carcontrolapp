<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useAppStore } from '@/stores/appStore';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth"
import { useRouter } from 'vue-router';
import AnimatedButton from '@/components/AnimatedButton.vue';
const email = ref('')
const password = ref('')
const  errMsg = ref()
const router = useRouter() //get a reference to the router
const { loadProfileData } = useAppStore();

// automatically push user to the main page if they're logged in
onBeforeMount(() => {
  const auth = getAuth();
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      unsubscribe();
      router.push('/');
    }
  });
});

const signInEmail = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
         loadProfileData();
    })
    .catch((error) => {
        switch (error.code) {
      case 'auth/invalid-email':
          errMsg.value = 'Invalid email. Please enter a valid email address'
          break
      case 'auth/user-not-found':
          errMsg.value = 'No account with that email was found'
          break
      case 'auth/wrong-password':
          errMsg.value = 'Incorrect password'
          break
      default:
          errMsg.value = 'Email or password was incorrect'
          break
    }
    })
}
const resetPassword = () => {
    router.push('/resetPassword');
}

const createAccount = () => {
    router.push('/createAccount');
}

const isDisabled = computed(() => {
        //Clear the error message if one of the boxes is modified
      if(errMsg.value && (email.value.length === 0 || password.value.length === 0)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        errMsg.value = null;
      }
      return errMsg.value || email.value.length === 0 || password.value.length === 0;
    });
</script>

<template>
   <div class="AppBody">
    <h1 class="AppHeading">MyELR</h1>
    <div class="AppCardContainer">
        <div class="AppCard">
            <h1 class="AppCardHeading">Welcome Back!</h1>
            <h3 class="AppCardSubheading">Sign in to continue </h3>
            <div class="AppCardBox">
                <input type="text" placeholder="Email" v-model="email" class="text-input email-image"/>
                <input type="password" placeholder="Password" v-model="password" class="text-input password-image"/>
                <p v-if="errMsg" class="error-message-text">{{ errMsg }}</p>
                <AnimatedButton @click="signInEmail()" :button-content="{text: 'Log In'}" :disabled="isDisabled"/>
                <p class="forgotPassword" @click="resetPassword()">Forgot Password?</p>
            </div>
        </div>
    </div>
    <p class="AccountLink">No Account? <span @click="createAccount()" class="AccountLinkClickable"> Sign Up</span></p>
</div> 
</template>

<style scoped>

.forgotPassword{
    color: #b6b2b7;
}

</style>
