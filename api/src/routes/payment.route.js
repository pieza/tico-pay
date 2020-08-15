const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const validateCreditCard = require('../utils/validators/credit-card.validator')
const Transaction = require('../models/transaction')

/**
 * POST /recharge
 * 
 * Add balance to self account.
 */
router.post('/recharge', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        if(!req.user.type == 'client')
            return res.status(401).json({ error: 'No puede realizar esta acción.' }) 

        const amount = parseInt(req.body.amount)

        const user = await User.findById(req.user._id)
    
        const error = validateCreditCard(user.credit_card)
    
        if(error)
            return res.status(500).json({ error: 'Método de pago inválido, por favor verifique sus datos.' })
    
        user.balance += amount
        user.save()

        await Transaction.create({
            user: user._id,
            type: 'recharge',
            amount: amount
          })
    
        return res.status(200).json(true)
    } catch(err) { next(err) }
})

/**
 * POST /charge
 * 
 * Reduce balance of client account by identification.
 */
router.post('/charge', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const { identification } = req.body

        const driver = await User.findById(req.user._id).populate('route')
        const client = await User.findOne({ identification })

        if(!driver.type == 'driver')
            return res.status(401).json({ error: 'Su cuenta no puede realizar esta acción.' }) 

        if(!driver.route || !driver.route.price)
            return res.status(401).json({ error: 'Su cuenta no tiene una ruta asignada' }) 
        
        if(!client)
            return res.status(500).json({ error: 'El usuario no existe.' })
        
        if(driver.route.price > client.balance) {
            await Transaction.create({
                user: client._id,
                type: 'denied',
                amount: driver.route.price,
                route: driver.route._id
            })
            return res.status(500).json({ error: 'El usuario no posee suficientes fondos.' })
        }
            
    
        client.balance -= driver.route.price
        client.save()


        await Transaction.create({
          user: client._id,
          type: 'charge',
          amount: driver.route.price,
          route: driver.route._id
        })
    
        return res.status(200).json(true)
    } catch(err) { next(err) }
})

module.exports = router