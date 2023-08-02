<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import AnimatedButton from '@/components/AnimatedButton.vue';

const router = useRouter();
const auth = getAuth();
const emailAddress = ref('');
const password = ref('');
const passwordConfirm = ref('');
const  errMsg = ref('');

watch(password, (newValue) => {
   (newValue === passwordConfirm.value)? errMsg.value = null : errMsg.value = 'Passwords do not match'
   if (newValue.length < 6) errMsg.value = 'Password must be at least 6 characters long!'
})
watch(passwordConfirm, (newValue) => {
   (newValue === password.value)? errMsg.value = null : errMsg.value = 'Passwords do not match'
   if (newValue.length < 6) errMsg.value = 'Password must be at least 6 characters long!'
})
watch(emailAddress, () => {
  if (password.value.length !== 0|| passwordConfirm.value.length !== 0) errMsg.value = null
  if (emailAddress.value.length === 0) errMsg.value = 'Email address cannot be empty'
})


// automatically push user to the main page if they're logged in
onBeforeMount(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      unsubscribe();
      router.push('/');
    }
  });
});

const createAccount = () => {
  createUserWithEmailAndPassword(auth, emailAddress.value, password.value).then(() => {
    router.push('/');
  })
  .catch((error) => {
    console.log(error)
    switch (error.code) {
      case 'auth/invalid-email':
          errMsg.value = 'Invalid email. \nPlease use format example@email.com'
          break
          case 'auth/missing-password':
          errMsg.value = 'Password cannot be empty!'
          break
          case 'auth/weak-password':
          errMsg.value = 'Password should be at least 6 characters'
          break
      default:
          errMsg.value = 'Email or password is not valid'
          break
    }
  })
  
};

const signInClick = () => {
  router.push('/login');
}

</script>

<template>
  <div class="AppBody">
      <h1 class="AppHeading">MyELR</h1>
      <div class="AppCardContainer">
        <div class="AppCard">
            <h1 class="AppCardHeading HeadingSignUp">Let's Get Started!</h1>
            <div class="AppCardBox">
              <input type="text" placeholder="Email Address" v-model="emailAddress" class="text-input email-image"/>
              <input type="password" v-model="password" placeholder="Password" class="text-input password-image"/>
              <input type="password" v-model="passwordConfirm" placeholder="Confirm Password" class="text-input password-image"/>
              <AnimatedButton @click="createAccount()" :button-content="{text: 'Sign Up'}" :disabled="errMsg"/>
              <div class="signUpSpacer"></div>
              <p class="error-message-text signUpError" v-show="errMsg">{{ errMsg }}</p>
            </div>
        </div>
      </div>
      <p class="AccountLink">Already Registered? <span @click="signInClick()" class="AccountLinkClickable"> Sign In</span></p>
  </div>
</template>

<style scoped>
  .HeadingSignUp{
    margin-bottom: 2rem !important;
  }
  .signUpError{
    padding-bottom: 2rem;
  }
  .signUpSpacer{
    padding-top: 1.5rem;
  }
</style>
