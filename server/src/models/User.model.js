const mongoose = require('mongoose');

const UserSchema = require('./User.schema');
const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
