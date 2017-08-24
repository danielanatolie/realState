var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Property   = require("./models/property"),
    seedDB     = require("./seeds");

mongoose.connect("mongodb://localhost/realState");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

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

app.get("/properties/:id/comments/new", function(req, res) {
    Property.findById(req.params.id, function(err, property) {
       if(err) {
           console.log(err);
       } else {
           res.render("comments/new", {property: property}); 
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The realState server has started.");
});