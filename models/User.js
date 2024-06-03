const mongoose = require('mongoose');
const { v4: uuidv4 } = require('../node_modules/uuid');


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please enter your username"]
    } ,
    email : {
        type : String,
        required :  [true,"Please enter your email"],
        unique : true
    },
    phone : {
        type : Number,
        required : [true,"Please enter your phone no."],
        unique : true
    }
});

//create User module from schema
const User = mongoose.model('User',userSchema);
module.exports = User;