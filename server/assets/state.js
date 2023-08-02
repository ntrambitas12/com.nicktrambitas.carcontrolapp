class AppState {
  constructor() {
    this.connections = new Map();
  }

  addCommand(command, vin) {
    // Set the vin in the connections Map if it doesn't already exist
    if (!this.connections.has(vin)) {
      this.connections.set(vin, { commandQueue: [], appState: {} });
    }
    const state = this.connections.get(vin);
    state.commandQueue.push(command);
  }

  getCommand(vin) {
    // Set the vin in the connections Map if it doesn't already exist
    if (!this.connections.has(vin)) {
      this.connections.set(vin, { commandQueue: [], appState: {} });
    }
    const state = this.connections.get(vin);
    return state.commandQueue.shift();
  }

  setAppState(appState, vin) {
    // Set the vin in the connections Map if it doesn't already exist
    if (!this.connections.has(vin)) {
      this.connections.set(vin, { commandQueue: [], appState: {} });
    }
    const state = this.connections.get(vin);
    state.appState = appState;
  }

  getAppState(vin) {
    // Set the vin in the connections Map if it doesn't already exist
    if (!this.connections.has(vin)) {
      this.connections.set(vin, { commandQueue: [], appState: {} });
    }
    const state = this.connections.get(vin);
    return state.appState;
  }
}

module.exports = AppState;
