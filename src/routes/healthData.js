import express from 'express';
import healthDataModel from '../models/healthData.models.js';
import verifyToken from '../middlewares/verifyToken.js';
import cookieParser from 'cookie-parser';
import axios from 'axios';

const healthDataRoutes = express.Router();
healthDataRoutes.use(express.json());
healthDataRoutes.use(cookieParser());

healthDataRoutes.post('/add', verifyToken, async (req, res) => {
    try{
        const {pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, diabetesPedigreeFunction, age} = req.body;
        const userId = req.user.id;

        if(!(pregnancies && glucose && bloodPressure && skinThickness && insulin && bmi && diabetesPedigreeFunction && age)){
            res.status(400).send('All input is required');
        }
        
        const existingHealthData = await healthDataModel.findOne({user: userId});
        if(existingHealthData){
            res.status(409).send('Health data already exists');
        }

        const healthData = await healthDataModel.create({
            healthData: {
                pregnancies,
                glucose,
                bloodPressure,
                skinThickness,
                insulin,
                bmi,
                diabetesPedigreeFunction,
                age
            },
            user: userId
        });

        res.status(200).send("Health data added successfully.");

    }catch(error){
        res.status(500).send('Internal server error');
        console.log(error);
    }
});

healthDataRoutes.get('/predict', verifyToken , async (req, res) => {
    try{
        const userId = req.user.id;
        const userHealthData = await healthDataModel.findOne({user: userId});
        if(!userHealthData){
            res.status(404).send('Health data not found');
        }

        const {pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, diabetesPedigreeFunction, age} = userHealthData.healthData;


        const inputData = {
            pregnancies, 
            glucose, 
            bloodPressure, 
            skinThickness, 
            insulin, 
            bmi, 
            diabetesPedigreeFunction, 
            age
        };

        console.log(inputData);  // Before sending to Flask

        const response = await axios.post('http://localhost:3001/predict', inputData);
        console.log(response);
        const prediction = response.data.prediction;

        userHealthData.prediction = prediction;
        await userHealthData.save();

        const result = prediction === 1 ? 'Diabetic' : 'Not Diabetic';

        res.status(200).send('Prediction successful: ' + result);
    }catch(error){
        res.status(500).send('Internal server error');
        console.log(error);
    }
});

healthDataRoutes.get('/get', verifyToken, async (req, res) => {

    try{
        const userId = req.user.id;
        const userHealthData = await healthDataModel.findOne({user: userId});
        if(!userHealthData){
            res.status(404).send('Health data not found');
        }

        res.status(200).send(userHealthData);
    }catch(error){
        res.status(500).send('Internal server error');
        console.log(error);
    }
});

export default healthDataRoutes;