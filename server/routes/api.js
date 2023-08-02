const express = require('express');

const router = express.Router();
let appState = null;

// Function to set appState
function setAppStateRefAPI(appStateRef) {
  appState = appStateRef;
}

// Define your routes
router.get('/', (req, res) => {
  res.json({ message: "You've reached the /api route!" });
});

// Vue3 App Side APIs
router.put('/putCommand', (req, res) => {
  const vin = req.header('set-vin');
  const newCommand = req.body?.command;
  appState.addCommand(newCommand, vin);
  res.status(200).send();
});

router.get('/getStatus', (req, res) => {
  const vin = req.header('set-vin');
  const currentState = appState.getAppState(vin);
  res.status(200).json(currentState);
});

// Export the router
module.exports = { router, setAppStateRefAPI };
