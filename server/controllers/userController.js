const User = require('../models/userModel');
const userController = {};
const bcrypt = require('bcryptjs');

//sign up
userController.signUp = (req, res, next) =>{
  const { username, password } = req.body;
  console.log(req.body);
  res.locals.success = true;
  if(!username || !password) {
    res.locals.success = false;
    return next({
      log: 'username or password is null, signup failed',
      message: 'user name or password is null, sign up failed'
    });
  }
  if (res.locals.success) {
    User.create({ username, password })
      .then(data => {
        console.log(data);
        res.locals.user = data;
        res.locals.success = true;
        console.log(`User ${username} successfully created!`);
        return next();
      })
      .catch(err => {
        res.locals.success = false;
        return next({
          err,
          message: 'error creating account in userController.signUp',
          log: 'error creating account in userController.signUp'
        });
      });
  }
};

//login
userController.login = (req, res, next) => {
  const { username, password } = req.body;
  if(!username || !password) {
    return next({
      log: 'username or password is null, login failed',
      message: 'user name or password is null, login failed'
    });
  }
  User.findOne({ username })
    .then(data => {
      if(data) {
        res.locals.user = data;
        bcrypt
          .compare(password, res.locals.user.password)
          .then(result => {
            if (result) res.locals.success = true;
            console.log('locals success', res.locals.success)
            return next();
          })
          .catch((err)=>{
            return next({
              log: 'userController.login error, bcrypt',
              message: 'userController.login error, bcrypt'
            });
          });
      } else return next();
    })
    .catch(err => {
      return next({
        err,
        message: 'login failed: error in userController.login',
        log: 'login failed: error in userController.login'
      });
    });
}

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
    .catch((err) => {
      return next({
        log: `userController.addUser: Error ${err}`,
        message: {
          err: 'Error occurred in userController.addUser. Check server logs',
        },
        status: 400,
      });
    });
};

// update a user
userController.updateUser = (req, res, next) => {
  const {name} = req.params;
  const updateUser = req.body;

  User.findOneAndUpdate(
    {name: name},
    {name: updateUser}
  ).exec()
    .then(data => {
      if (!data) {
        return next({
          log: `userController.updateUser: ${name} was not found in the database`,
          message: {
            err: 'Student not found'
          },
          status: 404,
        });
      }
      res.locals.user = data;
      return next()
    })
    .catch(err => {
      return next({
        log: `userController.updateUser: ERROR: ${err}`,
        messages: {
          err: 'Error occurred in userController.updateUser. Check server logs'
        },
        status: 400,
      });
    });
};

// delete a user
userController.removeUser = (req, res, next) => {
  const { name } = req.params;
  User.deleteOne( {name: name} ).exec()
    .then(data => {
      if (!data) {
        return next({
          log: `userController.removeUser: ${name} was not found in the database`,
          message: {
            err: 'User not found'
          },
          status: 404,
        });
      } else {
        res.locals.deletedUser = data;
        return next();
      }
    })
    .catch(err => {
      return next({
        log: `userController.removeUser: Error ${err}`,
        message: {
          err: 'Error occurred in userController.removeUser. Check server logs'
        },
        status: 400,
      });
    });
};


module.exports = userController;
