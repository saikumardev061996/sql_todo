const mysql = require("mysql");


const db = mysql.createConnection({
  host: "localhost",
  user : 'root',
  password : "abcd_1234",
  database : "todo_list"
})

db.connect((err) => {
  if(err){
    console.error(`DB Error: ${err}`)
  }else{
    console.log("SQL Database Connected")
  }
})

module.exports = db