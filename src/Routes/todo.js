const express = require("express");

const todoRouter = express.Router();
const authentication = require('../controller/middleware')

const {saveTodo,fetchTodo,updateTodo,deleteTodo,todoStatusUpdate} = require('../controller/todo')

todoRouter.post('/todo', authentication,saveTodo);
todoRouter.get('/todo', authentication, fetchTodo);
todoRouter.put('/todo/:uid', authentication, updateTodo);
todoRouter.delete('/todo/:uid', authentication, deleteTodo);
todoRouter.patch('/todo/:uid/status', authentication, todoStatusUpdate);

module.exports = todoRouter