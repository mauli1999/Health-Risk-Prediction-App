import mongoose from "mongoose";

const Schema = mongoose.Schema;

const { ObjectId } = mongoose.Schema.Types;

const HealthSchema = new Schema({
    healthData:{
        pregnancies: Number,
        glucose: Number,
        bloodPressure: Number,
        skinThickness: Number,
        insulin: Number,
        bmi: Number,
        diabetesPedigreeFunction: Number,
        age: Number
    },
    prediction:{
        type: String,
        default: null
    },
    user:{
        type: ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('HealthData', HealthSchema);
