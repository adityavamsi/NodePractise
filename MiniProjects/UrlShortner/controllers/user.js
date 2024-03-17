const User = require("../models/users");
const {v4:uuidv4} = require("uuid");
const {setUser} = require("../service/auth");
async function userSignup(req,res){
    const {name,email,password} = req.body;
    const signUp = await User.create({
        name,
        email,
        password
    });
    console.log(signUp);
    return res.render("home");
}
async function userLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});

    if(!user) return res.render("login",{
        error:"Invalid Password or Username"
    });
    //const sessionId = uuidv4();(statefull)
    const token = setUser(user);
    res.cookie('token',token);
    return res.redirect("/");
}

module.exports = {
    userSignup,
    userLogin
}