const crypto = require('crypto');
const { sendResponse } = require('./response');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const async = require('async');

const signOptions = {
    issuer: "Authorization",
    audience: "ChatApp",
    expiresIn: "1d", // 1 day validity
    algorithm: "HS256"
};


const generatePassword = function (data, response, cb) {
    if (!cb) {
        cb = response
    }
    let plaintext = data.password
    const salt = crypto.randomBytes(16).toString('base64')
    const randomSalt = Buffer.from(salt, 'base64');
    const hash = crypto.pbkdf2Sync(plaintext, randomSalt, 10000, 64, 'sha1').toString('base64')
    return cb(null, { hash, salt })
};
exports.generatePassword = generatePassword;



const comparePassword = function (data, response, cb) {
    if (!cb) {
        cb = response
    }
    console.log(data)
    let { userDetails, password } = data
    const crypto = require('crypto');
    const userSalt = Buffer.from(userDetails?.salt, 'base64')
    const hashResult = crypto.pbkdf2Sync(password, userSalt, 10000, 64, 'sha1').toString('base64')
    return cb(null, hashResult === userDetails?.password)
};
exports.comparePassword = comparePassword;

const createJWTToken = function (data, response, cb) {
    if (!cb) {
        cb = response
    }
    try {
        console.log("112233445566", data)
        let encryptedData = jwt.sign(data, process.env.PASS_SALT_STATIC, signOptions);
        return cb(null, encryptedData);
    } catch (e) {
        return cb(e);
    }

}
exports.createJWTToken = createJWTToken;

const verifyJWTToken = function (data, response, cb) {
    if (!cb) {
        cb = response
    }
    console.log(data)
    try {
        let decryptedData = jwt.verify(data.token, process.env.PASS_SALT_STATIC, signOptions);
        console.log("decryptedData", decryptedData)
        return cb(null, decryptedData);
    } catch (error) {
        console.log("verifyJWTToken Error : ", error)
        return cb(error);
    }
}
exports.verifyJWTToken = verifyJWTToken;


// Auth validate token
const validateToken = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!data.token || !data.identifier) {
        return cb(sendResponse(403, "Invalid Credentials", "validateToken", null, data.req.signature));
    }

    let waterFallFunctions = []

    waterFallFunctions.push(async.apply(getUserDetails, data));
    waterFallFunctions.push(async.apply(verifyJWTToken, data));

    async.waterfall(waterFallFunctions, cb)
};
exports.validateToken = validateToken;

const getUserDetails = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    let findData = {
        isDelete: false,
        _id: data.identifier
    }
    let projection = {
        name: 1,
        email: 1,
        userName: 1,
    }
    User.findOne(findData, projection)
        .then(res => {
            console.log(res)
            return cb(null, sendResponse(200, "Success", "getUserDetails", res, null))
        })
        .catch(err => {
            console.log("ERROR in getUserDetails", err);
            return cb(sendResponse(500, null, "getUserDetails", null, null));
        })
}