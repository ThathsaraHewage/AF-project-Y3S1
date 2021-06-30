const User = require("../models/user.js");
const { check, validationResult } = require('express-validator'); //from express validater
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt'); 

exports.signup = (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg
            //param : errors.array()[0].param,
        });
    }

    const user = new User(req.body);
    user.save((error,user) => {
        if (error) {
            return res.status(400).json({
                error: "NOT able to save user in DB"
            });
        } 
        res.json({
            name :user.name,
            email: user.email,
            id: user._id
        });
    });
};

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const {email,password} = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg
            //param : errors.array()[0].param,
        });
    }

    User.findOne({email}, (error , user) => {
        if(error || !user){
            return res.status(400).json({
                error: "USER email does not exists"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password do not match"
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


exports.signout = (req,res) => {
    res.clearCookie("token");
    res.json({
        message :"User Signout successsfully"
    });
};

//protected route
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty : "auth"
});



//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "Access Denied"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 3) {
        return res.status(403).json({
            error: "NOT an Admin, Access Denied"
        });
    }
    next();
}

exports.isEditor = (req, res, next) => {
    if (req.profile.role === 2) {
        return res.status(403).json({
            error: "NOT an Editor, Access Denied"
        });
    }
    next();
}

exports.isReviewer = (req, res, next) => {
    if (req.profile.role === 1) {
        return res.status(403).json({
            error: "NOT an Reviewer, Access Denied"
        });
    }
    next();
}