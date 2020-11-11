'use strict';

// [START gae_node_request_example]
const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

app.get('/departments', (req, res) => {
  res.status(200).send(`
    {
      "departments": [
        {
            "id":"01",
            "name": "finance"
        },
        {
            "id":"02",
            "name": "Human resources"
        }
    ]
    }
  `).end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
