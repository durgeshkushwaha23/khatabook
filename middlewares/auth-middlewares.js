const jwt = require("jsonwebtoken");

module.exports.isLoggendIn = function (req,res,next){
    if(req,cookies.token){
    try{
        let decode =jwt.verify(req,cookies.token,process.env.JWT_KEY);
        req.user = decode;
        next();
    }
    catch(error){
        res.send(error.message)
    }
    }
    else{
        return res.redirect("/");
    }
};

module.exports.redirectToProfile = function (req,res,next){
    if(req.cookies.token){
        jwt.verify(req.cookies.token,process.env.JWT_KEY);
    }
    else{
        next()
    }
} 
