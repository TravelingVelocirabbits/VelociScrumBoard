const Task = require('../models/taskModel');

const taskController = {};

taskController.addTask = async (req, res, next) => {
  const {  
    Task_Name,
    Assignee,
    Due_Date,
    Priority,
    Status,
    Description,
    Category
  } = req.body;

  try {
    const task = await Task.create({Task_Name, Assignee, Due_Date, Priority, Status, Description, Category});
    res.locals.task = task;
    return next();
  } catch (err) {
    return next({
      log: 'failed to create user',
      message: {err: `the error code: ${err}`}
    });
  }

};


taskController.removeTask = (req, res, next) => {

};


taskController.editTask = (req, res, next) => {
    
};
module.exports = taskController;