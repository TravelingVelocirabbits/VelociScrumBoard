const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categories: { type: [String], required: true, unique: true, default: [] },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
