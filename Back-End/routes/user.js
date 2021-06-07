const express = require("express");
const router = express.Router();

const {isAuthenticated, isAdmin, isSignedIn} = require("../controllers/auth.js");
const {getUserById , getUser, updateUser, userPurchaseList} = require("../controllers/user.js");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router;