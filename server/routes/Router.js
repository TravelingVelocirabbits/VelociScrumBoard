const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');

// Define middleware functions separately
const addCategoryMiddleware = categoryController.addCategory;
const removeCategoryMiddleware = categoryController.removeCategory;
const editCategoryMiddleware = categoryController.editCategory;
const addUserMiddleware = userController.addUser;
const removeUserMiddleware = userController.removeUser;
const addTaskMiddleware = taskController.addTask;

//CATEGORY CONTROLLERS
router.post('/createcategory', addCategoryMiddleware, (req, res) => {
  console.log('finished creating category', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.post('/removecategory', removeCategoryMiddleware, (req, res) => {
  console.log('finished removing category', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.put('/editcategory', editCategoryMiddleware, (req, res) => {
  console.log('finished updating category', res.locals.category);
  res.status(200).json(res.locals.category);
});

// USER CONTROLLERS
router.post('/createuser', addUserMiddleware, (req, res) => {
  res.status(200).json(res.locals.category);
});

router.post('/removeuser', removeUserMiddleware, (req, res) => {
  // Your route logic here
});

// TASK CONTROLLERS
router.post('/createtask', addTaskMiddleware, (req, res) => {
  req.session.task = res.locals.task;
  console.log('finished creating task ', req.session.task);
  res.status(200).redirect('/update');
});

module.exports = router;
