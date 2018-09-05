const mongoose = require('mongoose');

const TimeSlotSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    dateFormatted: {
        type: String,
        required: true
    },
    dateTimeISO: {
        type: String,
        required: true
    },
    client: {
        type: String,
        trim: true,
        default: ''
    },
    clientMail: {
        type: String
    },
    added: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('TimeSlot', TimeSlotSchema);