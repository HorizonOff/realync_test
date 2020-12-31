const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true
        }
    },
    {
        collection: 'events',
        versionKey: false
    })

module.exports = EventSchema;
