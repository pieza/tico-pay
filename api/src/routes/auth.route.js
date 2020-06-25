const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jtw = require('jsonwebtoken')
const passport = require('passport')
const validateSignupInput = require('../utils/validators/signup.validator')
const validateLoginInput = require('../utils/validators/login.validator')

/** GET logout */
router.get('/logout', (req, res) => {
    req.logout()
    res.send('success')
})

/** GET login */
router.post('/login', async (req, res, next) => {
    try {
        const error = validateLoginInput(req.body)
        
        // input data is incomplete
        if(error)
            return res.status(400).json({ error })

        const user = await User.findOne({ identification: req.body.identification })
        
        // user not exist
        if(!user)
            return res.status(404).json({error: 'Usuario o contraseña incorrectos.' })
        
        // incorrect password
        if(!user.comparePassword(req.body.password))
            return res.status(400).json({error: 'Usuario o contraseña incorrectos.' })
        
        // user match
        const payload = user
        
        jtw.sign(payload,
            process.env.SECRET_JWT_KEY, 
            { expiresIn: 3600 }, 
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

/** POST signup */
router.post('/signup', async (req, res, next) => {
    try {
        const { error, isValid } = validateSignupInput(req.body)
        
        // input data is incomplete
        if(!isValid)
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

router.get('/current', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const user = await User.findById(req.user._id)
    const payload = user.getSimple()
        
    jtw.sign(payload,
        process.env.SECRET_JWT_KEY, 
        { expiresIn: 3600 }, 
        (err, token) => {
            if(err)
                next(err)
            res.json({
                success: true,
                token: 'Bearer ' + token
            })
        }
    )
})

module.exports = router;
