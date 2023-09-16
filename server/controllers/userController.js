const User = require('../models/userModel');

const userController = {};

// add a user
userController.addUser = (req, res, next) => {
  const { name } = req.body;
  
  User.create({
    name,
  })
    .then((data) => {
      res.locals.newUser = data;
      return next();
    })
    .catch(err => {
      return next({
        log: `userController.addUser: Error ${err}`,
        message: {
          err: 'Error occurred in userController.addUser. Check server logs'
        },
        status: 400,
      });
    });
};


// delete a user
userController.removeUser = (req, res, next) => {

};


module.exports = userController;