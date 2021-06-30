const News = require("../models/news.js");

exports.getNewsById = (req, res, next, id) => {
    News.findById(id).exec((err, nes) => {
      if (err) {
        return res.status(400).json({
          error: "Requested News not found in DB"
        });
      }
      req.news = nes;
      next();
    });
  };
  
  exports.createNews = (req, res) => {
    const news = new News(req.body);
    news.save((err, news) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save news in DB"
        });
      }
      res.json({ news });
    });
  };
  
  exports.getNews = (req, res) => {
    return res.json(req.news);
  };
  
  exports.getAllNews = (req, res) => {
    News.find().exec((err, allnews) => {
      if (err) {
        return res.status(400).json({
          error: "NO all news found"
        });
      }
      res.json(allnews);
    });
  };
  
  exports.updateNews = (req, res) => {
    const news = req.news;
    news.date = req.body.date;
    news.short = req.body.short;
    news.full = req.body.full;
    console.log("TO UPDATE >>>" , news.full);
  
    news.save((err, updatedNews) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update news"
        });
      }
      res.json(updatedNews);
    });
  };
  
  exports.removeNews = (req, res) => {
    const news = req.news;
  
    news.remove((err, news) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this news"
        });
      }
      res.json({
        message: "Successfully deleted"
      });
    });
  };
  
