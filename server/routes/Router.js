const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');

//CATEGORY CONTROLLERS
router.post('/createcategory', categoryController.addCategory, (req, res) => {
  console.log('finished creating category', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.post('/removecategory', categoryController.removeCategory, (req, res) => {
  console.log('finished removing category', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.put('/editcategory', categoryController.editCategory, (req, res) => {
  console.log('finished updating category', res.locals.category);
  res.status(200).json(res.locals.category);
});


// USER CONTROLLERS 

router.post('/createuser', userController.addUser, (req, res) => {
  res.status(200).json(res.locals.category);
});


router.post('/removeuser', userController.removeUser, (req, res) => {
    
});



// TASK CONTROLLERS
router.post('/createtask', taskController.addTask, (req, res) => {
  req.session.task = res.locals.task;
  console.log('finished creating task ', req.session.task);
  res.status(200).redirect('/update');
});







