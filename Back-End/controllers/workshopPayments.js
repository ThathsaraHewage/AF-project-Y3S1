const WP = require("../models/workshopPayments.js");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

//////////////////////////////////////////////////////////////////
//++++making payments by workshop conductor++++++++++++++++++++++//
//////////////////////////////////////////////////////////////////

/////making payments for workshops by workshop conductor controller/////
exports.MakePaymentsWorkshop = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //Destructuring the feilds
    const{name,description,venue,holdersname,cardnumber,code,expiredate} = fields;

    //validating input fields
    if (!name || !description || !venue || !holdersname || !cardnumber || !code || !expiredate) {
        return res.status(400).json({
            error:"Sorry ! Please include all fields !"
        });
    }

    let wp = new WP(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      wp.photo.data = fs.readFileSync(file.photo.path)
      wp.photo.contentType = file.photo.type;
    }

    //save all data to the DB
    wp.save((err, wp) => {
      if (err) {
        res.status(400).json({
          error: "Saving in DB failed !"
        });
      }
      res.json(wp);
    });
  });
};


/////////////////////////////middleware/////////////////////////
exports.photo = (req, res, next) => {
  if (req.wp.photo.data) {
      res.set("Content-Type", req.wp.photo.contentType);
      return res.send(req.wp.photo.data);
  }
  next();
};

exports.getProductById = (req, res, next, id) => {
  WP.findById(id)
    .populate("category")
    .exec((err, wp) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.wp = wp;
      next();
    });
};
exports.getProduct = (req, res) => {
    req.wp.photo = undefined;
    return res.json(req.wp)
};
