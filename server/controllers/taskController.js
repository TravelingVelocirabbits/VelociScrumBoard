const Task = require('../models/taskModel');

const taskController = {};

taskController.getTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.locals.task = tasks;
    return next();
  } catch (err) {
    return next({
      log: 'error occurred in getting task: ' + err,
      message: { err: 'error occurred in getting task: ' + err },
    });
  }
};

taskController.addTask = async (req, res, next) => {
  const {
    Task_Name,
    Assignee,
    Due_Date,
    Priority,
    Status,
    Description,
    Category,
  } = req.body;

  try {
    const task = await Task.create({
      Task_Name,
      Assignee,
      Due_Date,
      Priority,
      Status,
      Description,
      Category,
    });
    res.locals.task = task;
    return next();
  } catch (err) {
    return next({
      log: 'failed to create task',
      message: { err: `failed to create task: ${err}` },
    });
  }
};

taskController.removeTask = async (req, res, next) => {
  const { _id, Category, Task_Name } = req.body;
  try {
    if (Category && Task_Name){
      const deleted = await Task.findOneAndDelete({ Category: Category, Task_Name: Task_Name });
      res.locals.task = deleted;
      return next();
    } else if (Category){
      const deleted = await Task.findOneAndDelete({ Category: Category});
      res.locals.task = deleted;
      return next();
    } else {
      const deleted = await Task.findOneAndDelete({ _id: _id });
      res.locals.task = deleted;
      return next();
    }

  } catch (err) {
    return next({
      log: 'failed to delete task',
      message: { err: `failed to delete task: ${err}` },
    });
  }
};

taskController.editTask = async (req, res, next) => {
  console.log(
    'The editTask method in the taskController is being triggered and the value of req.body is: ',
    req.body
  );
  const { _id, ...updates } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });
    // if (!updatedTask) {
    //   return next({
    //     log: 'Task not found',
    //     message: { err: 'Task not found' },
    //   });
    // }

    res.locals.task = updatedTask;
    console.log('This is res.locals.task: ', res.locals.task);
    return next();
  } catch (err) {
    return next({
      log: 'failed to update task',
      message: { err: `failed to update task: ${err}` },
    });
  }
};
module.exports = taskController;
