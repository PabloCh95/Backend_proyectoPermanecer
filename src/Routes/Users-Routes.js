const express=require('express');
const UsersController=require('../Controllers/Users-Controller');
const Routes=express.Router();

Routes.post('/login',UsersController.login)
Routes.post('/sign-up',UsersController.create);
Routes.get('/mostrar',UsersController.mostrar);

module.exports=Routes;