const express = require("express");
const router = express.Router();

const { 
    getProductById,
    MakePaymentsResearchPaper,
    getAllResearchPapers,
    getProduct,
    photo,
} = require("../controllers/researchPaperPayments");

const { 
  isSignedIn, 
  isAuthenticated,
  isAdmin 
} = require("../controllers/auth");

const { 
  getUserById 
} = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//make payments for present research papers route
router.post(
  "/research-paper/payments/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  MakePaymentsResearchPaper 
);

//read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//listing all paid research papers to register for attendee route
router.get("/research-papers/to-register",getAllResearchPapers);

module.exports = router;
