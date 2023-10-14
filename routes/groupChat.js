const express = require('express');
const router = express.Router();


/* Controllers */
const groupChat = require('../controllers/groupChat');
const authenticator = require('../middlewares/authenticator')();
const chatGuard = require('../middlewares/chatGuard')();


router.get('/v1/list', [authenticator, chatGuard], function (req, res, next) {
    let data = req.query;
    data.req = req.data;
    groupChat.getGroupChats(data, function (err, response) {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err)
        }
        status = response.status;
        return res.status(status).send(response);
    });
});


router.post('/v1/add', [authenticator, chatGuard], function (req, res, next) {
    let data = req.body;
    data.req = req.data;
    groupChat.addNewGroupChat(data, function (err, response) {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err)
        }
        status = response.status;
        return res.status(status).send(response);
    });
});
router.post('/v1/add/reaction', [authenticator, chatGuard], function (req, res, next) {
    let data = req.body;
    data.req = req.data;
    groupChat.addReactionToChat(data, function (err, response) {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err)
        }
        status = response.status;
        return res.status(status).send(response);
    });
});

router.post('/v1/remove/reaction', [authenticator, chatGuard], function (req, res, next) {
    let data = req.body;
    data.req = req.data;
    groupChat.removeReactionFromChat(data, function (err, response) {
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
