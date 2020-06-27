const Validator = require('validator')
const isEmpty = require('./is-empty')
const validateCreditCardInput = require('./credit-card.validator')

/**
 * Validate if the entry of a login is valid.
 * 
 * @param {*} data object to validate.
 * @return error message if there is an issue.
 */
module.exports = function validateLoginInput(data) {
        
    if (isEmpty(data.identification)) 
        return'La identificación no puede estar vacia.'

    if (!Validator.isLength(data.identification, { min: 7, max: 30 })) 
        return 'La identificación no tiene un formato válido.'
   
    if (isEmpty(data.password)) 
        return 'La contraseña no puede estar vacia.'

    if (!Validator.isLength(data.password, { min: 5, max: 30 })) 
        return 'La contraseña debe tener entre 5 y 30 caracteres.'
   
    return false
}
