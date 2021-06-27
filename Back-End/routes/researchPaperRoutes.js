const express = require("express");
const router = express.Router();

const { getProductById,
        addResearchPaper ,
        getProduct,
        photo,
        removeProduct,
        updateProduct,
        getAllResearchPapers,
        getAllApprovedsResearchPapers,
        getAllUniqueCategories} = require("../controllers/researchPapers");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//Add research papers route
router.post(
  "/research-paper/add/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  addResearchPaper 
);
//read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//update route
router.put("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, updateProduct);

//delete routes
router.delete("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, removeProduct);

//listing all research papers route
router.get("/research-papers",getAllResearchPapers);

//listing all approved research paper route
router.get("/approved/research-papers",getAllApprovedsResearchPapers);

//router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
