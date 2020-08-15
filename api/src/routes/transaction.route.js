const express = require('express')
const router = express.Router()
const Transaction = require('../models/transaction')
const passport = require('passport')


/**
 * GET /transactions
 * 
 * Return all transactions and allow filter.
 */
router.get('/transactions', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const transactions = await Transaction.find(req.query).populate('user').populate('route')

        return res.json(transactions)
    } catch(err) { next(err) }
    
})

/**
 * GET /transactions/:id
 * 
 * Return a transaction by id.
 */
router.get('/transactions/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('user').populate('route')
        
        return res.json(transaction)
    } catch(err) { next(err) }
    
})

/**
 * POST /transactions
 * 
 * Create a new transaction.
 */
router.post('/transactions', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
      const transaction = req.body

      const createdRoute = await Transaction.create(transaction)
      
      return res.json(createdRoute)
  } catch(err) { next(err) }
  
})

/**
* PUT /transactions
* 
* Updates a transaction.
*/
router.put('/transactions/:_id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
      const _id = req.params._id
      let transaction = req.body
      let updatedRoute = await Transaction.updateOne({ _id }, transaction)
      
      return res.status(200).json(updatedRoute)
  } catch(err) { next(err) }
})

/**
* DELETE /transactions
* 
* Deletes a transaction.
*/
router.delete('/transactions/:_id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
      const _id = req.params._id
      await Transaction.deleteOne({ _id })
  
      return res.status(200).json(true)
  } catch(err) { next(err) }
})

module.exports = router