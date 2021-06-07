const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createConference,
  getCategory,
  getConferenceDetails,
  updateCategory,
  removeCategory
} = require("../controllers/conference");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//actual routers goes here

//create
router.post(
  "/conference/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createConference 
);

//read
router.get("/category/:categoryId", getCategory);
router.get("/display/conference", getConferenceDetails);

//update
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//delete

router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
