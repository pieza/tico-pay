const express = require('express')
const router = express.Router()
const Route = require('../models/route')
const passport = require('passport')


/**
 * GET /routes
 * 
 * Return all routes and allow filter.
 */
router.get('/routes', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const routes = Route.find(req.query)
        
        return res.json(routes)
    } catch(err) { next(err) }
    
})

/**
 * GET /routes/:id
 * 
 * Return a route by id.
 */
router.get('/routes/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const route = Route.findById(req.params.id)
        
        return res.json(route)
    } catch(err) { next(err) }
    
})

/**
 * POST /routes
 * 
 * Create a new route.
 */
router.post('/routes', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const route = req.body

        const createdRoute = await Route.create(route)
        
        return res.json(createdRoute)
    } catch(err) { next(err) }
    
})

/**
 * PUT /routes
 * 
 * Updates a route.
 */
router.put('/routes/:_id', ensureAuthenticated, async (req, res) => {
    const _id = req.params._id
    let route = req.body
    let updatedRoute = await Route.updateOne({ _id }, route)
    
    return res.status(200).json(updatedRoute)
})

/**
 * DELETE /routes
 * 
 * Deletes a route.
 */
router.delete('/routes/:_id', ensureAuthenticated, async (req, res) => {
    const _id = req.params._id
    await Route.deleteOne({ _id })

    return res.status(200).json(true)
})

module.exports = router