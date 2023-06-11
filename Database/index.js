const express = require('express');
const mongoose = require('mongoose');
const BMI = require('./BMI_Schema');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
// Constants
const PORT = 8000;
const HOST = '0.0.0.0';
const uri = 'mongodb+srv://smbondr:admin@bmi-calculator.n7hiwsy.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


async function main() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the DB');
  } catch (error) {
    console.log(error);
  }
}

main();

app.post('/', async (req, res) => {
  const data = req.body[req.body.length - 1];
  console.log(data);
  if (data !== undefined) {
    try {
      const bmi = await BMI.create({
        bmi: data.bmi,
        date: data.date,
        height: data.height,
        id: data.id,
        weight: data.weight
      });
      res.send('Data stored successfully in MongoDB');
    } catch (error) {
      console.error('Error storing data in MongoDB:', error);
      res.status(500).send('Error storing data');
    }
  }
});

app.get('/lastState', async (req, res) => {
  try {
    const lastBMI = await BMI.findOne().sort({ _id: -1 }).exec();
    res.json(lastBMI);
  } catch (error) {
    console.error('Error retrieving last BMI:', error);
    res.status(500).send('Error retrieving last BMI');
  }
});

app.get('/data', async (req, res) => {
  try {
    const lastThreeBMI = await BMI.find().sort({ _id: -1 }).limit(3).exec();
    res.json(lastThreeBMI);
  } catch (error) {
    console.error('Error retrieving last three BMI records:', error);
    res.status(500).send('Error retrieving last three BMI records');
  }
});


app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}\n`);
});