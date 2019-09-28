// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
let exphbs = require("express-handlebars");

var db = require("./models");

var PORT = 3000;

var app = express();

// Logging requests
app.use(logger("dev"));

// JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Use assets in public folder
app.use(express.static("public"));


// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user1:password1@ds163745.mlab.com:63745/heroku_22jjpgvp";
mongoose.connect(MONGODB_URI);

// Routes //
app.get('/', function (req, res, next) {
    res.render('index', {layout: false});
});

app.get("/scrape", function (req, res) {
    axios.get("https://old.reddit.com/r/UpliftingNews/").then(function (response) {
        var $ = cheerio.load(response.data);

        $("p.title").each(function (i, element) {

            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            console.log(result);
            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

    });

});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });







app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

module.exports = app;