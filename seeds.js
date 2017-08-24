var mongoose = require("mongoose");
var Property = require("./models/property");
var Comment = require("./models/comment");

var data = [ 
    {
        name: "York House", 
        image: "https://static.pexels.com/photos/106399/pexels-photo-106399.jpeg",
        desciption: "Keen undertaking."
    },
    {
        name: "Dansworth", 
        image: "http://www.jumptools.com/wp-content/uploads/2013/08/fotolia_3825014_x.jpg",
        desciption: "Craftswork arrival."
    },
        {
        name: "Crosmith Apartment", 
        image: "https://si.wsj.net/public/resources/images/BN-NN734_0414pp_12S_20160413160150.jpg",
        desciption: "Geniune appeal."
    }
]

function seedDB() {
       Property.remove({}, function(err) {
            if(err) {
                console.log(err);
            }
            console.log("Removed all properties."); 
            data.forEach(function(seed) {
                Property.create(seed, function(err, property) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Added a property.");
                        Comment.create(
                            {
                                text: "A stable and flourishing investment.",
                                author: "Peterson"
                            }, function(err, comment) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    property.comments.push(comment);
                                    property.save();
                                    console.log("Created new comment.");
                                }
                            });
                    }
                });
            });
        });
}

module.exports = seedDB;