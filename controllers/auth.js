
const User = require('../models/user');
const async = require('async')
const { sendResponse } = require('../helpers/response');
const { generatePassword, comparePassword, createJWTToken } = require('../helpers/auth');



const loginUser = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!data.email || !data.password) {
        return cb(sendResponse(400, null, 'loginUser', null, null));
    }
    let waterFallFunctions = []

    waterFallFunctions.push(async.apply(getUserDetails, data));
    waterFallFunctions.push(async.apply(comparePassword, data));
    waterFallFunctions.push(async.apply(validateUserAndGenerateToken, data));

    async.waterfall(waterFallFunctions, cb);

};
exports.loginUser = loginUser



const getUserDetails = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!data.email) {
        return cb(sendResponse(400, null, 'getUserDetails', null, null));
    }
    let findData = {
        email: data.email,
        isDelete: false
    }
    User.findOne(findData)
        .then(res => {
            if (res) {
                data.userDetails = res;
                return cb(null, sendResponse(200, 'Success', 'getUserDetails', res, null))
            }
            return cb(sendResponse(400, 'User Not Registered', 'getUserDetails', null, null))
        })
        .catch(err => {
            console.log("ERROR in getUserDetails", err);
            return cb(sendResponse(500, null, "getUserDetails", null, null));
        })
}

const validateUserAndGenerateToken = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!response) {
        return cb(sendResponse(400, 'Invalid Email Id and Password Combination', 'validateUserAndGenerateToken', null, null));
    }
    let user = data.userDetails
    let payloadToEncrypt = {
        id: user._id,
        email: user.email,
        accountId: user._id,
        userName: user.userName,
        name: user.name,
        role: user.role,
        token_type: "auth"
    }
    createJWTToken(payloadToEncrypt, (err, res) => {
        if (err) {
            console.log("ERROR in validateUserAndGenerateToken", err);
            return cb(sendResponse(500, null, "validateUserAndGenerateToken", null, null));
        }
        let payload = {
            user: { ...payloadToEncrypt },
            token: res
        }
        return cb(null, sendResponse(200, 'Success', 'validateUserAndGenerateToken', payload, null))
    })
}
