const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createWorkshop,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory
} = require("../controllers/workshop");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//create a workshop routes
router.post(
  "/workshop-proposal/add/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createWorkshop
);

//read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

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
