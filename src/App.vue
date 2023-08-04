<template>
  <router-view/>
</template>

<style>
/* Global App Styles */
.AppBody{
    background: linear-gradient(323deg, rgb(174 34 216), rgb(24 2 71));
    height: 100vh;
    overflow: auto;
}
.AppHeading{
    text-align: center;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    color: white;
    font-family: sans-serif;
    font-style: italic;
    font-size: 2.4em;
    @media screen and (min-width: 376px) {
        margin-bottom: 2.5em;
        margin-top: 2em;
    }
}
.AppCardContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.AppCard{
    background-color: rgb(133 107 199 / 50%);
    border-radius: 16px;
    width: 90%;

    @media screen and (min-width: 900px) {
        width: 45%;
    }
}
.AppCardHeading{
    text-align: center;
    color: white;
    margin-bottom: 0;

    @media screen and (max-width: 300px) {
      font-size: 1.7em;
    }
}

.AppCardSubheading{
    text-align: center;
    font-size: 1em;
    margin-top: 0.5rem;
    color: #b6b2b7;
}
.AppCardBox{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.text-input {
  margin-top: 15px;
  width: 60%;
  font-size: 16px;
  border: 2.5px solid #ccc;
  border-radius: 15px;
  margin-bottom: 15px;
  transition: border-color 0.3s ease-in-out;
  padding: 10px 0px 10px 40px;
  background-size: 20px; /* Set the image width */
  background-repeat: no-repeat;
  background-position: left 10px center; /* Adjust position as needed */
}

.text-input:focus {
  outline: none;
  border-color: #13a5ff;
}
.email-image{
    background-image: url('https://placehold.co/30x30'); /* Replace with your image path */
}

.password-image{
    background-image: url('https://placehold.co/30x30'); /* Replace with your image path */
}

.error-message-text {
  color: red;
  font-size: 1em;
}
.AccountLink{
    text-align: center;
    margin-top: 4em;
    color: #b6b2b7;
    @media screen and (min-width: 376px) {
        margin-top: 10em;
    }
}
.AccountLinkClickable{
    color: white;
}
.AppSubpageHeadingText{
    margin-right: 56px; /* Offset to perfectly align heading to the center of the screen. Update this if back arrow image changes size */
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 2.4em;
    font-family: sans-serif;
    @media screen and (min-width:630px) {
        font-size: xxx-large;
    }
    @media screen and (max-width:300px) {
        font-size: 2rem;
    }
}
.AppSubpageHeadingTextWrapper{
    margin-right: auto;  
}
.goBack{
    margin-right: auto;
    padding-left: 1rem;
}

</style>