var express = require("express");
let exphbs = require("express-handlebars");
var db = require("./models");
var PORT = 3000;
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");




app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
  });