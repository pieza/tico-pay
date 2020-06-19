const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DB_URL)
.then(db => console.log('db is connected'))
.catch(error => console.error(error));

module.exports = mongoose;