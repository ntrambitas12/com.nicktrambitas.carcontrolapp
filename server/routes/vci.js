const express = require('express');

const router = express.Router();
let appState = null;

// Function to set appState
function setAppStateRefVCI(appStateRef) {
  appState = appStateRef;
}

// Define your routes
router.get('/', (req, res) => {
  res.json({ message: "You've reached the /vci route!" });
});

// ESP32 Side APIs
router.put('/putStatus', (req, res) => {
  const vin = req.header('set-vin');
  const newState = req.body;
  if (vin && newState) {
  appState.setAppState(newState, vin);
  res.status(200).send();
  } else {
    res.status(400).send();
  }
});

router.get('/getCommand', (req, res) => {
  const vin = req.header('set-vin');
  if (vin) {
  const command = appState.getCommand(vin);
  res.status(200).json(command);
  } else {
    res.status(400).send();
  }
});

// Export the router
module.exports = { router, setAppStateRefVCI };
