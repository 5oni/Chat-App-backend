const express = require('express');
const router = express.Router();


/* Controllers */
const group = require('../controllers/group');
const authenticator = require('../middlewares/authenticator')();
const roleGuard = require('../middlewares/roleGuard')
const chatGuard = require('../middlewares/chatGuard');


router.get('/v1/admin/list', [authenticator, roleGuard(['ADMIN'])], function (req, res, next) {
    let data = req.query;
    data.req = req.data;
    group.getAllGroups(data, function (err, response) {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err)
        }
        status = response.status;
        return res.status(status).send(response);
    });
});

router.get('/v1/list', [authenticator], function (req, res, next) {
    let data = req.query;
    data.req = req.data;
    group.getUserGroups(data, function (err, response) {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err)
        }
        status = response.status;
        return res.status(status).send(response);
    });
});


router.post('/v1/add', [authenticator], function (req, res, next) {
    let data = req.body;
    data.req = req.data;
    group.addNewGroup(data, function (err, response) {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err)
        }
        status = response.status;
        return res.status(status).send(response);
    });
});

router.post('/v1/delete', [authenticator, chatGuard(['ADMIN'])], function (req, res, next) {
    let data = req.body;
    data.req = req.data;
    group.deleteGroup(data, function (err, response) {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err)
        }
        status = response.status;
        return res.status(status).send(response);
    });
});

router.post('/v1/add/members', [authenticator, chatGuard(["ADMIN"])], function (req, res, next) {
    let data = req.body;
    data.req = req.data;
    group.addNewGroupMembers(data, function (err, response) {
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
