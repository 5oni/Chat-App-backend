

const { validateToken } = require("../helpers/auth");
const { getGroupDetails } = require("../controllers/group");

module.exports = function () {
    return function (req, res, next) {
        try {
            let groupId
            if (req.body?.groupId) {
                groupId = req.body.groupId
            }
            if (req.params?.groupId) {
                groupId = req.params.groupId
            }
            if (req.query?.groupId) {
                groupId = req.query.groupId
            }
            let payload = {
                groupId,
                req: req.data
            }
            getGroupDetails(payload, (err, response) => {
                if (err) {
                    console.log('Error in validateToken : ', err);
                    return res.status(401).send({ success: false, message: 'Failed to authenticate token at Lv3' });
                }
                console.log(response)
                if (!response.data) {
                    return res.status(403).send({ success: false, message: 'Not Authorized' });
                }
                req.data.groupDetails = response.data;
                next();
            })
        } catch (error) {
            console.log("error chat guard---", error)
            let response = {
                success: false,
                message: 'Something Went Wrong'
            };
            return res.status(500).send(response);
        }
    }
}