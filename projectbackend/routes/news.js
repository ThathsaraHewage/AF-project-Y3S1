const express = require("express");
const router = express.Router();

const {
  removeNews,
  updateNews,
  getAllNews,
  getNews,
  createNews,
  getNewsById
} = require("../controllers/news");
const { isSignedIn, isAuthenticated, isEditor, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("newsId", getNewsById);

//actual routers goes here

//create
router.post(
  "/news/create/:newsId",
  createNews
);

//read
router.get("/news/:newsId", getNews);
router.get("/allnews", getAllNews);

//update
router.put(
  "/news/:newsId/:userId",
  updateNews
);

//delete
router.delete(
  "/news/:newsId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeNews
);

module.exports = router;
