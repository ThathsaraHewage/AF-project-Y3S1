const PaymentsR = require("../models/researchpaperPayments.js");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

//listing all paid research papers to attendee controller
exports.getAllResearchPapers = (req,res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8 ;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id" ;

  PaymentsR.find()
  .select("-photo")
  .populate("category")
  .sort([[ sortBy, "asc"]])
  .limit(limit)
  .exec((err, researchpapers) => {
      if (err) {
          return res.status(400).json({
              error: "NO items found"
          });
      }
      res.json(researchpapers);
  });
}

////////////////////get items by id///////////////////////
exports.getProductById = (req, res, next, id) => {
  PaymentsR.findById(id)
    .populate("category")
    .exec((err, paymentr) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.paymentr = paymentr;
      next();
    });
};

///////////////making payments by the researcher to present the papers at ICAF////////////
exports.MakePaymentsResearchPaper = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //Destructuring the feilds//
    const{ title, description, authorsnames, holdersname,cardnumber,code} = fields;

    //validating all input fields
    if (!title || !description || !authorsnames || !holdersname || !cardnumber || !code) {
        return res.status(400).json({
            error:"Sorry ! Please include all fields!"
        });
    }

    let paymentr = new PaymentsR(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      paymentr.photo.data = fs.readFileSync(file.photo.path)
      paymentr.photo.contentType = file.photo.type;
    }

    //save data to the DB
    paymentr.save((err, paymentr) => {
      if (err) {
        res.status(400).json({
          error: "Saving in DB failed !"
        });
      }
      res.json(paymentr);
    });
  });
};

////////////////////get item by id////////////////
exports.getProduct = (req, res) => {
    req.paymentr.photo = undefined;
    return res.json(req.paymentr)
};

/////////////////////middleware//////////////////
exports.photo = (req, res, next) => {
    if (req.paymentr.photo.data) {
        res.set("Content-Type", req.paymentr.photo.contentType);
        return res.send(req.paymentr.photo.data);
    }
    next();
};
