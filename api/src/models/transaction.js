const mongoose = require('mongoose')
const { Schema } = mongoose

/** Transaction db schema */
const TransactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, require: true },
    route: { type: Schema.Types.ObjectId, ref: 'Route' },
    date: { type: Date, required: true, default: new Date() }
})

module.exports = mongoose.model('Route', TransactionSchema)