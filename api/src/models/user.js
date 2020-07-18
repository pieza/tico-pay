const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt-nodejs')

/** User db schema */
const UserSchema = new Schema({
    identification: { type: String, required: true },
    type: { type: String, required: true, default: 'client'},
    route: { type: Schema.Types.ObjectId, ref: 'Route' },
    name: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    birthday: { type: Date, required: true },
    balance: { type: Number, required: true, default: 0 },
    active: { type: Boolean, required: true, default: true },
    credit_card: { 
        number: { type: Number, required: true },
        CVV: { type: Number, required: true },
        expiration_month: { type: Number, required: true },
        expiration_year: { type: Number, required: true }
    }
})

/**
 * Encrypt a string and return the hash.
 * 
 * @param {Sring} password actual password to encrypt.
 * @return encrypted password.
 */
UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

/**
 * Compares if a text is valid for the hash.
 * 
 * @param {String} password text to compare with original password.
 * @return true if password is valid.
 */
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

/**
 * Return a secure version of the user model.
 * 
 * @return user object
 */
UserSchema.methods.getSimple = function () {
    return { 
        _id: this._id,
        type: this.type,
        name: this.name, 
        lastname: this.lastname,
        email: this.email,
        birthday: this.birthday,
    }
}

module.exports = mongoose.model('User', UserSchema)
