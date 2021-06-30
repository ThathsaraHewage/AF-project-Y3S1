const Document = require("../models/researchPaper.js");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

////////////////////////////////////////////////////////////////////
//+++++++++++++++ RESEARCHER - Controllers +++++++++++++++++++++++//
////////////////////////////////////////////////////////////////////


/////////////////////////get items by id///////////////////////////
exports.getProductById = (req, res, next, id) => {
  Document.findById(id)
    .populate("category")
    .exec((err, document) => {
      if (err) {
        return res.status(400).json({
          error: "Document not found"
        });
      }
      req.document = document;
      next();
    });
};

///////////////////upload research papers to ICAF DBs///////////////
exports.addResearchPaper = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with document !"
      });
    }

    //Destructuring the feilds
    const{ title, description, authorsnames, numberofpages} = fields;

    //validating input fields
    if (!title || !description || !authorsnames || !numberofpages) {
        return res.status(400).json({
            error:"Sorry ! Please include all fields"
        });
    }

    let document = new Document(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      document.photo.data = fs.readFileSync(file.photo.path)
      document.photo.contentType = file.photo.type;
    }

    //save all data to the DB
    document.save((err, document) => {
      if (err) {
        res.status(400).json({
          error: "Saving in DB failed"
        });
      }
      res.json(document);
    });
  });
};


/////////////////////////Researcher make payments/////////////////////
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

    if (!title || !description || !authorsnames || !holdersname|| !cardnumber || !code) {
        return res.status(400).json({
            error:"Sorry ! Please include all fields"
        });
    }

    let document = new Document(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      document.photo.data = fs.readFileSync(file.photo.path)
      document.photo.contentType = file.photo.type;
    }

    //save to the DB
    document.save((err, document) => {
      if (err) {
        res.status(400).json({
          error: "Saving in DB failed"
        });
      }
      res.json(document);
    });
  });
};


////////////////////////get items by id////////////////////////
exports.getProduct = (req, res) => {
    req.document.photo = undefined;
    return res.json(req.document)
};

////////////////////////middleware/////////////////////////////
exports.photo = (req, res, next) => {
    if (req.document.photo.data) {
        res.set("Content-Type", req.document.photo.contentType);
        return res.send(req.document.photo.data);
    }
    next();
};

//////////////////////delete product///////////////////////////
exports.removeProduct = (req,res) => {
    const document = req.document;
  
    document.remove((err, deletedDocument) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this document !"
        });
      }
      res.json({
        message: "Successfull deleted !",deletedDocument
      });
    });
};

/////////////////////update research papers////////////////////
exports.updateProduct = (req,res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //updation code
    let document =  req.document;
    document = _.extend(document, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      document.photo.data = fs.readFileSync(file.photo.path)
      document.photo.contentType = file.photo.type;
    }

    //save to the DB
    document.save((err, document) => {
      if (err) {
        res.status(400).json({
          error: "Updation of product failed"
        });
      }
      res.json(document);
    });
  });
};

/////////////////listing all research papers controller//////////
exports.getAllResearchPapers = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8 ;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id" ;

    Document.find()
    .select("-photo")
    .populate("category")
    .sort([[ sortBy, "asc"]])
    .limit(limit)
    .exec((err, documents) => {
        if (err) {
            return res.status(400).json({
                error: "NO documents found"
            });
        }
        res.json(documents);
    });
}


///////////listing all approved research papers /////////////////
exports.getAllApprovedsResearchPapers = (req,res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8 ;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id" ;

  Document.find({"ApprovalStatus":"Approved"})
  .select("-photo")
  .populate("category")
  .sort([[ sortBy, "asc"]])
  .limit(limit)
  .exec((err, documents) => {
      if (err) {
          return res.status(400).json({
              error: "NO documents found"
          });
      }
      res.json(documents);
  });
}


///////////////////get all unique items///////////////////////////
exports.getAllUniqueCategories = (req, res) => {
    Document.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "NO item found"
            });
        }
        res.json(category);
    });
}

