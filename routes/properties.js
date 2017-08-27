var express = require("express");
var router = express.Router();
var Property = require("../models/property");
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image; 
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newProperty = {name: name, price: price, image: image, description: desc, author: author};
    Property.create(newProperty, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/properties");
        }
    });
});

// new - show form to create new property
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("properties/new"); 
});

// show - display more info about one property
router.get("/:id", middleware.isLoggedIn, function(req, res) {
    Property.findById(req.params.id).populate("comments").exec(function(err, foundProperty) {
        if(err) {
            console.log(err);
        } else {
            res.render("properties/show", {property: foundProperty});   
        }
    });
});

// edit - change property information
router.get("/:id/edit", middleware.checkPropertyOwnership, function(req, res) {
    Property.findById(req.params.id, function(err, foundProperty) {
            res.render("properties/edit", {property: foundProperty});
    });
});

// update - submit changed property to db
router.put("/:id", middleware.checkPropertyOwnership, function(req, res) {
    Property.findByIdAndUpdate(req.params.id, req.body.property, function(err, updatedProperty) {
       if(err) {
           res.redirect("/properties");
       } else {
           res.redirect("/properties/" + req.params.id);
       }
    });
});

// destroy - remove property from db
router.delete("/:id", middleware.checkPropertyOwnership, function(req, res) {
   Property.findByIdAndRemove(req.params.id, function(err) {
      if(err) {
          res.redirect("/properties");
      } else {
          res.redirect("/properties");
      }
   });
});

module.exports = router;