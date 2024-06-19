const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    healthData:{
        pregnancies: Number,
        glucose: Number,
        bloodPressure: Number,
        skinThickness: Number,
        insulin: Number,
        bmi: Number,
        diabetesPedigreeFunction: Number,
        age: Number
    }
    });

    module.exports = mongoose.model('User', UserSchema);