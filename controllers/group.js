
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

    Group.find(findData, projection, options)
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
