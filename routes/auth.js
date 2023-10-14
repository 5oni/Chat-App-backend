const express = require('express');
const router = express.Router();


/* Controllers */
const auth = require('../controllers/auth');


router.post('/v1/login', function (req, res, next) {
    let data = req.body;
    data.req = req.data;
    auth.loginUser(data, function (err, response) {
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
