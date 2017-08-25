var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Property        = require("./models/property"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    User            = require("./models/user");
    

mongoose.connect("mongodb://localhost/realState");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.use(require("express-session")({
    secret: "Descipline and Consistency.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/properties", function(req, res) {
    Property.find({}, function(err, allProperties) {
       if(err) {
           console.log(err);
       } else {
            res.render("properties/index", {properties: allProperties});
       }
    });
});

app.post("/properties", function(req, res) {
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

app.get("/properties/new", function(req, res) {
   res.render("properties/new"); 
});

app.get("/properties/:id", function(req, res) {
    Property.findById(req.params.id).populate("comments").exec(function(err, foundProperty) {
        if(err) {
            console.log(err);
        } else {
            res.render("properties/show", {property: foundProperty});   
        }
    });
});

app.get("/properties/:id/comments/new", isLoggedIn, function(req, res) {
    Property.findById(req.params.id, function(err, property) {
       if(err) {
           console.log(err);
       } else {
           res.render("comments/new", {property: property}); 
       }
    });
});

app.post("/properties/:id/comments", isLoggedIn, function(req, res) {
    Property.findById(req.params.id, function(err, property) {
       if(err) {
           console.log(err);
           res.redirect("/properties");
       } else {
           Comment.create(req.body.comment, function(err, comment) {
               if(err) {
                   console.log(err);
               } else {
                   property.comments.push(comment);
                   property.save();
                   res.redirect('/properties/' + property._id);
               }
           });
       }
    });
});

app.get("/register", function(req,res) {
   res.render("register");
});

app.post("/register", function(req, res) {
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user) {
      if(err) {
          console.log(err);
          return res.render("register");
      } 
      passport.authenticate("local")(req, res, function() {
         res.redirect("/properties"); 
      });
   });
});

app.get("/login", function(req, res) {
   res.render("login"); 
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/properties",
        failureRedirect: "/login"
    }), function(req, res) {
});

app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/properties");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The realState server has started.");
});