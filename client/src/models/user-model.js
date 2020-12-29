const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  userName: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  phoneNumber: {
    type: Number
  },
  eventsCount: {
    type: Integer
  },
  nextEventDate: {
    type: Date
  }
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel
