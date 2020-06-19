const dotenv = require('dotenv')
const app = require('./server')
dotenv.config()

// db connection
require('./db')

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server listening on port ${app.get('port')}`)
})