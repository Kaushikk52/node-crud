const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('./node_modules/body-parser');
const userRoutes = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());
app.use('/users',userRoutes);

mongoose.connect('mongodb://0.0.0.0:27017/userdb')
        .then(() => console.log('connected to MongoDB'))
        .catch(err => console.error('Error connecting to MongoDB', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
