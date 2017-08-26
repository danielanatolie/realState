var express = require("express");
var router = express.Router({mergeParams: true});
var Property = require("../models/property");
var Comment = require("../models/comment");

// new comment
router.get("/new", isLoggedIn, function(req, res) {
    Property.findById(req.params.id, function(err, property) {
       if(err) {
           console.log(err);
       } else {
           res.render("comments/new", {property: property}); 
       }
    });
});

// create comment
router.post("/", isLoggedIn, function(req, res) {
    Property.findById(req.params.id, function(err, property) {
       if(err) {
           console.log(err);
           res.redirect("/properties");
       } else {
           Comment.create(req.body.comment, function(err, comment) {
               if(err) {
                   console.log(err);
               } else {
                   comment.author.username = req.user.username;
                   comment.author.id = req.user._id;
                   comment.save();
                   property.comments.push(comment);
                   property.save();
                   res.redirect('/properties/' + property._id);
               }
           });
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

module.exports = router;