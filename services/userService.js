const User = require('../models/User');

async function getAllUser(){
    const users = await User.find({});
    if(!users){
        throw new Error('Users not exists')
    }
    return users
}

async function getUserById(id){
    const user = await User.findById(id);
    if(!user){
        throw new Error(`User by ID : ${id} not found`);
    }
    return user;
}

async function createUser(userData){
    const { email, phone } = userData;
    const existingUser = await User.findOne({ $or: [{email},{phone}] });
    if(existingUser){
        throw new Error('Duplicate users are not allowed');
    }
    const newUser = new User(userData);
    return await newUser.save();
}



async function editUser(id,userData){
    const updatedUser =  await User.findByIdAndUpdate(id,userData,{new : true});
    if(!updatedUser){
        throw new Error(`User by ID : ${id} not found`);
    }
    return updatedUser;
}

async function deleteUser(id){
    const deletedUser =  await User.findByIdAndDelete(id);
    if(!deletedUser){
        throw new Error(`User by ID : ${id} not found`);
    }
    return deletedUser;
}

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    editUser,
    deleteUser
}