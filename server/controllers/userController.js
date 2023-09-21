const Account = require('../models/accountModel');
const Board = require('../models/boardModel');

const User = require('../models/userModel');

const userController = {};
const bcrypt = require('bcryptjs');

userController.getUser = (req, res, next) => {
  User.find({})
    .then(data => {
      res.locals.users = data;
      return next();
    })
    .catch((err)=>{
      return next({
        err,
        log: `could not get users, err: ${err}`,
        message: `could not get users, err: ${err}`
      });
    });
};

//check if the username exists in the database
userController.findUsername = (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username) {
    return next({
      log: 'username is empty, userController.findUsername failed',
      message: 'username is empty, userController.findUsername failed',
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
userController.createUser = (req, res, next) => {
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
userController.login = (req, res, next) => {
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

// add a user
userController.addUser = (req, res, next) => {
  const { username } = req.body;
  User.create({ username, password:'a' })
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
  const { name } = req.params;
  const updateUser = req.body;

  User.findOneAndUpdate({ name: name }, { name: updateUser })
    .exec()
    .then((data) => {
      if (!data) {
        return next({
          log: `userController.updateUser: ${name} was not found in the database`,
          message: {
            err: 'Student not found',
          },
          status: 404,
        });
      }
      res.locals.user = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: `userController.updateUser: ERROR: ${err}`,
        messages: {
          err: 'Error occurred in userController.updateUser. Check server logs',
        },
        status: 400,
      });
    });
};

// delete a user
userController.removeUser = async (req, res, next) => {
  const { _id } = req.body;
  console.log(_id, 'iD IS THIS');
  try {
    const deleted = await User.findOneAndDelete({_id: _id});
    res.locals.user = deleted;
    return next();
  } catch (err) {
    return next({
      log: 'failed to delete user',
      message: {err: `failed to delete user: ${err}`}
    });
  }
};

module.exports = userController;
