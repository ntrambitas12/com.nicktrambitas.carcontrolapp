import { defineStore } from 'pinia';

export const useControlsStore = defineStore('controlsStore', {
    state: () => ({ 
        controlButtons: [
            {image:'https://placehold.co/35x35', text:'Flash'},
            {image:'https://placehold.co/35x35', text:'Honk'},
            {image:'https://placehold.co/35x35', text:'Trunk'},
            {image:'https://placehold.co/35x35', text:'Fuel'},
            {image:'https://placehold.co/35x35', text:'Vent'},
            {image:'https://placehold.co/35x35', text:'Close'},
            {image:'https://placehold.co/35x35', text:'Start'},
            {image:'https://placehold.co/35x35', text:'Stop'}
        ],
        doorLockButtons: [
            {image:'https://placehold.co/35x35', text:'Lock'},
            {image:'https://placehold.co/35x35', text:'Unlock'}
        ],
        buttonStateTracking: {}, 
     }),
    getters: {
      getControlButtons: (state) => state.controlButtons,
      getDoorButtons: (state) => state.doorLockButtons,
    },
    actions: {
        initializeStore() {
            this.buttonStateTracking = new Map();
            this.controlButtons.forEach(element => {
                this.buttonStateTracking.set(element?.text, false);
            });
            this.doorLockButtons.forEach(element => {
                this.buttonStateTracking.set(element?.text, false);
            });
        },
       async sendCommand(event, VIN) {
        const servicesBase = 'http://localhost:3000/';
        const endPoint = 'api/putCommand';
        const URL = servicesBase + endPoint;

        // API call here to write command to server
        const options = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "set-vin": VIN,
            },
            body: JSON.stringify({
                command: event,
            })
        }
        try {
            const resp = await fetch(URL, options);
        } catch (err) {
            // Handle error here
        }
        
       },
    },
  })