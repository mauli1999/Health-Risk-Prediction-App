import User from '../models/user.models.js';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../middlewares/verifyToken.js';
import cookieParser from 'cookie-parser';

const userRoutes = express.Router();
userRoutes.use(express.json()); 
userRoutes.use(cookieParser()); 

userRoutes.post('/register', async (req, res) => { 
    
    try{
        const {firstname, lastname, email, password}= req.body;

        if(!(firstname && lastname && email && password))
        { res.status(400).send('All input is required');}

        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(409).send('User already exists');
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
                firstname,
                lastname,
                email,
                password: encryptedPassword
        });
            
        const token = jwt.sign(
            {id: user._id},
            process.env.SECRET_KEY,
            {
                expiresIn: '2h'
            }
        );
        user.token = token;
        user.password = undefined;

        res.status(200).json(user);
        }

    catch(error){
        console.log(error);
    }
});

userRoutes.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!(email && password)){
            res.status(400).send('All input is required');
        }
        const user = await User.findOne({email})
        if(!(user)){
            res.status(400).send('Invalid credentials');
        }

        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {id:user._id},
                process.env.SECRET_KEY,
                {
                    expiresIn: '2h'
                }
            );

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 2*24*60*60*1000),
                httpOnly: true
            };

            res.status(200).cookie('token', token, options).json({ sucess: true, token, user});
        }

    }
    catch(error){
        console.log(error);
    }
});

userRoutes.get('/logout', verifyToken, async (req, res) => {
    try{
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.clearCookie('token');
        res.status(200).send(`Logged out. Goodbye, ${user.firstname}!`);
    }
    catch(error){
        console.log(error);
    }
});

export default userRoutes;