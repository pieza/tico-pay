const mongoose = require('mongoose')
const { Schema } = mongoose

/** Route db schema */
const RouteSchema = new Schema({
    name: { type: String, require: true },
    price: { type: Number, require: true },
    origin: { type: String, require: true },
    destination: { type: String, require: true }
})

module.exports = mongoose.model('Route', RouteSchema)