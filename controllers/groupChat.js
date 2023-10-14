
const GroupChat = require('../models/groupChat');
const async = require('async')
const { sendResponse } = require('../helpers/response');


const getGroupChats = async function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    let findData = {
        groupId: data.groupId
    }
    let projection = {}
    let options = {}

    let populate = [
        {
            path: 'sender',
            model: 'user',
            select: 'name '
        },
        {
            path: 'reactions.userId',
            model: 'user',
            select: 'name'
        }
    ]
    GroupChat.find(findData, projection, options).populate(populate)
        .then(res => {
            console.log(res)
            return cb(null, sendResponse(200, "List Fetched", "getGroupChats", res, null))
        })
        .catch(err => {
            console.log("ERROR in getGroupChats", err);
            return cb(sendResponse(500, null, "getGroupChats", null, null));
        })
};
exports.getGroupChats = getGroupChats;



const addNewGroupChat = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!data.message || !data.groupId) {
        return cb(sendResponse(400, null, 'addNewGroupChat', null, null));
    }
    let waterFallFunctions = []
    waterFallFunctions.push(async.apply(insertNewGroupChat, data));

    async.waterfall(waterFallFunctions, cb);

};
exports.addNewGroupChat = addNewGroupChat


const insertNewGroupChat = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    let userId = data.req.auth.id

    let insertData = {
        message: data.message,
        sender: userId,
        groupId: data.groupId
    }
    GroupChat.create(insertData)
        .then(res => {
            return cb(null, sendResponse(200, 'Chat Added', 'insertNewGroupChat', null, null))
        })
        .catch(err => {
            console.log("ERROR in insertNewGroupChat", err);
            return cb(sendResponse(500, null, "insertNewGroupChat", null, null));
        })
}

const addReactionToChat = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    let userId = data.req.auth.id

    let findData = {
        _id: data.chatId,
    }
    let updateData = {
        $push: {
            reactions: {
                emoji: data.emoji,
                userId
            }
        }
    }
    console.log(data, updateData)
    GroupChat.updateOne(findData, updateData)
        .then(res => {
            return cb(null, sendResponse(200, 'Chat Added', 'addReactionToChat', null, null))
        })
        .catch(err => {
            console.log("ERROR in addReactionToChat", err);
            return cb(sendResponse(500, null, "addReactionToChat", null, null));
        })
}
exports.addReactionToChat = addReactionToChat

const removeReactionFromChat = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    let userId = data.req.auth.id

    let findData = {
        _id: data.chatId,
    }
    let updateData = {
        $pull: {
            reactions: {
                emoji: data.emoji,
                userId
            }
        }
    }
    console.log(data, updateData)
    GroupChat.updateOne(findData, updateData)
        .then(res => {
            return cb(null, sendResponse(200, 'Chat Added', 'removeReactionFromChat', null, null))
        })
        .catch(err => {
            console.log("ERROR in removeReactionFromChat", err);
            return cb(sendResponse(500, null, "removeReactionFromChat", null, null));
        })
}
exports.removeReactionFromChat = removeReactionFromChat