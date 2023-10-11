const crypto = require('crypto');


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
    let { } = data
    console.log(plaintextInput, hash, salt)
    const crypto = require('crypto');
    const userSalt = Buffer.from(salt, 'base64')
    const hashResult = crypto.pbkdf2Sync(plaintextInput, userSalt, 10000, 64, 'sha1').toString('base64')
    return cb(null, hashResult === hash)
};
exports.comparePassword = comparePassword;
