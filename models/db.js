/**
 * Database config and initialization
 */
const mongoose = require('mongoose');
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};


const connectWithRetry = function () {
    try {
        mongoose.connect(process.env.mongoConnectionString, options)
        console.log('Mongo connected')
    } catch (error) {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', error);
        setTimeout(connectWithRetry, 5000);
    }
};
connectWithRetry();

module.exports = mongoose;
