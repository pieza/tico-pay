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
 * Updates a route.
 */
router.put('/users/:_id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const _id = req.params._id
        let route = req.body
        let updatedUser = await User.updateOne({ _id }, route)
        
        return res.status(200).json(updatedUser)
    } catch(err) { next(err) }
})

/**
 * DELETE /users
 * 
 * Deletes a route.
 */
router.delete('/users/:_id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const _id = req.params._id
        await User.deleteOne({ _id })
    
        return res.status(200).json(true)
    } catch(err) { next(err) }
})

module.exports = router