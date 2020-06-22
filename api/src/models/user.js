const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    identification: { type: String, required: true },
    type: { type String, required: true, default: 'client'},
    name: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    birthday: { type: Date, required: true },
    credit_card: { 
        number: { type: Number, required: true },
        CVV: { type: Number, required: true },
        expiration_month: { type: Number, required: true },
        expiration_year: { type: Number, required: true }
    }
})

UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
