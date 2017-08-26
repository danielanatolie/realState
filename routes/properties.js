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
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newProperty = {name: name, image: image, description: desc, author: author};
    Property.create(newProperty, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/properties");
        }
    });
});

// new - show form to create new property
router.get("/new", isLoggedIn, function(req, res) {
   res.render("properties/new"); 
});

// show - display more info about one property
router.get("/:id", isLoggedIn, function(req, res) {
    Property.findById(req.params.id).populate("comments").exec(function(err, foundProperty) {
        if(err) {
            console.log(err);
        } else {
            res.render("properties/show", {property: foundProperty});   
        }
    });
});

// edit - change property information
router.get("/:id/edit", checkPropertyOwnership, function(req, res) {
    Property.findById(req.params.id, function(err, foundProperty) {
            res.render("properties/edit", {property: foundProperty});
    });
});

// update - submit changed property to db
router.put("/:id", checkPropertyOwnership, function(req, res) {
    Property.findByIdAndUpdate(req.params.id, req.body.property, function(err, updatedProperty) {
       if(err) {
           res.redirect("/properties");
       } else {
           res.redirect("/properties/" + req.params.id);
       }
    });
});

// destroy - remove property from db
router.delete("/:id", checkPropertyOwnership, function(req, res) {
   Property.findByIdAndRemove(req.params.id, function(err) {
      if(err) {
          res.redirect("/properties");
      } else {
          res.redirect("/properties");
      }
   });
});

// middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}

function checkPropertyOwnership(req, res, next) {
    if(req.isAuthenticated()) {
       Property.findById(req.params.id, function(err, foundProperty) {
           if(err) {
               res.redirect("back");
           } else {
               if(foundProperty.author.id.equals(req.user._id)) {
                    next();
               } else {
                   res.redirect("back");
               }
           }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;