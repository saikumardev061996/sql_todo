const db = require('../DBConnection/DbConnection')
const crypto = require('crypto')

async function saveTodo(req, res) {
    const userEmail = req.user.email;
    const q = `SELECT * FROM user WHERE email = ?`;
    const values = [userEmail];
    const uid = crypto.randomUUID();
    db.query(q, [values], (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        const userId = result[0].userId;
        const { title, description } = req.body;
        const query = "INSERT INTO todolist(title,description,userId,uid) VALUES (?)";
        const values = [title, description, userId,uid];
        // console.log(userId)
        db.query(query, [values], (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send({message : "Todo save successfully",data : {uid : uid} });
          }
        });
      }
    });
  };
  //GET TODO
async  function fetchTodo(req, res)  {
    const userEmail = req.user.email;
    const userQuery = `SELECT * FROM user WHERE email = ?`;
    const values = [userEmail];
    db.query(userQuery, [values], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const getQuery = "SELECT * FROM todolist WHERE userId = ?";
        const userID = result[0].userId;
        db.query(getQuery, [userID], (err, data) => {
          if (err) {
            throw err;
          } else {
            res.status(200).json(data);
          }
        });
      }
    });
  };
  
  //Update TODO
  
  async function updateTodo(req, res){
    const userEmail = req.user.email;
    const userQuery = `SELECT * FROM user WHERE email = ?`;
    const values = [userEmail];
    db.query(userQuery, [values], (err, result) => {
      if (err) {
        res.send(err);
        console.log("pass")
      } else {
        const { title, description } = req.body;
        const uid = req.params.uid;
        const query = `UPDATE todolist SET title = ? , description = ? WHERE uid = '${uid}'`;
        db.query(query, [title, description], (err, data) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.send({message : "Todo updated successfully"});
          }
        });
      }
    });
  };
  
  //DELETE TODO

 async function deleteTodo(req, res)  {
    const uid = req.params.uid;
    const query = `DELETE FROM todolist WHERE uid = '${uid}'`;
    console.log(query)
    db.query(query, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send({message:"Todo delete successfully"});
      }
    });
  };
  
  //Todo status update api 
 async function todoStatusUpdate(req, res)  {
    const userEmail = req.user.email;
    const userQuery = `SELECT * FROM user WHERE email = ?`;
    const values = [userEmail];
    db.query(userQuery, [values], (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        const { todoStatus } = req.body;
        const uid = req.params.uid;
        const query = `UPDATE todolist SET todoStatus = ${todoStatus} WHERE uid = '${uid}'`;
        db.query(query, (err, data) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(200).json({meessage : "Todo status changed successfully"});
          }
        });
      }
    });
  };
  

  module.exports = {saveTodo,fetchTodo,updateTodo,deleteTodo,todoStatusUpdate}