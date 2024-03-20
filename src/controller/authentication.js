const express = require('express')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../DBConnection/DbConnection')
const crypto = require('crypto')

//user registration

async function userRegistraion(req, res) {
    const { name, email, password } = req.body;
    // Check if the user already exists
    const userExistingQ = `SELECT * FROM user WHERE email = ?`;
    const uid = crypto.randomUUID()
    db.query(userExistingQ, [email], async (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (result.length > 0) {
          res.status(400).send({status : 400 ,message : "User already exists"});
        } else {
          const q = "INSERT INTO user (name, email, password,uid) VALUES (?, ?, ?,?)";
          const hashedPassword = await bcrypt.hash(password, 10);
          const values = [name, email, hashedPassword,uid];
          db.query(q, values, (err, data) => {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(200).json({message: "User registered successfully", data : {uid : uid} });
            }
          });
        }
      }
    });
  };


//Login User
async function userLogin(req, res)  {
    const { email, password } = req.body;
    const q = `SELECT * FROM user WHERE email = ?`;
    //check user details
    db.query(q, [email, password], async (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (result.length === 0) {
          res.send("user not found");
        } else {
          //compare password with dbpassword
  
          const comparePassword = await bcrypt.compare(
            password,
            result[0].password
          );
          //if passowrd matched
  
          if (comparePassword) {
            const payload = {
              email: email,
            };
            //jwt token
  
            const jwtToken = jwt.sign(payload, "todouserlogin", {
              expiresIn: "3d",
            });
  
            res.status(200).send({"AccessToken" : jwtToken});
          } else {
            res.send("invalid password");
          }
        }
      }
    });
  };

// authentication middleware

async function authentication (req, res, next){
  let jwtToken;
  const authenticationHeaders = req.headers["authorization"];
  if (authenticationHeaders !== undefined) {
    jwtToken = authenticationHeaders.split(" ")[1];
  }
  if (jwtToken === undefined) {
    res.send("invalid user");
  } else {
    jwt.verify(jwtToken, "todouserlogin", async (err, user) => {
      if (err) {
        res.send("Invalid jwtToken");
      } else {
        req.user = user;
        next();
      }
    });
  }
};

module.exports = {userRegistraion,userLogin,authentication}