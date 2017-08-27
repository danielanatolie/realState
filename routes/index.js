var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

// root
router.get("/", function(req, res) {
    res.render("landing");
});

// register form
router.get("/register", function(req,res) {
   res.render("register");
});

// signup logic
router.post("/register", function(req, res) {
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user) {
      if(err) {
          req.flash("error", err.message);
          return res.render("register");
      } 
      passport.authenticate("local")(req, res, function() {
         req.flash("success", "Welcome to realState " + user.username);
         res.redirect("/properties"); 
      });
   });
});

// show login form
router.get("/login", function(req, res) {
   res.render("login"); 
});

// login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/properties",
        failureRedirect: "/login"
    }), function(req, res) {
});

// logout
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Successfully logged out.");
   res.redirect("/properties");
});

module.exports = router;