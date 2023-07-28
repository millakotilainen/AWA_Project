const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const auth = require('./middleware/Auth');
const cors = require('cors');

mongoose.connect(process.env.MONGODB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => console.log('Connected to MongoDB'))

const app = express();
app.use(bodyParser.json());
app.use(auth);
app.use(cors());

const port = 5000;

app.use(express.static(path.join(__dirname, "..", "client/build")));

app.use('/api/user', require('./controllers/User'));
app.use('/api/thread', require('./controllers/Thread'));
app.use('/api/comment', require('./controllers/Comment'));

app.get('*', (req, res) => {
  //'client/build/index.html'
  res.sendFile(path.join(__dirname, '..', 'client/public/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

