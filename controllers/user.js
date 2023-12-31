
const User = require('../models/user');
const async = require('async')
const { sendResponse } = require('../helpers/response');
const { generatePassword } = require('../helpers/auth');

const getUserList = async function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    let findData = {
        isDelete: false
    }
    let projection = {}
    let options = {}

    User.find(findData, projection, options)
        .then(res => {
            console.log(res)
            return cb(null, sendResponse(200, "List Fetched", "getUserList", res, null))
        })
        .catch(err => {
            console.log("ERROR in getUserList", err);
            return cb(sendResponse(500, null, "getUserList", null, null));
        })
};
exports.getUserList = getUserList;


const addNewUser = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!data.name || !data.userName || !data.email || !data.password) {
        return cb(sendResponse(400, null, 'addNewUser', null, null));
    }
    let waterFallFunctions = []

    waterFallFunctions.push(async.apply(validateEmailAndUserName, data));
    waterFallFunctions.push(async.apply(generatePassword, data));
    waterFallFunctions.push(async.apply(insertNewUser, data));

    async.waterfall(waterFallFunctions, cb);

};
exports.addNewUser = addNewUser

const validateEmailAndUserName = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    let waterFallFunctions = []
    waterFallFunctions.push(async.apply(validateUserEmail, data))
    waterFallFunctions.push(async.apply(validateUserName, data))
    async.waterfall(waterFallFunctions, cb);
};


const validateUserEmail = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!data.email) {
        return cb(sendResponse(400, null, 'validateUserEmail', null, null));
    }
    let findData = {
        email: data.email,
        isDelete: false
    }
    User.findOne(findData)
        .then(res => {
            if (res) {
                return cb(sendResponse(400, 'Email Already Exists', 'validateUserEmail', true, null))
            }
            return cb(null, sendResponse(200, 'Success', 'validateUserEmail', false, null))
        })
        .catch(err => {
            console.log("ERROR in validateUserEmail", err);
            return cb(sendResponse(500, null, "validateUserEmail", null, null));
        })
}
exports.validateUserEmail = validateUserEmail;


const validateUserName = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!data.userName) {
        return cb(sendResponse(400, null, 'validateUserName', null, null));
    }
    let findData = {
        userName: data.userName,
        isDelete: false
    }
    User.findOne(findData)
        .then(res => {
            if (res) {
                return cb(sendResponse(400, 'Username Already Exists', 'validateUserName', true, null))
            }
            return cb(null, sendResponse(200, 'Success', 'validateUserName', false, null))
        })
        .catch(err => {
            console.log("ERROR in validateUserName", err);
            return cb(sendResponse(500, null, "validateUserName", null, null));
        })
}
exports.validateUserName = validateUserName

const insertNewUser = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    let { hash, salt } = response
    let insertData = {
        name: data.name,
        email: data.email,
        userName: data.userName,
        // accountId: ,
        password: hash,
        salt,
    }
    User.create(insertData)
        .then(res => {
            return cb(null, sendResponse(200, 'User Added', 'insertNewUser', false, null))
        })
        .catch(err => {
            console.log("ERROR in insertNewUser", err);
            return cb(sendResponse(500, null, "insertNewUser", null, null));
        })
}
