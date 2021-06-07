const Conference = require("../models/conference.js");

exports.getCategoryById = (req, res, next, id) => {
  Conference.findById(id).exec((err, cate) => {
      if (err) {
        return res.status(400).json({
          error: "Category not found in DB"
        });
      }
      req.category = cate;
      next();
    });
  };
  
  exports.createConference = (req, res) => {
    const category = new Conference(req.body);
    category.save((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save conference details in DB"
        });
      }
      res.json({ category });
    });
  };
  
  exports.getCategory = (req, res) => {
    return res.json(req.category);
  };
  
  exports.getConferenceDetails = (req, res) => {
    Conference.find().exec((err, categories) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(categories);
    });
  };
  
  exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
  
    category.save((err, updatedCategory) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update category"
        });
      }
      res.json(updatedCategory);
    });
  };
  
  exports.removeCategory = (req, res) => {
    const category = req.category;
  
    category.remove((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this category"
        });
      }
      res.json({
        message: "Successfull deleted"
      });
    });
  };
  
