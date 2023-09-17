const Category = require('../models/CategoryModel');

const categoryController = {};

categoryController.addCategory = (req, res, next) => {
  const newCat = req.body;

  Category.findOne({ categories: '*' }, (err, category) => {
    if (err) {
      console.log('Error finding categories', err);
      return next();
    }

    category.categories.push(newCat);

    category.save((err, updatedCategory) => {
      if (err) {
        console.log('Error updating categories: ', err);
        return next();
      }
      console.log('Updated Categories: ', updatedCategory);
      res.locals.category = updatedCategory;
    });
  });
};

categoryController.removeCategory = (req, res, next) => {
  const removeCat = req.body;

  Category.findOne({ categories: '*' }, (err, category) => {
    if (err) {
      console.log('Error finding categories', err);
      return next();
    }

    category.categories = category.categories.filter((val) => val !== removeCat);

    category.save((err, updatedCategory) => {
      if (err) {
        console.log('Error removing categories: ', err);
        return next();
      }
      console.log('Removed Categories: ', updatedCategory);
      res.locals.category = updatedCategory;
    });
  });
};

categoryController.editCategory = (req, res, next) => {
  const oldCat = req.body.old;
  const newCat = req.body.new;

  Category.findOne({ categories: '*' }, (err, category) => {
    if (err) {
      console.log('Error finding categories', err);
      return next();
    }

    category.categories = category.categories.filter((val) => val !== oldCat);
    category.categories.push(newCat);

    category.save((err, updatedCategory) => {
      if (err) {
        console.log('Error removing categories: ', err);
        return next();
      }
      console.log('Removed Categories: ', updatedCategory);
      res.locals.category = updatedCategory;
    });
  });
};

module.exports = categoryController;
