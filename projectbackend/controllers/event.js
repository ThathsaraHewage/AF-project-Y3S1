const Event = require("../models/event");

exports.getEventById = (req, res, next, id) => {
    Event.findById(id).exec((err, eve) => {
      if (err) {
        return res.status(400).json({
          error: "Event not found in DB"
        });
      }
      req.event = eve;
      next();
    });
  };
  
  exports.createEvent = (req, res) => {
    const event = new Event(req.body);
    event.save((err, event) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save event in DB"
        });
      }
      res.json({ event });
    });
  };
  
  exports.getEvent = (req, res) => {
    return res.json(req.event);
  };
  
  exports.getAllEvents = (req, res) => {
    Event.find().exec((err, events) => {
      if (err) {
        return res.status(400).json({
          error: "NO events found"
        });
      }
      res.json(events);
    });
  };

  exports.getAllEventsYes = (req, res) => {
    Event.find({ approved:"Yes"}).exec((err, events) => {
      if (err) {
        return res.status(400).json({
          error: "NO events found"
        });
      }
      res.json(events);
    });
  };

  exports.getAllEventsNo = (req, res) => {
    Event.find({ approved:"No"}).exec((err, events) => {
      if (err) {
        return res.status(400).json({
          error: "NO events found"
        });
      }
      res.json(events);
    });
  };
  
  exports.updateEvent = (req, res) => {
    const event = req.event;
    event.title = req.body.title;
    event.note = req.body.note;
    event.stratingtime = req.body.stratingtime;
    event.endingtime = req.body.endingtime;
    event.date = req.body.date;
    event.venue = req.body.venue;
    event.approved = req.body.approved;
  
    event.save((err, updatedEvent) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update event"
        });
      }
      res.json(updatedEvent);
    });
  };
  
  exports.removeEvent = (req, res) => {
    const event = req.event;
  
    event.remove((err, event) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this event"
        });
      }
      res.json({
        message: "Successfully deleted"
      });
    });
  };
  
