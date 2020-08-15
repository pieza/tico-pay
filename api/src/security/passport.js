const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/user')


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_JWT_KEY

/**
 * Authentication strategy of passport, using JSON Web Token.
 * Validates the jwt_payload and return the data in the callback.
 */
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
	User.findById(jwt_payload._id)
		.then(user => {
			if (user) {
				if(user.type == 'driver' && !user.route) {
					return done(null, false)
				}

				if(user.active)
					return done(null, user)
			} 
				
				
			return done(null, false)
		})
		.catch(err => console.log(err))
	})
)