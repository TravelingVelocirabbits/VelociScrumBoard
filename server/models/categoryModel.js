const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category: String,
  items: {type: Array, default:[]}
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;