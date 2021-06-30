const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  removeEvent,
  getEventById,
  getAllEventsYes,
  getAllEventsNo
} = require("../controllers/event");
const { isSignedIn, isAuthenticated, isEditor, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("eventId", getEventById);

//actual routers goes here

//create
router.post(
  "/event/create/:userId",
  isSignedIn,
  isAuthenticated,
  createEvent
);

//read
router.get("/event/:eventId", getEvent);
router.get("/events", getAllEvents);
router.get("/yesevents", getAllEventsYes);
router.get("/noevents", getAllEventsNo);

//update
router.put(
  "/event/:eventId/:userId",
  updateEvent
);

//delete

router.delete(
  "/event/:eventId/:userId",
  removeEvent
);

module.exports = router;
