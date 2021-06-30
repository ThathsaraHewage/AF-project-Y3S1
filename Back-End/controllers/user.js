const User = require("../models/user.js");

//////////////////////get user by id controller////////////////////////
exports.getUserById = (req, res, next, id) =>{
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: "No user was found in DB !"
            })
        }
        req.profile = user;
        next();
    });
};

/////////////////////get user controller/////////////////////////
exports.getUser = (req, res) =>{
    // get back here for password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

/////////////////////update user controller//////////////////////
exports.updateUser = (req, res) =>{
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify:false},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "You are not authorized to update profile !"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user);
        }
    )
}