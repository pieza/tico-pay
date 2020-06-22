const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateSignupInput(data) {
    let error = ''

    data.identification = !isEmpty(data.identification) ? data.identification : ''
    data.name = !isEmpty(data.name) ? data.name : ''
    data.lastname = !isEmpty(data.lastname) ? data.lastname : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    if (Validator.contains(data.username, ' ')) 
        return {
            error = 'Username must not contains spaces',
            isValid: false
        }
        
    if (!Validator.isLength(data.username, { min: 2, max: 30 })) 
        return {
            error = 'Username must not contains spaces',
            isValid: false
        }
    
    if (Validator.isEmpty(data.username)) 
        return {
            error = 'Username must not contains spaces',
            isValid: false
        }

    if (!Validator.isEmail(data.email)) 
        return {
            error = 'Username must not contains spaces',
            isValid: false
        }

    if (!Validator.isLength(data.password, { min: 5, max: 30 })) 
        return {
            error = 'Username must not contains spaces',
            isValid: false
        }

    if (Validator.isEmpty(data.password)) 
        return {
            error = 'Username must not contains spaces',
            isValid: false
        }

    if (Validator.isEmpty(data.password2)) 
        return {
            error = 'Username must not contains spaces',
            isValid: false
        }
        
    else if (!Validator.equals(data.password, data.password2)) 
        return {
            error = 'Username must not contains spaces',
            isValid: false
        }  

    return {
        error: '',
        isValid: true
    }
}
