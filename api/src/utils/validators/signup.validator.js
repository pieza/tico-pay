const Validator = require('validator')
const isEmpty = require('./is-empty')
const validateCreditCardInput = require('./credit-card.validator')

/**
 * Validate if the entry of a signup is valid.
 * 
 * @param {*} data object to validate.
 * @return error message if there is an issue.
 */
module.exports = function validateSignupInput(data) {
        
    if (isEmpty(data.identification)) 
        return'La identificación no puede estar vacia.'

    if (!Validator.isLength(data.identification, { min: 7, max: 30 })) 
        return 'La identificación no tiene un formato válido.'

    if (isEmpty(data.name)) 
        return'El nombre no puede estar vacio.'

    if (!Validator.isLength(data.name, { min: 1, max: 30 })) 
        return 'El nombre debe tener entre 1 y 30 caracteres.'
    
    if (isEmpty(data.lastname)) 
        return'Los apellidos no pueden estar vacios.'

    if (!Validator.isLength(data.lastname, { min: 1, max: 30 })) 
        return 'Los apellidos deben tener entre 1 y 50 caracteres.'
    
    if (isEmpty(data.email)) 
        return 'El correo no puede estar vacio.'

    if (!Validator.isEmail(data.email)) 
        return 'El correo debe tener un formato válido.'

    if (isEmpty(data.password)) 
        return 'La contraseña no puede estar vacia.'

    if (!Validator.isLength(data.password, { min: 5, max: 30 })) 
        return 'La contraseña debe tener entre 5 y 30 caracteres.'
    
    if (isEmpty(data.password2)) 
        return 'Confirmar contraseña no puede estar vacio.'
        
    if (!Validator.equals(data.password, data.password2)) 
        return 'Las contraseñas no son iguales.'
    
    if (isEmpty(data.birthday)) 
        return 'La fecha de nacimiento no puede estar vacia.'

    if (isEmpty(data.credit_card))
        return 'La tarjeta de crédito no puede estar vacia.'

    const creditCard = validateCreditCardInput(data.credit_card)

    if(creditCard)
        return creditCard

    return false
}
