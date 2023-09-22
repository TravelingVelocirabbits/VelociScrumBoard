const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel');
const Task = require('./taskModel');
const Category = require('./categoryModel');

const boardSchema = new Schema({
  name: { type: String },
  users: { type: [User.schema] },
  tasks: { type: [Task.schema] },
  categories: { type: [Category.schema] }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;