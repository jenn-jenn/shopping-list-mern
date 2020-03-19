const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const items = require('./routes/api/items')

const app = express();
app.use(express.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db)
    .then(() => console.log("====== Connected to MongoDB ======"))
    .catch(err => console.log(err));

// API routes
app.use('/api/items', items);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Heroku or local
const port = process.env.PORT || 5000;
// Have app listen on port
app.listen(port, () =>
  console.log(`====== Server started on port ${port} ======"))`)
);