'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.set('case sensitive routing', true);

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({message: 'Finance API'}).end();
});

app.post('/transactions', (req, res) => {
    const type = req.body.type;
    console.log(type);
    const response = {
        id: "1",
        transactions: JSON.stringify([
            {
                id:"01",
                receiver: "user1",
                sender: "user3",
                amount: 78
            },
            {
                id:"02",
                receiver: "user1",
                sender: "user2",
                amount: 1000
            }
        ])
    };
    res.status(200).json(response).end();
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log('We started to deliver data...');
});

module.exports.app;