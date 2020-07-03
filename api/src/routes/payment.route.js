const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const validateCreditCard = require('../utils/validators/credit-card.validator')

/**
 * GET /recharge
 * 
 * Add balance to self account.
 */
router.post('/recharge', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const { amount } = req.body

    const user = await User.findById(req.user._id)

    const error = validateCreditCard(user.credit_card)

    if(error)
        return res.status(500).json({ error: 'Método de pago inválido, por favor verifique sus datos.' })

    user.balance += amount
    user.save()

    return res.status(200).json(true)
})

module.exports = router