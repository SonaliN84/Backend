const express=require('express');
 
const router=express.Router();

const userController=require('../controller/user')

router.post('/user',userController.postAddUser)

router.get('/user',userController.getUsers)

router.delete('/user/delete-user/:userId',userController.deleteUser)

router.put('/user/edit-user/:userId',userController.putEditUser)

module.exports = router