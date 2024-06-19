const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const auth = require('./routes/auth');
const users = require('./routes/user');


//Middleware
app.use(bodyParser.json());
app.use(cors());


//MongoDB connection
mongoose.connect('mongodb+srv://mauli:mauli1999@dss.qio7llt.mongodb.net/',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

    

// Simple Route for Testing
app.get('/', (req, res) => {
    res.send('API is working!');
});

app.use('/api/auth', auth);
app.use('/api/user', users);
  
//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));