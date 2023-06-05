'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {
    const data = req.body;
    const heightInM = data.height / 100;
    const bmi = (data.weight / (heightInM * heightInM)).toFixed(2);
    res.send(bmi);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}\n`);
});