var express = require("express");
var router = express.Router({mergeParams: true});
var Property = require("../models/property");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// new comment
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Property.findById(req.params.id, function(err, property) {
       if(err) {
           console.log(err);
       } else {
           res.render("comments/new", {property: property}); 
       }
    });
});

// create comment
router.post("/", middleware.isLoggedIn, function(req, res) {
    Property.findById(req.params.id, function(err, property) {
       if(err) {
           req.flash("error", "Something went wrong. [#103]");
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
                   req.flash("success", "Added comment.");
                   res.redirect('/properties/' + property._id);
               }
           });
       }
    });
});

// edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back"); 
        } else {
            res.render("comments/edit", {property_id: req.params.id});
        }
    });
});

// update comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
       if(err) {
           res.redirect("back");
       } else {
           res.redirect("/properties/" + req.params.id);
       }
    });
});

// destroy comment 
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
       if(err) {
           res.redirect("back");
       } else {
           req.flash("success", "Comment removed.");
           res.redirect("/properties/"+req.params.id);
       }
    });
});

module.exports = router;