const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true,
        default: 0
    },
    isBlackFont: {
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports = mongoose.model('ColorBlock', colorSchema)