const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");


module.exports.isLoggendIn = async function (req,res,next){
    if(req.cookies.token){
    try{
        let decode =jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user = await userModel.findOne({email:decode.email});
        req.user = user;
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

module.exports.redirectIfLoggedIn = function (req,res,next){
    if(req.cookies.token){
        try{
            jwt.verify(req.cookies.token,process.env.JWT_KEY);
            res.redirect("/profile");
        }
        catch(err){
            return next();
        }
    }
    else{
        next()
    }
};
