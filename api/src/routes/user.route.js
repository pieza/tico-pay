const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')


/**
 * GET /users
 * 
 * Return all users and allow filter.
 */
router.get('/users', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const users = await User.find(req.query).populate('route')
        
        return res.json(users)
    } catch(err) { next(err) }
    
})

/**
 * GET /users/:id
 * 
 * Return a route by id.
 */
router.get('/users/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const route = await User.findById(req.params.id).populate('route')
        
        return res.json(route)
    } catch(err) { next(err) }
    
})

/**
 * PUT /users
 * 
 * Updates an user.
 */
router.put('/users/:_id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const _id = req.params._id
        let user = req.body
        let actualUser = await User.findById(_id)

        if(!actualUser) throw new Error("No se encontró el usuario.")
        actualUser.type = user.type ? user.type : actualUser.type
        actualUser.name = user.name ? user.name : actualUser.name
        actualUser.email = user.email ? user.email : actualUser.email
        actualUser.balance = user.balance ? user.balance : actualUser.balance
        actualUser.route = user.route ? user.route : actualUser.route
        actualUser.credit_card = user.credit_card ? user.credit_card : actualUser.credit_card
        actualUser.lastname = user.lastname ? user.lastname : actualUser.lastname
        actualUser.birthday = user.birthday ? user.birthday : actualUser.birthday
        
        if(user.hasOwnProperty('active')) {
            actualUser.active = user.active 
        }

        if(user.password) {
            actualUser.password = actualUser.encryptPassword(user.password)
        }

        actualUser.save()
    
        return res.status(200).json(actualUser)
    } catch(err) { next(err) }
})

/**
 * DELETE /users
 * 
 * Deletes an user.
 */
router.delete('/users/:_id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const _id = req.params._id
        await User.deleteOne({ _id })
    
        return res.status(200).json(true)
    } catch(err) { next(err) }
})

module.exports = router