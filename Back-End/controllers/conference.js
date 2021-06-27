// const Category = require("../models/conference.js");

// exports.getCategoryById = (req, res, next, id) => {
//     Category.findById(id).exec((err, cate) => {
//       if (err) {
//         return res.status(400).json({
//           error: "Category not found in DB"
//         });
//       }
//       req.category = cate;
//       next();
//     });
//   };
  
//   exports.createWorkshop = (req, res) => {
//     const category = new Category(req.body);
//     category.save((err, category) => {
//       if (err) {
//         return res.status(400).json({
//           error: "NOT able to submit workshop details !"
//         });
//       }
//       res.json({ category });
//     });
//   };
  
//   exports.getCategory = (req, res) => {
//     return res.json(req.category);
//   };
  
//   exports.getAllCategory = (req, res) => {
//     Category.find().exec((err, categories) => {
//       if (err) {
//         return res.status(400).json({
//           error: "NO workshop found"
//         });
//       }
//       res.json(categories);
//     });
//   };
  
//   exports.updateCategory = (req, res) => {
//     const category = req.category;
//     category.name = req.body.name;
  
//     category.save((err, updatedCategory) => {
//       if (err) {
//         return res.status(400).json({
//           error: "Failed to update workshop!"
//         });
//       }
//       res.json(updatedCategory);
//     });
//   };
  
//   exports.removeWorkshop = (req, res) => {
//     const category = req.category;
  
//     category.remove((err, category) => {
//       if (err) {
//         return res.status(400).json({
//           error: "Failed to delete the workshop"
//         });
//       }
//       res.json({
//         message: "Successfull deleted workshop"
//       });
//     });
//   };
  
