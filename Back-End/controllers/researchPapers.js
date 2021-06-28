const Product = require("../models/researchPaper.js");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};

exports.addResearchPaper = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //Destructuring the feilds//
    const{ title, description, authorsnames, numberofpages} = fields;

    if (!title || !description || !authorsnames || !numberofpages) {
        return res.status(400).json({
            error:"Sorry ! Please include all fields"
        });
    }

    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path)
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving in DB failed"
        });
      }
      res.json(product);
    });
  });
};



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

    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path)
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving in DB failed"
        });
      }
      res.json(product);
    });
  });
};



exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product)
};

//middleware
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

//delete product controller
exports.removeProduct = (req,res) => {
    const product = req.product;
  
    product.remove((err, deletedProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this product"
        });
      }
      res.json({
        message: "Successfull deleted",deletedProduct
      });
    });
};

//update product controller
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
    let product =  req.product;
    product = _.extend(product, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path)
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updation of product failed"
        });
      }
      res.json(product);
    });
  });
};

//listing all research papers controller
exports.getAllResearchPapers = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8 ;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id" ;

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[ sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if (err) {
            return res.status(400).json({
                error: "NO products found"
            });
        }
        res.json(products);
    });
}


//listing all approved research papers controller
exports.getAllApprovedsResearchPapers = (req,res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8 ;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id" ;

  Product.find({"ApprovalStatus":"Approved"})
  .select("-photo")
  .populate("category")
  .sort([[ sortBy, "asc"]])
  .limit(limit)
  .exec((err, products) => {
      if (err) {
          return res.status(400).json({
              error: "NO products found"
          });
      }
      res.json(products);
  });
}


exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "NO category found"
            });
        }
        res.json(category);
    });
}

exports.updateStock = (req, res, next) => {
    let myOperation = req.body.order.products.map(prod => {
        return {
            updateOne :{
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })
    
    Product.bulkWrite(myOperation, {} , (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk operation failed"
            });
        }
        next();
    });
    
}