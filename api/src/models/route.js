const mongoose = require('mongoose')
const { Schema } = mongoose

/** Route db schema */
const RouteSchema = new Schema({
    name: { type: String, require: true },
    price: { type: Number, require: true },
    province: { type: String, require: true },
    canton: { type: String, require: true },
    district: { type: String, require: true }
})

module.exports = mongoose.model('Route', RouteSchema)