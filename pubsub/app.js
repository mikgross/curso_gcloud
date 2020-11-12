'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PubSub } = require('@google-cloud/pubsub');

const projectId = 'clase-12-11-2020';
const topicName = 'nueva-transacciones';

const pubsub = new PubSub({
    projectId: projectId
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Servicio pubsub desplegado!').end();
})

app.post('/post-transaction', async (req, res) => {

    const transaction = {
        id: req.body.id,
        sender: req.body.sender,
        receiver: req.body.receiver,
        amount: req.body.amount
    };

    const dataBuffer = Buffer.from(JSON.stringify(transaction));

    try {
        const messageId = await pubsub.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published successfuly!`);
        res.status('200').send(`{"status": "success", "messagId": ${messageId}}`).end();
        return;
    } catch (error) {
        console.log(`Error ${error}`);
        res.status('400').send(`{"status": "error", "messagId": null}`).end();
        return;
    }

});

app.get('/list-messages', async (req, res) => {
    const subscription = pubsub.subscription('projects/clase-12-11-2020/subscriptions/Test-Gcloud_Sub');
    try {
        const messages = await subscription.get();
        res.status(200).send(JSON.stringify(messages.entries)).end();
        return;   
    } catch (error) {
        res.status(400).send(JSON.stringify(error)).end();
        return;
    }
});

app.listen(8080, () => {
    console.log('Service started!');
});

module.exports = app;