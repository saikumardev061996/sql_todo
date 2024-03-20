const express = require("express");

const userRouter = express.Router();


const {
    userRegistraion,
    userLogin,
    
  } = require('../controller/authentication')
  
  //user registraion route
  userRouter.post("/signup",userRegistraion)
  
  // user login route
  userRouter.post("/userlogin", userLogin) 
  
  module.exports = userRouter