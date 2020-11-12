'use strict';

// [START gae_node_request_example]
const express = require('express');
const cors = require('cors')
const app = express();
const firebase = require('firebase');
const bodyParser = require('body-parser');
const appFire = firebase.initializeApp({
    apiKey: "AIzaSyCuI1jFSy5Wt5kWx6SboaMvRZYhQs8ahUU",
    authDomain: "clase-12-11-2020.firebaseapp.com",
    databaseURL: "https://clase-12-11-2020.firebaseio.com",
    projectId: "clase-12-11-2020",
    storageBucket: "clase-12-11-2020.appspot.com",
    messagingSenderId: "428779476475",
    appId: "1:428779476475:web:8a955898925c08f362e75e"
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Servicio de autenticacion!').end();
});

app.post('/create-user', (req, res) => {
    const username = req.body.email;
    const password = req.body.password;
    console.log(username, password);
    if (!username || !password) {
        res.status(400).send('bad request').end();
        return;
    }

    appFire.auth().createUserWithEmailAndPassword(username, password).then((user) => {
        res.status(200).send(`{"message": "user created", "user": ${JSON.stringify(user)}}`).end();
        return;
    }).catch((err) => {
        res.status(400).send(`{"message": "error occured", "error": ${JSON.stringify(err)}}`).end();
        return;
    });
});

app.post('/user-signin', (req, res) => {
    const username = req.body.email;
    const password = req.body.password;
    if (!username || !password) {
        res.status(400).send('bad request').end();
        return;
    }

    appFire.auth().signInWithEmailAndPassword(username, password).then((user) => {
        res.status(200).send(`{"message": "user signedin", "user": ${JSON.stringify(user)}}`).end();
        return;
    }).catch((err) => {
        res.status(400).send(`{"message": "error occured", "error": ${JSON.stringify(err)}}`).end();
        return;
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`This message is seen in the logs`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
