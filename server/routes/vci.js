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
  appState.setAppState(newState, vin);
  res.status(200).send();
});

router.get('/getCommand', (req, res) => {
  const vin = req.header('set-vin');
  const command = appState.getCommand(vin);
  res.status(200).json(command);
});

// Export the router
module.exports = { router, setAppStateRefVCI };
