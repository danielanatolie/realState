var Property = require("../models/property");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkPropertyOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
       Property.findById(req.params.id, function(err, foundProperty) {
           if(err) {
               req.flash("error", "Property not found.");
               res.redirect("back");
           } else {
               if(foundProperty.author.id.equals(req.user._id)) {
                    next();
               } else {
                   req.flash("error", "You don't have such permission.");
                   res.redirect("back");
               }
           }
        });
    } else {
        req.flash("error", "Login first.");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
       Comment.findById(req.params.comment_id, function(err, foundComment) {
           if(err) {
               res.redirect("back");
           } else {
               if(foundComment.author.id.equals(req.user._id)) {
                    next();
               } else {
                   req.flash("error", "You don't have such permission.");
                   res.redirect("back");
               }
           }
        });
    } else {
        req.flash("error", "Sign in first.");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Login first.");
    res.redirect("/login");
}

module.exports = middlewareObj;