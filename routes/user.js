const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  
const auth = require('../middleware/auth');
const axios = require('axios');
const router = express.Router(); 

//get user data
router.get('/', auth, async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err){
        console.error(err.message);
        res.status(500).semd('Server error');
    }
});

//Update user health data

router.put('/health', auth, async(req,res)=>{
    console.log('PUT /health request received');
    const { pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, diabetesPedigreeFunction, age } = req.body;
    const healthData = { pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, diabetesPedigreeFunction, age };
    try{
        let user = await User.findById(req.user.id);
        user.healthData = healthData;

        await user.save();
        res.json(user);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Predict health risk

router.get('predict', auth, async (req,res)=>{
    const { pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, diabetesPedigreeFunction, age } = req.body;

    try{
        const response = await axios.post('http://localhost:5000/predict', { 
            features: [pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, diabetesPedigreeFunction, age ]
        });

        res.json(response.data);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;