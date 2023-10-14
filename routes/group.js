const express = require('express');
const router = express.Router();


/* Controllers */
const group = require('../controllers/group');
const authenticator = require('../middlewares/authenticator')();


router.get('/v1/admin/list', [authenticator], function (req, res, next) {
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



module.exports = router;