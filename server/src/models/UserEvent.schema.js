const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserEventSchema = new Schema({
        userId: {
            type: String,
            required: true
        },
        eventId: {
            type: String,
            required: true
        },
    },
    {
        collection: 'users-events',
        versionKey: false
    })

module.exports = UserEventSchema;
