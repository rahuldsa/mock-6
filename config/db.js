const mongoose = require('mongoose')
require('dotenv').config()

const connection = mongoose.connect("mongodb+srv://rahul:rahul@cluster0.oq8tma1.mongodb.net/mock6?retryWrites=true&w=majority")

module.exports = { connection }