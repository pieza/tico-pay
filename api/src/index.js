const dotenv = require('dotenv')
dotenv.config()
const app = require('./server')


// db connection
require('./db')

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server listening on port ${app.get('port')}`)
})