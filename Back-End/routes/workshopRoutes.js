const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createWorkshop,
  getCategory,
  getAllWorkshops,
  getAllApprovedWorkshops,
  updateCategory,
  removeWorkshop
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

//read and fetch data from database
router.get("/category/:categoryId", getCategory);
router.get("/workshops", getAllWorkshops);
router.get("/register-workshops", getAllApprovedWorkshops);

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
  removeWorkshop
);

module.exports = router;
