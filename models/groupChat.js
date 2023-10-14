let mongoose = require('./db');

// grab the things we need
let Schema = mongoose.Schema;

// create a schema
let groupChatSchema = new Schema({
    message: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    groupId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'group' }],

    reactions: [
        {
            emoji: String,
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        },
    ],

    isDelete: { type: Boolean, default: false }

}, { minimize: false, timestamps: true });

// we need to create a model using it
let groupChat = mongoose.model('groupChat', groupChatSchema);

module.exports = groupChat;