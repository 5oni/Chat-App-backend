

module.exports = function (roles) {
    return function (req, res, next) {
        console.log(roles)
        try {
            let user = req.data.auth
            if (roles.includes(user.role)) {
                next();
            } else {
                let response = {
                    success: false,
                    message: 'Not Authorized'
                };
                return res.status(401).send(response);
            }
        } catch (error) {
            console.log("error role guard---", error)
            let response = {
                success: false,
                message: 'Something Went Wrong'
            };
            return res.status(500).send(response);
        }
    }
}