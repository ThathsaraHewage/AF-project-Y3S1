const express = require("express");
const router = express.Router();

const { getProductById,
        MakePaymentsWorkshop,
        getProduct,
        photo,
      } = require("../controllers/workshopPayments");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//make payments for present research papers route
router.post(
  "/workshop/payments/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  MakePaymentsWorkshop 
);

//read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// //listing all research papers route
// router.get("/research-papers",getAllResearchPapers);


module.exports = router;
