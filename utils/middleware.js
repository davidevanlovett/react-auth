const jwt = require('jsonwebtoken');

module.exports = {
    isAuthenticated: (req, res, next) => {
        const { headers} = req;
        const { authorization } = headers;
        if(authorization === undefined){
            res.status(401).send();
        } else {
            const token = authorization.split(' ')[1];
            if(token === undefined || token === ''){
                res.status(401).send();
            } else {
                jwt.verify(token, process.env.SECRET, {
                    algorithms: ['HS256']
                }, (err, decoded) => {
                    if(err){
                        res.status(401).send();
                    } else{
                        req.user = decoded;
                        next();
                    }
                });
            }
        }
    },
    handleError: (err, req, res, _next) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};