const mongoose = require('mongoose');

const userModelSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },  
});

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

userModelSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    return next();
  });
});

const User = mongoose.model('User', userModelSchema);

module.exports = User;