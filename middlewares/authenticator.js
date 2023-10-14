const { validateToken } = require("../helpers/auth");

module.exports = function () {
    return function (req, res, next) {
        try {

            if (!req.headers) {
                console.log("Invalid Request");
                let response = {
                    success: false,
                    message: 'Failed to authenticate token at Lv0'
                };
                return res.status(401).send(response);
            }
            req.data = {}
            let token = req.headers?.['x-access-token'];
            let identifier = req.headers?.['x-access-user'];

            if (token && identifier) {
                // verify the token
                let payload = {
                    token: token,
                    identifier: identifier,
                    req: req.data,
                }
                validateToken(payload, (err, response) => {
                    if (err) {
                        console.log('Error in validateToken : ', err);
                        return res.status(401).send({ success: false, message: 'Failed to authenticate token at Lv2' });
                    }
                    console.log("Response", response)
                    // if everything is good, save to request for use in other routes
                    req.data.auth = response;
                    req.data.auth.token = token;
                    req.data.auth.identifier = identifier;
                    next();
                })
            } else {
                // if there is no token
                // return an error
                let response = {
                    success: false,
                    message: 'Not Authorized'
                };
                return res.status(401).send(response);
            }

        } catch (error) {
            console.log("error authenticator---", error)
            let response = {
                success: false,
                message: 'Token and UserId Required'
            };
            return res.status(400).send(response);
        }
    }
}