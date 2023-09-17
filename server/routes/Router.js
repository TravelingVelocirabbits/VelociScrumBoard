const express = require('express');
const path = require('path');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');

console.log('IM IN THE ROUTE ROUTER RERROUOTUERE');

//CATEGORY CONTROLLERS
router.post('/createcategory', (req, res) => {
  console.log('finished creating category', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.delete('/removecategory', categoryController.removeCategory, (req, res) => {
  console.log('finished removing category', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.put('/editcategory', categoryController.editCategory, (req, res) => {
  console.log('finished updating category', res.locals.category);
  res.status(200).json(res.locals.category);
});

// USER CONTROLLERS
router.post('/user', userController.addUser, (req, res) => {
  console.log('added user', res.locals.newUser);
  res.status(200).json(res.locals.newUser);
});

router.delete('/removeuser/:name', userController.removeUser, (req, res) => {
  console.log('removed user', res.locals.deletedUser);
  res.status(200).json(res.locals.deletedUser);
});

// TASK CONTROLLERS
router.post('/createtask', taskController.addTask, (req, res) => {
  console.log('finished creating task', res.locals.task);
  res.status(200).json(res.locals.task);
});

router.delete('/removetask', taskController.removeTask, (req, res) => {
  console.log('finished removing task', res.locals.task);
  res.status(200).json(res.locals.task);
});

router.put('/edittask', taskController.editTask, (req, res) => {
  console.log('finished updating task', res.locals.task);
  res.status(200).json(res.locals.task);
});

module.exports = router;
