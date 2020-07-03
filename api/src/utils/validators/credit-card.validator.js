const Validator = require('validator')
const isEmpty = require('./is-empty')

/**
 * Validate if the entry of a credit card is valid.
 * 
 * @param {*} data object to validate.
 * @return error message if there is an issue.
 */
module.exports = function validateCreditCardInput(data) {
    if (isEmpty(data.number)) 
        return'El número no puede estar vacio.'

    if (isEmpty(data.number)) 
        return 'El número de tarjeta no es válido.'

    if (!Validator.isLength(data.number + '', { min: 16, max: 16 })) 
        return 'El número de tarjeta no es válido.'

    if (isEmpty(data.CVV)) 
        return 'El código de seguridad no puede estar vacio.'

    if (!Validator.isLength(data.CVV + '', { min: 3, max: 3 })) 
        return 'El número de seguridad no es válido.'

    if (isEmpty(data.expiration_month)) 
        return 'El mes de expiración no puede estar vacio.'

    if (isEmpty(data.expiration_year)) 
        return 'El año de expiración no puede estar vacio.'
}