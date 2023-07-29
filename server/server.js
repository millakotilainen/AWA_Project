const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const auth = require('./middleware/Auth');
const cors = require('cors');

// Connect to the MongoDB database using the MONGODB_KEY from the .env
mongoose.connect(process.env.MONGODB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => console.log('Connected to MongoDB'))

// Create an instance of the Express application
const app = express();
// Middleware to parse request bodies as JSON
app.use(bodyParser.json());
// Middleware to handle user authentication
app.use(auth);
// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Set the port number for the server
const port = 5000;

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, "..", "client/build")));

// Set up API routes using controllers
app.use('/api/user', require('./controllers/User'));
app.use('/api/thread', require('./controllers/Thread'));
app.use('/api/comment', require('./controllers/Comment'));

// Catch-all route for any other requests that are not handled by the API
app.get('*', (req, res) => {
  //'client/build/index.html'
  res.sendFile(path.join(__dirname, '..', 'client/public/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

