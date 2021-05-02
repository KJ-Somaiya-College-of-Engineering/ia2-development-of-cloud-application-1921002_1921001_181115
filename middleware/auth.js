const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next){

    const token = req.header('x-auth-token');
    console.log('token',token)

    // Check for token
    if(!token) return res.status(401).json({ msg: 'No token, authorisation denied' });

    try{
        //Verify token
        const decoded = jwt.verify(token, "msl_myJwtSecret");
        //Add user from payload
        req.user = decoded;
        console.log('req.user',req.user)
        next();
    }
    catch(e){
        console.log(e)
        res.status(400).json({ msg: 'Invalid token'});
    }
}


module.exports = auth;