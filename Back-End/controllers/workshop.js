const Workshop = require("../models/workshop.js");

//////////////////////////////////////////////////////////
//+++++++++++++++++++ WORKSHOP CONDUCTOR /////////////////
//////////////////////////////////////////////////////////

////////////////////create a new workshop/////////////////
  exports.createWorkshop = (req, res) => {
    const workshop = new Workshop(req.body);
    workshop.save((err, workshop) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to submit workshop details !"
        });
      }
      res.json({ workshop });
    });
  };
  exports.getCategory = (req, res) => {
    return res.json(req.workshop);
  };
 

///////////DISPLAY ALL WORKSHOPS TO REGISTER FOR ATTENDEE////  
  exports.getAllApprovedWorkshops = (req, res) => {
    Workshop.find().exec((err, workshops) => {
      if (err) {
        return res.status(400).json({
          error: "NO workshop found"
        });
      }
      res.json(workshops);
    });
  };
  

   
/////////////////////DISPLAY ALL WORKSHOPS////////////////////
exports.getAllWorkshops = (req, res) => {
  Workshop.find({"ApprovalStatus":"approved"}).exec((err, workshops) => {
    if (err) {
      return res.status(400).json({
        error: "NO workshop found"
      });
    }
    res.json(workshops);
  });
};


//////////////////////////REMOVE WORKSHOP//////////////////////
  exports.removeWorkshop = (req, res) => {
    const workshop = req.workshop;
  
    workshop.remove((err, workshop) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the workshop"
        });
      }
      res.json({
        message: "Successfull deleted workshop"
      });
    });
  };
  
/////////////////DISPLAY ONLY APPROVED WORKSHOPS/////////////////
exports.getAllApprovedWorkshops = (req, res) => {
  Workshop.find().exec((err, workshops) => {
    if (err) {
      return res.status(400).json({
        error: "NO workshop found"
      });
    }
    res.json(workshops);
  });
};
exports.getCategoryById = (req, res, next, id) => {
  Workshop.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB"
      });
    }
    req.workshop = cate;
    next();
  });
};
exports.updateCategory = (req, res) => {
  const workshop = req.workshop;
  workshop.name = req.body.name;

  workshop.save((err, updatedDetails) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update workshop!"
      });
    }
    res.json(updatedDetails);
  });
};

