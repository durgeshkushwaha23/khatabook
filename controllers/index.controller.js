const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.landingPageController = (req, res) => {
res.render("index");
};

module.exports.registerPageController = (req, res) => {
res.render("register");
};

module.exports.registerController = async (req, res) => {
let { email, password, username, name } = req.body;

try {
    let user = await userModel.findOne({ email });
    if (user) return res.render("you have already account ,please login");

    let salt = await bcrypt.genSalt(10);
    let hashed = await bcrypt.hash(password, salt);

    user = await userModel.create({
    email,
    name,
    username,
    password: hashed,
    });
    let token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_KEY
    );
    res.cookie("token",token);
    res.send("account created sucessfully")

} catch (err) {
    res.send(err.message);
}
};

module.exports.logincontrollers = async(req, res) => {
let{email,password} =req.body;
let user = await userModel.findOne({email});
if(!user) return res.render("register");

let result = await bcrypt.compare(password,user.password);
if(result){
    let token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_KEY
        );
        res.cookie("token",token);
        res.send("account login sucessfully")
    
}else{
    res.send("your deatils are incorrect")
}

};

module.exports.logoutControllers = async (req,res) => {
    res.cookie("token","");
    return res.redirect("/")
};

module.exports.profileController = (req, res) => {
    res.render("profile");
    };
