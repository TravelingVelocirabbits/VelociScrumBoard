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

  console.log(req.body, 'IN ADD TASK');

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
  const { _id } = req.body;
  console.log(req.body, 'IN REMOVE TASK');

  Task.findOneAndDelete({_id: _id}, (err, deletedDoc) => {
    if (err) {
      console.log('Error finding categories',err);
      return next();
    }
    console.log('Removed Task: ', deletedDoc);
    res.locals.task = deletedDoc;
    return next();
  });  

};

taskController.editTask = (req, res, next) => {
  const { _id, } = req.body;
  console.log(req.body, 'IN EDIT TASK');

  Task.findOneAndUpdate({_id: _id}, req.body, {new:true}, (err, newDoc) => {
    if (err) {
      console.log('Error finding categories',err);
      return next();
    }
    console.log('Updated Task: ', newDoc);
    res.locals.task = newDoc;
    return next();
  });  

};
module.exports = taskController;