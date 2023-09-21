const Account = require('../models/accountModel');
const Board = require('../models/boardModel');

const accountController = {};
const bcrypt = require('bcryptjs');

//check if the username exists in the database
accountController.findUsername = (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    return next({
      log: 'username is empty, accountController.findUsername failed',
      message: 'username is empty, accountController.findUsername failed',
    });
  }

  User.findOne({ username })
    .then((data) => {
      if (data) {
        res.locals.userExists = data;
        return next();
      } else return next();
    })
    .catch((err) => {
      return next({
        err,
        message: 'error in userController.findUsername: User.findOne query failed',
        log: 'error in userController.findUsername: User.findOne query failed',
      });
    });
};

//create the user if the username does NOT already exist in the database
accountController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username);
  if (!username || !password) {
    return next({
      log: 'error in userController.createUser: username or password is null, signup failed',
      message: 'error in userController.createUser: user name or password is null, sign up failed',
    });
  }

  if (!res.locals.userExists) {
    User.create({ username, password })
      .then((data) => {
        console.log(data);
        res.locals.user = data;
        console.log(`User ${username} successfully created!`);
        res.locals.success = true;
        return next();
      })
      .catch((err) => {
        return next({
          err,
          message: 'error creating account in userController.createUser',
          log: 'error creating account in userController.createUser',
        });
      });
  } else {
    return next({
      message: 'username already exists, userController.createUser failed',
      log: 'username already exists, userController.createUser failed'
    });
  }
};

//login
accountController.login = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next({
      log: 'username or password is null, login failed',
      message: 'user name or password is null, login failed',
    });
  }

  User.findOne({ username })
    .then((data) => {
      if (data) {
        res.locals.user = data;
        bcrypt
          .compare(password, res.locals.user.password)
          .then((result) => {
            if (result) res.locals.success = true;
            console.log('locals success', res.locals.success);
            return next();
          })
          .catch((err) => {
            return next({
              log: 'userController.login error, bcrypt',
              message: 'userController.login error, bcrypt',
            });
          });
      } else return next();
    })
    .catch((err) => {
      return next({
        err,
        message: 'login failed: error in userController.login',
        log: 'login failed: error in userController.login',
      });
    });
};