const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    // Extract the token from the 'Authorization' header
    const tokenAuth = req.headers.authorization;
    try{
        // Check if the 'Authorization' header is present
        if(tokenAuth){
            // If present, split the header value to extract the token (Bearer token format)
            const token = tokenAuth.split(' ')[1];
            if(token){
                // Verify the token using the jwtPrivateKey from the environment
                const userData = jwt.verify(token, process.env.jwtPrivateKey);
                // Attach the 'userId' from the decoded token to the request object
                req.userId = userData.userId;
                next();
            } else {
                next();
            }
        }else{
            next();
        }
       
    }catch (e){
        req.userId = null;
        next();
    }
    

}