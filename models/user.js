let mongoose = require('./db');

// grab the things we need
let Schema = mongoose.Schema;

// create a schema
let userSchema = new Schema({

    name: String,
    email: { type: String },
    userName: String,
    role: {
        type: String,
        default: 'USER'
    },
    accountId: String,
    password: String,
    salt: String,

    emailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }

}, { minimize: false, timestamps: true }); // Minimize : false --> It stores empty objects.

// we need to create a model using it
let users = mongoose.model('user', userSchema);

module.exports = users;