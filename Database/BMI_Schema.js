const mongoose = require('mongoose');

const bmiSchema = new mongoose.Schema({
    bmi: String,
    date: String,
    height: String,
    id: String,
    weight: String
});

module.exports = mongoose.model("BMI", bmiSchema);