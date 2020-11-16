'use strict';

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const { PubSub } = require('@google-cloud/pubsub');

const projectId = 'clase-11-11-2020'
const topicName = 'new-transactions';

const pubsub = new PubSub({projectId});
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Servicio pub/sub').end();
});

app.post('/post-message', async (req, res) => {

    // const transaction = req.body.transaction;
    const transaction = {
        id: 3,
        sender: 'account 20',
        receiver: 'account 40',
        amount: 19870
    };

    const dataBuffer = Buffer.from(JSON.stringify(transaction));

    try {
        const messageId = await pubsub.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
        res.status(200).send(`Message ${messageId} published.`).end();
        return;
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        res.status(400).send(`Received error while publishing: ${error.message}`).end();
        return;
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`This message is seen in the logs`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
