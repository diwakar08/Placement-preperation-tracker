const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    array: {
        type: Array,
        default: new Array(35).fill(0)
    }
})

module.exports = mongoose.model('User', userschema)