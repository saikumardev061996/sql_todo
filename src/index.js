const express = require("express");
// const bodyParser = require("body-parser")
const db = require("./DBConnection/DbConnection");
// const { json } = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const userRouter = require('./Routes/Routes')
const todoRouter = require('./Routes/todo')



app.use("/todolist/auth", userRouter)


app.use("/todolist", todoRouter);


app.listen(5000, () => {
  console.log("Server Running at localhost:5000");
});
