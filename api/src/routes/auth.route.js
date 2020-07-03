const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jtw = require('jsonwebtoken')
const passport = require('passport')
const validateSignupInput = require('../utils/validators/signup.validator')
const validateLoginInput = require('../utils/validators/login.validator')

/**
 * GET /logout
 * 
 * Perform a logout of the app, make token invalid.
 */
router.get('/logout', (req, res) => {
    req.logout()
    res.send('success')
})

/** 
 * POST /login 
 * 
 * Authenticate user in the app.
 * 
 * @body {
 *  identification: '',
 *  password: 'user password' 
 * }
 * 
 * @response {
 *  token: 'token to authenticate in app'
 * }
 */
router.post('/login', async (req, res, next) => {
    try {
        const error = validateLoginInput(req.body)
        
        // input data is incomplete
        if(error)
            return res.status(400).json({ error })

        const user = await User.findOne({ identification: req.body.identification })
        
        // user not exist
        if(!user)
            return res.status(401).json({error: 'Usuario o contraseña incorrectos.' })
        
        // incorrect password
        if(!user.comparePassword(req.body.password))
            return res.status(401).json({error: 'Usuario o contraseña incorrectos.' })
        
        // user match
        const payload = user.getSimple()

        jtw.sign(payload,
            process.env.SECRET_JWT_KEY, 
            { expiresIn: parseInt(process.env.TOKEN_EXPIRATION) }, 
            (err, token) => {
                if(err)
                    next(err)
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                })
            }
        )
    } catch(err) {
        return res.status(500).json({error: 'Ha ocurrido un error al iniciar sesión.' })
    }
})

/** 
 * POST /signup 
 * 
 * Register a new user in the app.
 * 
 * @body     user object
 * @response user created.
 */
router.post('/signup', async (req, res, next) => {
    try {
        const error = validateSignupInput(req.body)
        
        // input data is incomplete
        if(error)
            return res.status(400).json({ error })

        const userByEmail = await User.findOne({ email: req.body.email })
        const userByIdentification = await User.findOne({ identification: req.body.identification })
    
        // email already exist
        if(userByEmail)
            return res.status(400).json({error: 'El correo ya esta registrado.' })
    
        if(userByIdentification)
            return res.status(40).json({error: 'La cédula o pasaporte ya esta registrado.' })
    
    
        // create user
        const newUser = new User({
            identification: req.body.identification,
            name: req.body.name,
            lastname: req.body.lastname,
            birthday: req.body.birthday,
            credit_card: req.body.credit_card,
        })
        newUser.password = newUser.encryptPassword(req.body.password)
    
        // save user
        newUser.save().then(user => res.json(user))

    } catch(err) {
        next(err)
    }
})

/**
 * GET /current
 * 
 * 
 */
router.get('/current', passport.authenticate('jwt', {session: false}), async (req, res) => {
    return res.status(200).json(req.user)
})

module.exports = router
