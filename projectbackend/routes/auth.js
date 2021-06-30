const express = require("express");
const router = express.Router();

const { check, validationResult } = require('express-validator');
const {signout,signup , signin, isSignedIn} = require("../controllers/auth.js");

//there might be an error in here
router.post("/signup",[
    check("name","name shold be at least 3 char").isLength({ min : 3 }),
    check("email","email is required").isEmail(),
    check("password","password shold be at least 3 char").isLength({ min : 3 })
],signup);

router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","password feild is required").isLength({ min : 3 })
],signin);

router.get("/signout", signout);


module.exports = router;
