// index.js
const express = require('express');
const cors = require('cors');
const AppState = require('./assets/state');

// Import route files
const vciRoutes = require('./routes/vci');
const apiRoutes = require('./routes/api');

const app = express();
const port = 3000; // You can change the port as per your requirements

// Use the cors middleware to enable CORS
app.use(cors());
// Use body-parser middleware to parse request bodies
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

// Create App State
const state = new AppState();
// Use the route files
apiRoutes.setAppStateRefAPI(state);
vciRoutes.setAppStateRefVCI(state);
app.use('/vci', vciRoutes.router);
app.use('/api', apiRoutes.router);

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
