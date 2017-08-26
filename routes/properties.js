var express = require("express");
var router = express.Router();
var Property = require("../models/property");

// index - show all properties
router.get("/", function(req, res) {
    Property.find({}, function(err, allProperties) {
       if(err) {
           console.log(err);
       } else {
            res.render("properties/index", {properties: allProperties});
       }
    });
});

// create - add new property to db
router.post("/", function(req, res) {
    var name = req.body.name;
    var image = req.body.image; 
    var desc = req.body.description;
    var newProperty = {name: name, image: image, description: desc};
    Property.create(newProperty, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/properties");
        }
    });
});

// new - show form to create new property
router.get("/new", function(req, res) {
   res.render("properties/new"); 
});

// show - display more info about one property
router.get("/:id", function(req, res) {
    Property.findById(req.params.id).populate("comments").exec(function(err, foundProperty) {
        if(err) {
            console.log(err);
        } else {
            res.render("properties/show", {property: foundProperty});   
        }
    });
});

module.exports = router;