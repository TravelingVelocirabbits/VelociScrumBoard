const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel');
const Task = require('./taskModel');
const Category = require('./categoryModel');

const boardSchema = new Schema({
  name: { type: String, required: true },
  users: { type: [User.schema], default: [] },
  tasks: { type: [Task.schema], default: [] },
  categories: { type: [Category.schema], default: [] }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;