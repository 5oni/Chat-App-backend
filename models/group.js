let mongoose = require('./db');

// grab the things we need
let Schema = mongoose.Schema;

// create a schema
let groupSchema = new Schema({

    name: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }

}, { minimize: false, timestamps: true }); // Minimize : false --> It stores empty objects.

// we need to create a model using it
let groups = mongoose.model('group', groupSchema);

module.exports = groups;