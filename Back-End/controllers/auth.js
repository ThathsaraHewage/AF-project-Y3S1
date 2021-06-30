const User = require("../models/user.js");
const { check, validationResult } = require('express-validator'); //from express validater
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt'); 

////////////////signup function///////////////////////
exports.signup = (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }

    const user = new User(req.body);
    user.save((error,user) => {
        if (error) {
            return res.status(400).json({
                error: "oops..your account creation got some error !"
            });
        } 
        res.json({
            name :user.name,
            email: user.email,
            id: user._id
        });
    });
};

//////////////////////Signin function/////////////////////////////
exports.signin = (req, res) => {
    const errors = validationResult(req);
    const {email,password} = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }

    User.findOne({email}, (error , user) => {
        if(error || !user){
            return res.status(400).json({
                error: "Entered email does not exists!"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password not matching !"
            }) 
        }
        //create token
        const token = jwt.sign({_id : user._id} , process.env.SECRET);
        //put token in cookie
        res.cookie("token", token , {expire: new Date() + 9999});
        
        //send respond to front end
        const {_id, name, email, role} =user;
        return res.json({token, user : {_id, name, email, role} });

    });
}

//////////////////Signout function/////////////////////
exports.signout = (req,res) => {
    res.clearCookie("token");
    res.json({
        message :"You Signout successsfully"
    });
};

//////////////////////protected route///////////////////
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty : "auth"
});

///////////////////custom middlewares///////////////////
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "Access Denied"
        });
    }
    next();
}

/////////////////////////check admin////////////////////
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Not a member, Access Denied !"
        });
    }
    next();
}

/////////////////////////Check editor//////////////////
exports.isEditor = (req, res, next) => {
    if (req.profile.role === 4) {
        return res.status(403).json({
            error: "Not an editor, Access Denied !"
        });
    }
    next();
}