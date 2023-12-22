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
    }
})

module.exports = mongoose.model('ColorBlock', colorSchema)