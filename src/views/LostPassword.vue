<script setup>
import { onBeforeMount, ref, computed, watch } from 'vue';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'vue-router';
import AnimatedButton from '@/components/AnimatedButton.vue';

const router = useRouter();
const auth = getAuth();
const emailAddress = ref('');
const errMsg = ref('');
const resetSent = ref(false);
const showCreateAccount = ref(false);



// automatically push user to the main page if they're logged in
onBeforeMount(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      unsubscribe();
      redirect('/');
    }
  });
});

const isDisabled = computed(() => {
      return errMsg.value || emailAddress.value.length === 0
    });

const removeMargin = computed(() => {
      return (showCreateAccount.value)? '': 'signUpError'
    });


watch(emailAddress, () => {
      if(errMsg.value) {
        errMsg.value = null;
        if(showCreateAccount.value) showCreateAccount.value = false
      }
})

const redirect = (url) => {
  router.push(url);
}

const resetPassword = () => {
  sendPasswordResetEmail(auth, emailAddress.value)
  .then(() => {
    resetSent.value = true;
  })
  .catch((error) => {
    console.log(error);
    switch (error.code) {
      case 'auth/invalid-email':
          errMsg.value = 'Please format email as example@email.com'
          break
      case 'auth/user-not-found':
          errMsg.value = 'Account not found!'
          showCreateAccount.value = !showCreateAccount.value
          break
      default:
          errMsg.value = 'An error has occured. Try again'
          break
    }
  })
}
</script>

<template>
  <div class="AppBody">
      <h1 class="AppHeading">MyELR</h1>
      <div class="AppCardContainer" v-if="!resetSent">
        <div class="AppCard">
          <h1 class="AppCardHeading">Forgot Password?</h1>
          <h3 class="AppCardSubheading">Enter your Email Address</h3>
            <div class="AppCardBox">
              <input type="text" placeholder="Email Address" v-model="emailAddress" class="text-input email-image"/>
              <AnimatedButton @click="resetPassword()" :button-content="{text: 'Reset'}" :disabled="isDisabled"/>
              <div class="signUpSpacer"></div>
              <div class="error-message-text" v-show="errMsg" :class="removeMargin">{{ errMsg }}</div>
              <p class="createAccount" @click="redirect('/createAccount')" v-show="showCreateAccount">Create One</p>
            </div>
         </div>
       </div>
      <div div class="AppCardContainer cardContainerSent" v-else>
        <div class="AppCard">
          <h1 class="AppCardHeading sentHeading">Password Reset Sent</h1>
          <h3 class="AppCardSubheading">Please check your email inbox</h3>
          <div class="AppCardBox">
            <AnimatedButton @click="redirect('/login')" class="continueButton" :button-content="{text: 'Continue'} "/>
          <div class="resetSpacer"></div>
        </div>
      </div>
      </div>
      <p class="AccountLink" v-if="!resetSent">Remember Password? <span @click="redirect('/login')" class="AccountLinkClickable"> Sign In</span></p>
  </div>
</template>



<style scoped>
  .signUpError{
    padding-bottom: 2rem;
  }
  .signUpSpacer{
    padding-top: 1.5rem;
  }
  .createAccount{
    color: white;
  }
  .resetSpacer{
    padding-bottom: 1.8em;
  }
  .cardContainerSent{
    @media screen and (min-width: 375px) {
      padding-top: 4.5rem;
    }
   
  }

  .sentHeading{
    @media screen and (max-width: 375px) {
      font-size: 1.8em;
    }
   
  }
  .continueButton{
    padding-top: 4rem;
  }
</style>
