const mongoose = require('mongoose');

const UserEventSchema = require('./UserEvent.schema');
const UserEventModel = mongoose.model('users-events', UserEventSchema);

module.exports = UserEventModel;
