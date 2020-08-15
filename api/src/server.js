const express = require("express")
const morgan = require("morgan")
const path = require("path")
const passport = require("passport")
const cors = require('cors')
const app = express()

// server settings
app.set("port", process.env.PORT || 3000)

// middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
require('./security/passport')
app.use(passport.initialize())


// static files
app.use(express.static(path.join(__dirname, "..", "public")))

// routes
app.use(process.env.API_PATH, require("./routes/auth.route"))
app.use(process.env.API_PATH, require("./routes/payment.route"))
app.use(process.env.API_PATH, require("./routes/transaction.route"))
app.use(process.env.API_PATH, require("./routes/route.route"))
app.use(process.env.API_PATH, require("./routes/user.route"))
app.use("*", (req, res, next) => {
    if (!req.originalUrl.includes(process.env.API_PATH))
      res.sendFile(path.join(__dirname, "..", "public", "index.html"))
    else next()
})

// error handling
app.use((err, req, res, next) => {
  console.log(err)
  return res.status(501).json({ error: "Ha ocurrido un error desconocido." })
})

module.exports = app