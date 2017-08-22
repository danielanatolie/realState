var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/realState");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA
var propertySchema = new mongoose.Schema({
    name: String,
    image: String
});

var Property = mongoose.model("Property", propertySchema);
// Property.create(
//         {
//             name: "York House", 
//             image: "https://static.pexels.com/photos/106399/pexels-photo-106399.jpeg"
            
//         }, function(err, property) {
//             if(err) {
//                 console.log(err);
//             } else {
//                 console.log("Newly created property.");
//                 console.log(property);
//             }
//         });

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/properties", function(req, res) {
    Property.find({}, function(err, allProperties) {
       if(err) {
           console.log(err);
       } else {
            res.render("properties", {properties: allProperties});
       }
    });
});

app.post("/properties", function(req, res) {
    var name = req.body.name;
    var image = req.body.image; 
    var newProperty = {name: name, image: image};
    Property.create(newProperty, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/properties");
        }
    });
});

app.get("/properties/new", function(req, res) {
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The realState server has started.");
});