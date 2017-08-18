var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/properties", function(req, res) {
    var properties = [
            {name: "Surrey Night Castle", image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/BlaiseCastleEstate%28Castle%29.JPG"},
            {name: "North Beach Hall", image: "http://www.publicdomainpictures.net/pictures/140000/velka/house-on-the-beach.jpg"},
            {name: "York House", image: "https://static.pexels.com/photos/106399/pexels-photo-106399.jpeg"}
        ] 
    res.render("properties", {properties: properties});
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The realState server has started.");
});