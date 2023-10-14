const express = require('express');
const router = express.Router();


/* Controllers */
const users = require('../controllers/user');
const authenticator = require('../middlewares/authenticator')();
const roleGuard = require('../middlewares/roleGuard');


router.get('/v1/list', function (req, res, next) {
    let data = req.query;
    data.req = req.data;
    users.getUserList(data, function (err, response) {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err)
        }
        status = response.status;
        return res.status(status).send(response);
    });
});

router.get('/v1/email/exists', [authenticator, roleGuard(['ADMIN'])], function (req, res, next) {
    let data = req.query;
    data.req = req.data;
    users.validateUserEmail(data, function (err, response) {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err)
        }
        status = response.status;
        return res.status(status).send(response);
    });
});

router.get('/v1/username/exists', [authenticator, roleGuard(['ADMIN'])], function (req, res, next) {
    let data = req.query;
    data.req = req.data;
    users.validateUserName(data, function (err, response) {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err)
        }
        status = response.status;
        return res.status(status).send(response);
    });
});

router.post('/v1/add', [authenticator, roleGuard(['ADMIN'])], function (req, res, next) {
    let data = req.body;
    data.req = req.data;
    users.addNewUser(data, function (err, response) {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err)
        }
        status = response.status;
        return res.status(status).send(response);
    });
});

router.post('/v1/edit', [authenticator, roleGuard(['ADMIN'])], function (req, res, next) {
    let data = req.body;
    data.req = req.data;
    users.editUserDetails(data, function (err, response) {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err)
        }
        status = response.status;
        return res.status(status).send(response);
    });
});

router.get('/v1/details', [authenticator, roleGuard(['ADMIN'])], function (req, res, next) {
    let data = req.query;
    data.req = req.data;
    users.getUserDetails(data, function (err, response) {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err)
        }
        status = response.status;
        return res.status(status).send(response);
    });
});





module.exports = router;
