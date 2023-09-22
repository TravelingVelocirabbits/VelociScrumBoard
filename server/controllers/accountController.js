const Account = require('../models/accountModel');
const Board = require('../models/boardModel');
const User = require('../models/userModel');
const path = require('path');
const fs = require('fs');

const accountController = {};
const bcrypt = require('bcryptjs');

//check if the username exists in the database
accountController.findUsername = (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username) {
    return next({
      log: 'username is empty, accountController.findUsername failed',
      message: 'username is empty, accountController.findUsername failed',
    });
  }

  Account.findOne({ username })
    .then((data) => {
      if (data) {
        res.locals.userExists = data;
        res.locals.accountUsername = data.username;
        return next();
      } else return next();
    })
    .catch((err) => {
      return next({
        err,
        message: 'error in accountController.findUsername: User.findOne query failed',
        log: 'error in accountController.findUsername: User.findOne query failed',
      });
    });
};

//create the user if the username does NOT already exist in the database
accountController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username);
  if (!username || !password) {
    return next({
      log: 'error in accountController.createUser: username or password is null, signup failed',
      message: 'error in accountController.createUser: user name or password is null, sign up failed',
    });
  }

  if (!res.locals.userExists) {

    const user = { username, password: 'a' };
    const board = { 
      name: 'new board',
      users: [user],
      tasks: [],
      categories: []
    };

    const account = {
      username,
      password,
      boards: [board]
    };

    Account.create(account)
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
          message: `error creating account in accountController.createUser: ${err}`,
          log: `error creating account in accountController.createUser: ${err}`,
        });
      });
  } else {
    return next({
      message: 'username already exists, accountController.createUser failed',
      log: 'username already exists, accountController.createUser failed'
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

  Account.findOne({ username })
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
              log: 'accountController.login error, bcrypt',
              message: 'accountController.login error, bcrypt',
            });
          });
      } else return next();
    })
    .catch((err) => {
      return next({
        err,
        message: 'login failed: error in accountController.login',
        log: 'login failed: error in accountController.login',
      });
    });
};

accountController.writeData = (req, res, next) => {
  if (res.locals.success) {
    const writePath = path.join(__dirname, '../data/data.json');
    fs.writeFileSync(writePath, JSON.stringify({ username: res.locals.user.username }));
  }

  return next();
};

module.exports = accountController;