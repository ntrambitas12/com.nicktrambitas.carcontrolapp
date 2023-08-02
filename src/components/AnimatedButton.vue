<script setup>

const props = defineProps({
    buttonContent: {
        type: Object,
        default: () => {}
    },
    disabled: {
        type: Boolean,
        default: () => false
    }
})

const emit = defineEmits(['click'])

const handleClick = () => {
    if(!props.disabled) {
        emit('click');
    }
}

const disabledClass = () => {
    if (props.disabled) {
        return `disabled ${props.buttonContent?.color ?? ''}`
    } else {
        return `${props.buttonContent?.color ?? ''}`
    }
}
</script>

<template>
    <div class="AnimatedButtonClass">
        <button class="AnimatedButton" @click="handleClick()" :class="disabledClass()">
            <span><img :src="props.buttonContent?.image ?? ''"></span>
            <span class="AnimatedButtonText">{{ props.buttonContent?.text }}</span>
        </button>
    </div>
</template>

<style scoped>
.AnimatedButton {
    cursor: pointer;
    font-size: 1em;
    background-color: #13a5ff;
    border: none;
    color: white;
    padding: 1.25em 5.5em;
    margin: .25em .125em;
    border-radius: 5em;
    transition: background-color 0.3s; /* Add a transition for smooth color change */
    @media screen and (min-width: 375px) {
        padding: 1.25em 7.125em;
    }
}
.Red{
    background-color:crimson; 
}

.Red:active{
    background-color: darkred !important;
}

  .AnimatedButton:active {
    background-color: #0056b3; /* Set the color you want the button to change to when pressed */
  }

.disabled {
    background-color: #0056b3;
}

</style>