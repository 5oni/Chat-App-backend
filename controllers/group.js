
const Group = require('../models/group');
const async = require('async')
const { sendResponse } = require('../helpers/response');


const getAllGroups = async function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    let findData = {
        isDelete: false
    }
    let projection = {}
    let options = {}

    Group.find(findData, projection, options)
        .then(res => {
            console.log(res)
            return cb(null, sendResponse(200, "List Fetched", "getAllGroups", res, null))
        })
        .catch(err => {
            console.log("ERROR in getAllGroups", err);
            return cb(sendResponse(500, null, "getAllGroups", null, null));
        })
};
exports.getAllGroups = getAllGroups;

const getUserGroups = async function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    let userId = data.req.auth.id
    let findData = {
        isDelete: false,
        $or: [
            { admins: { $in: [userId] } },
            { members: { $in: [userId] } },//TODO
            { createdBy: userId },
        ]
    }
    let projection = {}
    let options = {}
    let populate = [{
        path: 'admins',
        model: 'user',
        select: 'name email userName'
    }, {
        path: 'members',
        model: 'user',
        select: 'name email userName'
    }]
    Group.find(findData, projection, options).populate(populate).sort({ createdAt: -1 })
        .then(res => {
            console.log(res)
            return cb(null, sendResponse(200, "List Fetched", "getUserGroups", res, null))
        })
        .catch(err => {
            console.log("ERROR in getUserGroups", err);
            return cb(sendResponse(500, null, "getUserGroups", null, null));
        })
};
exports.getUserGroups = getUserGroups;


const addNewGroup = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!data.name) {
        return cb(sendResponse(400, null, 'addNewGroup', null, null));
    }
    let waterFallFunctions = []
    waterFallFunctions.push(async.apply(insertNewGroup, data));

    async.waterfall(waterFallFunctions, cb);

};
exports.addNewGroup = addNewGroup


const addNewGroupMembers = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!data.members) {
        return cb(sendResponse(400, null, 'addNewGroupMembers', null, null));
    }

    let findData = {
        _id: data.groupId
    }
    let insertData = {
        $set: { members: data.members },
    }
    Group.updateOne(findData, insertData)
        .then(res => {
            return cb(null, sendResponse(200, 'Group Members Added', 'addNewGroupMembers', null, null))
        })
        .catch(err => {
            console.log("ERROR in addNewGroupMembers", err);
            return cb(sendResponse(500, null, "addNewGroupMembers", null, null));
        })
}
exports.addNewGroupMembers = addNewGroupMembers


const insertNewGroup = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    let userId = data.req.auth.id

    let insertData = {
        name: data.name,
        createdBy: userId,
        admins: [userId],
        members: data.members,
        description: data.description
    }
    Group.create(insertData)
        .then(res => {
            return cb(null, sendResponse(200, 'Group Added', 'insertNewGroup', false, null))
        })
        .catch(err => {
            console.log("ERROR in insertNewGroup", err);
            return cb(sendResponse(500, null, "insertNewGroup", null, null));
        })
}

const deleteGroup = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!data.groupId) {
        return cb(sendResponse(400, null, 'deleteGroup', null, null));
    }

    let findData = {
        _id: data.groupId
    }
    let updateData = {
        $set: { isDelete: true }
    }
    Group.updateOne(findData, updateData)
        .then(res => {
            return cb(null, sendResponse(200, 'Group Deleted', 'deleteGroup', false, null))
        })
        .catch(err => {
            console.log("ERROR in deleteGroup", err);
            return cb(sendResponse(500, null, "deleteGroup", null, null));
        })
}
exports.deleteGroup = deleteGroup

const getGroupDetails = async function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    console.log(data)
    let userId = data.req?.auth?.id
    let findData = {
        isDelete: false,
        _id: data.groupId,
        $or: [
            { admins: { $in: [userId] } },
            { members: { $in: [userId] } },//TODO
            { createdBy: userId },
        ]
    }
    let projection = {}
    let options = {}
    console.log(findData)
    Group.findOne(findData, projection, options)
        .then(res => {
            console.log(res)
            return cb(null, sendResponse(200, "Group details Fetched", "getGroupDetails", res, null))
        })
        .catch(err => {
            console.log("ERROR in getGroupDetails", err);
            return cb(sendResponse(500, null, "getGroupDetails", null, null));
        })
};
exports.getGroupDetails = getGroupDetails;
