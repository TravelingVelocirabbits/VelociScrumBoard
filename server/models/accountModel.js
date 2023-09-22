const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = require('./boardModel');

const accountSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  boards: { type: [Board.schema] }
});

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

accountSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    return next();
  });
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;