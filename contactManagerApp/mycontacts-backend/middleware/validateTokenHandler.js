// to validate token , this is a middleware

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// the middleware
const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    // token can be passed in two ways
    // one is through bearer token under "Auth" (req.headers.authorization) -> default
    // one is through header named "Authorization" and pass ("Bearer "+ token) as the value
    // either way the authorization header value starts with "Bearer"
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=> {
            if(err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user; // appending the extracted info to request user property
            next();
        });
        if(!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    }

    else {
        res.status(400);
        throw new Error("No Token provided");
    }

    
});

module.exports = validateToken;