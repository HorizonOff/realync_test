const mongoose = require('mongoose');

const EventSchema = require('./Event.schema');
const EventModel = mongoose.model('events', EventSchema);

module.exports = EventModel;
