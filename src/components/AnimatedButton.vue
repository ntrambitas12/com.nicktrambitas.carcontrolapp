<script setup>

const props = defineProps({
    buttonContent: {
        type: Object,
        default: () => {}
    },
    disabled: {
        type: Boolean,
        default: () => false
    },
    buttonType: {
        type: String,
        default: () => 'AnimatedButton'
    }
})

const emit = defineEmits(['click'])

const handleClick = () => {
    if(!props.disabled) {
        emit('click');
    }
}

const calculatedClass = () => {
    let calculatedClass = props.buttonType;
    calculatedClass = (props.disabled)? calculatedClass + ` disabled${props.buttonType} ${props.buttonContent?.color ?? ''}` :  calculatedClass + ` ${props.buttonContent?.color ?? ''}`;
    console.log(calculatedClass)
    return calculatedClass;
}
</script>

<template>
    <div class="AnimatedButtonClass">
        <button @click="handleClick()" :class="calculatedClass()">
            <span><img :src="props.buttonContent?.image ?? ''"></span>
            <span class="AnimatedButtonText">{{ props.buttonContent?.text }}</span>
        </button>
    </div>
</template>

<style scoped>
/* Animated Button Styles */
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
.AnimatedButton:active {
    background-color: #0056b3; /* Set the color you want the button to change to when pressed */
  }

.disabledAnimatedButton {
    background-color: #0056b3;
    cursor: not-allowed;
}
/* Control Button Styles */
.ControlButton {
    cursor: pointer;
    padding: 0.5em 0.5em;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(255,255,255, 0);
    border: 2px solid #ffffffed;
    width: 5.75em;
    font-size: .9em;
    height: 5.75em;
    border-radius: 50%;
    color: white;
    transition: all 0.3s;
}
/* Door Button Styles */
.DoorButton {
    padding: 0.5em 1em;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    background-color: rgb(255,255,255, 0);
    border: 2px solid #ffffffed;
    width: 8.5em;
    font-size: .9em;
    color: white;
    transition: all 0.3s;
    border-radius: 5em;
}
/* Disabled Control and Door Button Styles */
.disabledControlButton,
 .disabledDoorButton{
    background-color: rgb(118, 113, 113);
    border: 2px solid rgba(118, 113, 113) !important;
    cursor: not-allowed;
}
/* Control and Door Button Active Styles */
.ControlButton:active,
 .DoorButton:active {
    background-color: rgba(118, 113, 113);
}
/* Style to set Red Button Background */
.Red{
    background-color:crimson; 
}

.Red:active{
    background-color: darkred !important;
}
</style>