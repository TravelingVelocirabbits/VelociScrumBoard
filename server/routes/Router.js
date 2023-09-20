const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');
const categoryController = require('../controllers/categoryController');

//CATEGORY CONTROLLERS
router.get('/category', categoryController.getCategory, (req, res) => {
  // console.log('finished getting categories', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.post('/category', categoryController.addCategory, (req, res) => {
  // console.log('finished creating category', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.put('/category', categoryController.editCategory, (req, res) => {
  // console.log('finished updating category', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.delete('/category', categoryController.removeCategory, (req, res) => {
  // console.log('finished removing category', res.locals.category);
  res.status(200).json(res.locals.category);
});

// USER CONTROLLERS
router.get('/user', userController.getUser, (req, res) => {
  // console.log('finished getting users', res.locals.user);
  res.status(200).json(res.locals.user);
});

router.post('/user', userController.addUser, (req, res) => {
  console.log('added user', res.locals.newUser);
  res.status(200).json(res.locals.newUser);
});

router.delete('/user', userController.removeUser, (req, res) => {
  console.log('removed user', res.locals.deletedUser);
  res.status(200).json(res.locals.deletedUser);
});

router.post('/signup', userController.findUsername, userController.createUser, (req, res) => {
  if (res.locals.success) return res.status(200).json(res.locals.user);
  else return res.status(200).json({});
});


router.post('/login', userController.login, (req, res) => {
  if (res.locals.success) return res.status(200).json(res.locals.user);
  else return res.status(200).json({});
});

// TASK CONTROLLERS
router.get('/task', taskController.getTask, (req, res) => {
  // console.log('finished getting tasks', res.locals.task);
  res.status(200).json(res.locals.task);
});

router.post('/task', taskController.addTask, (req, res) => {
  console.log('finished creating task', res.locals.task);
  res.status(200).json(res.locals.task);
});

router.put('/task', taskController.editTask, (req, res) => {
  console.log('clicked the button', res.locals.task);
  console.log(
    'in Router.js, the router.put to /task is console logging: ',
    res.locals.task
  );
  res.status(200).json(res.locals.task);
});

router.delete('/task', taskController.removeTask, (req, res) => {
  console.log('finished removing task', res.locals.task);
  res.status(200).json(res.locals.task);
});

module.exports = router;
