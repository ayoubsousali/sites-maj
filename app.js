const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

var app = express();

const route = require('./routes/route');

// connexion a mongodb
mongoose.connect('mongodb://localhost:27017/sitesList');

// verifier si connecter
mongoose.connection.on('connected', () => {
  console.log('connecter a mongodb sur 270217');
});

mongoose.connection.on('error', (err) => {
  if (err) {
    console.log('Erreur lors de la connexion a mongodb ' + err);
  }
});


// port
const port = 3000;

//middleware - cors
app.use(cors());

//bodyparser
app.use(bodyparser.json({limit: '50mb'})); // augmenter limit du payload
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));

// static
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', route);


// test serveur

app.get('/', (req, res) => {
  res.send('test');
});

app.listen(port, () => {
  console.log("serveur demarrer: " + port);
});
