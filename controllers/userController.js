const express = require('express');
const userServ = require('../services/userService');

const router = express.Router();

//get All users
router.get('/all',async (req,res)=>{
    try{
        const users = await userServ.getAllUser();
        return res.json(users);
    }catch(error){
       return res.status(500).json({error:error.message});
    }
});

//get User by ID

router.get('/find/:id', async (req,res) =>{
    try{
        const {id} = req.params;
        const user = await userServ.getUserById(id);
        if(!user){
            return res.status(404).json({error : `User by ID : ${id} not found`})
        }
        return res.json(user);
    }catch(error){
       return res.status(500).json({error:error.message});
    }
});

//create User
router.post('/add', async(req,res)=>{
    try{
        const newUser = req.body;
        const createdUser = await userServ.createUser(newUser);
        return res.status(201).json(createdUser);
    }catch(error){
        return res.status(500).json({error : error.message});
    }
});

//edit User
router.put('/edit/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const newData = req.body;
        const updatedUser = await userServ.editUser(id,newData);
        if(!updatedUser){
            return res.status(404).json({error : `User by ID : ${id} not found`});
        }
        res.json(updatedUser);
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

// Delete item
router.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await userServ.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ error: `User by ID : ${id} not found` });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;

